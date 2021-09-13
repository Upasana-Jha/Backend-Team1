const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
  'HRMIS',
  'postgres', 
  'Ganesh@0508', {
  host: 'localhost',
  dialect: 'postgres',
  define:{
    timestamps: false
  }
});
const Employee = sequelize.define('Employee', {
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATE
  },
  dateOfJoining: {
    type: DataTypes.DATE
  },
  education: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  dateOfEntry: {
    type: DataTypes.DATE
  },
  dateOfModify: {
    type: DataTypes.DATE
  },
  active: {
    type: DataTypes.STRING
  }


}, {
  tableName: ''
});

module.exports = Employee;
