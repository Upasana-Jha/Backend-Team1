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
const Salaries = sequelize.define('Salaries', {
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  employeeid: {
    type: DataTypes.NUMBER
  },
  monthyear: {
    type: DataTypes.STRING
  },
  basic: {
    type: DataTypes.NUMBER
  },
  hra: {
    type: DataTypes.NUMBER
  },
  lta: {
    type: DataTypes.NUMBER
  },
  variable: {
    type: DataTypes.NUMBER
  },
  bonus: {
    type: DataTypes.NUMBER
  },
  tds: {
    type: DataTypes.NUMBER
  },
  tax: {
    type: DataTypes.NUMBER
  },
  bonus: {
    type: DataTypes.NUMBER
  },
  workingdaysinmonth: {
    type: DataTypes.NUMBER
  },
  dateofentry: {
    type: DataTypes.DATE
  },
  dateofmodify: {
    type: DataTypes.DATE
  }

}, {
  tableName: 'salaries'
});

module.exports = Salaries;