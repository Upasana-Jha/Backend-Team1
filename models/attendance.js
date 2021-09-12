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
const Attendance = sequelize.define('Attendance', {
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
  date: {
    type: DataTypes.DATE
  },
  intimedate: {
    type: DataTypes.DATE
  },
  outtime: {
    type: DataTypes.DATE
  },
  totalhours: {
    type: DataTypes.NUMBER
  }

}, {
  tableName: 'attendance'
});

module.exports = Attendance;
