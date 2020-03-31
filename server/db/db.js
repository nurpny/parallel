const pkg = require('../../package.json')
const { Sequelize } = require('sequelize');


module.exports = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false
})


