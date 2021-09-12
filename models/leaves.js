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
const Leaves = sequelize.define('Leaves', {
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
  startdate: {
    type: DataTypes.DATE
  },
  enddate: {
    type: DataTypes.DATE
  },
  count: {
    type: DataTypes.NUMBER
  },
  year: {
    type: DataTypes.NUMBER
  },
  dateofentry: {
    type: DataTypes.DATE
  },
  dateofmodify: {
    type: DataTypes.DATE
  }

}, {
  tableName: 'leaves'
});

module.exports = Leaves;