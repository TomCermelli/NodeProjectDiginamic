const {User} = require('../models/db');
const erreurCall = require('./call.service');

checkDuplicateEmail = async (req, res) => {
    try{
        const user = await User.findOne({ 
            where: {email : req.body.email}
        });
        if(user) {
            res.status(400).json({message : "Cet email est déja utilisé"})
            return true;
        }
        else {
            return false;
        }
    }
    catch(error) {
        erreurCall(error, res);
    }
}

module.exports = {
    checkDuplicateEmail
}