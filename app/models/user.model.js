module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    emailId: {
      type: Sequelize.STRING,
      unique:true,
      allowNull: false,
    },
    accountId: {
      type: Sequelize.STRING,
      unique:true,
      allowNull: false,
    },
    accountName: {
      type: Sequelize.STRING,
      unique:true,
      allowNull: false,
    }
  });

  return User;
};
