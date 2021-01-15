let db = require("../models/db");
let User = db.users;


exports.login = async (req, res) => {

    try {

        //trouver le user avec le parametre email == req.body.email
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            res.status(404);
            res.json({ "message": "Aucun utilisateur n'existe avec cet email" })
            return;
        }


        if (req.body.password == user.dataValues.password) {
        
            //recuperer le student qui est en relation avec notre user : la methode getStudent() est automatiquement genérée par Sequelize suivant la relation défnie auparavant 
            let student = await user.getStudent()
            res.json({user : user,
                student : student
            });

        } else {
            res.status(401);
            res.json({ "message": "Le mot de passe est erroné" })
        }




    } catch (e) {
        res.status(500);
            res.json({ "message": e })
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

