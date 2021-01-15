
const getAge = (birthday) =>{
    const birthdate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    let mois = today.getMonth() - birthdate.getMonth();
    if(mois < 0 || (mois === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    } 
    return age;
}

module.exports = {
    getAge
}