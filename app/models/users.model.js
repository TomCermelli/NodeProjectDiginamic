module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        msg: "Cet email est déja utilisé"
      }
    },
    password: {
      type: Sequelize.STRING
    },
  },
    {
      timestamps: false
    });
  return User;
};