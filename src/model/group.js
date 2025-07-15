const { DataTypes } = require('sequelize');
const { db } = require('../connection');

const Group = db.define('group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
},
{
    freezeTableName: true
}
)

Group.sync()
    .then(()=>{
        console.log('tabla group sincronizada');
    })
    .catch((error)=>{
        console.error('group error:', error);
    });

module.exports = Group;