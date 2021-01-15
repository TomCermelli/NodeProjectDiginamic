module.exports = erreurCall = (error, res) => {
    const message = "Une erreur est apparue lors de votre requete";
    console.log(error);
    return res.status(500).json({ message, error : error.message });
}