const { DataTypes } = require('sequelize');
const { db } = require('../connection');
const Group = require('./group')

const Register = db.define('register', {
    type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    address: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_group: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
},
{
    freezeTableName: true
}
)

// relacion tipo_usuario y usuario
Group.hasMany(Register,{
   foreignKey: "id_group",
});

Register.belongsTo(Group, {
   foreignKey: "id_group",
});

Register.sync()
    .then(()=>{
        console.log('tabla Register sincronizada');
    })
    .catch((error)=>{
        console.error('Register error:', error);
    });

module.exports = Register;