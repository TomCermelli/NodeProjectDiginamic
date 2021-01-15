module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
         bio: {
      type: Sequelize.TEXT
      },
      class_name: {
           type:Sequelize.STRING
      },
      birthdate: {
        type:Sequelize.DATE
        
      }
 
  });
  return Student;
};