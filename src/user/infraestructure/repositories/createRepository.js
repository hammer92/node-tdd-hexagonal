module.exports = ({ sequelize, User }) => {
  return (model) => sequelize.transaction((t) => {
    return User.create(model, { transaction: t })
  })
}
