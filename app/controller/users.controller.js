const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/db');
const erreurCall = require('../services/call.service');
const privateKey = require('../config/private-key');

exports.login = async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            const user = await User.findOne({where: {email : req.body.email}})
            if(!user) {
                return res.status(404).json({message : "C'est email ne correspond à aucun compte"});
            }
            const verifPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!verifPassword) {
                const message = "Le mdp est incorrect";
                return res.status(401).json({message});
            }
            //si notre mail et password est bon on donne un token à l'utilisateur
            const token = jwt.sign(
                {userId: user.id},
                privateKey.privateKey,
                {expiresIn : '24h'}
            );
            const message = "Vous vous êtes bien identifié - Merci de récupérer le token pour futur requete de l'API";
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

    try {

        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {

            let result = await User.create(req.body);
            res.json(result);

        } else {
            res.status(409);
            res.json({ "message": 'Cet email est déja utilisé' })
        }




    } catch (e) {
        res.status(500);
        res.json({ "message": e })
    }

}

