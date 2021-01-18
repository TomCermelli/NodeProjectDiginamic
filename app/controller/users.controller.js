const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Student } = require('../models/db');
const erreurCall = require('../services/call.service');
const privateKey = require('../config/private-key');
const { checkDuplicateEmail } = require('../services/user.service');
const studentMethodes = require('../controller/students.controller');

exports.createProfil = async (req, res) => {
    try {
        const id = res.locals.id;
        const user = await User.findByPk(id);
        const userProfil = await studentMethodes.create(req, res);
        console.log(userProfil);
        await user.setStudent(userProfil);
        const message = "Votre profil étudiant a bien été crée avec succès"
        res.json({
            message,
            newStudentProfil: userProfil
        })
    }
    catch (error) {
        erreurCall(error, res);
    }
}

exports.login = async (req, res, userRegister = null, messageRegister = null) => {
    if (req.body.email && req.body.password) {
        try {
            let user;

            if (userRegister != "object") {
                user = await User.findOne({ where: { email: req.body.email } })
                if (!user) {
                    return res.status(404).json({ message: "C'est email ne correspond à aucun compte" });
                }

                const verifPassword = bcrypt.compareSync(req.body.password, user.password);
                if (!verifPassword) {
                    const message = "Le mdp est incorrect";
                    return res.status(401).json({ message });
                }
            }
            else {
                user = userRegister;
            }
            //si notre mail et password est bon on donne un token à l'utilisateur
            const token = jwt.sign(
                { userId: user.id },
                privateKey.privateKey,
                { expiresIn: '24h' }
            );

            const message = typeof messageRegister === "string" ? messageRegister : "Vous vous êtes bien identifié - Merci de récupérer le token pour futur requete de l'API";
            res.json({
                message,
                date: user, token
            });

        } catch (error) {
            erreurCall(error, res);
        }

    } else {
        res.status(400).json("Demade de login annulée. Merci de renseigner votre email et votre mot de passe");
    }
}


exports.register = async (req, res) => {
    if (req.body.password && req.body.email && req.body.type) {
        try {
            const emailUsed = await checkDuplicateEmail(req, res);
            if (!emailUsed) {
                const user = await User.create({
                    email: req.body.email,
                    type: req.body.type,
                    password: bcrypt.hashSync(req.body.password, 8)
                });
                this.login(req, res, user, "Votre compte à bien été crée, vous avez été directement authentifié ");
            }

        } catch (error) {
            erreurCall(error, res);
        }
    } else {
        const message = "Demande d'inscription échoué. Merci de renseigner tout les champs";
        res.status(400).json({ message });
    }
}

exports.getInfo = async (req, res) => {
    try {
        const id = res.locals.id;
        const user = await User.findByPk(id);
        const message = "Vos infos ont bien été récupérée.";
        res.json({
            message,
            user
        });
    } catch (error) {
        erreurCall(error, res);
    }

}
