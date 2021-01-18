//importation du module mysql
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const dbConfig = require("../config/db.config");
const studentModel = require("./students.model");
const lessonModel = require("./lessons.model");
const userModel = require("./users.model");

const listeEtudiants = require('../config/test/liste.etudiants');
const listeUsers = require('../config/test/liste.user');

// crée une nouvelle instance de sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
});

const Student = studentModel(sequelize, DataTypes);
const Lesson = lessonModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

//créer la relation One-to-one entre User et Student
Student.hasOne(User); // clé etrangere dans la cible -> table users va contneir une clé etrangerere nommée "studentId"
User.belongsTo(Student); // cle strangere dans la source -> studentId;

const initDb = () => {
  return sequelize.sync({force : true})
    .then(_ => {
      listeEtudiants.map((student) => { // on crée une liste d'étudiant avec une liste test
        Student.create(student);
      })
      listeUsers.map((user) => { // on crée des user à partir d'une liste teste
      user.password =  bcrypt.hashSync(user.password, 5);
      User.create(user)
      })
      console.log("Connexion à la BDD");
    })
    .catch(error => {
      console.log("Erreur lors de la connexion BDD \n" + error);
    })

}

/*//créer la relation Many-to-Many entre Student et User
db.students.belongsToMany(db.lessons, { through: 'LessonStudents' });
db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

//crée la relation Many-To
db.students.belongsToMany(db.students, { as: 'Children', through: 'StudentChildren' });
*/

module.exports = {
  initDb, sequelize, Student, User, Lesson
}