const { Sequelize } = require('sequelize');
const Group = require('../model/group')
const Register = require('../model/register')


function capitalize(string) {
    const name = string.toLowerCase()
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const getGroups = async (req, res)=>{
    try{
        const groups = await Group.findAll({
            attributes:['id', 'name',  [Sequelize.fn('COUNT', Sequelize.col('registers.id_group')), 'registerCount']],
            include:[{
                model: Register,
                as: 'registers',
                attributes: []
            }],
            group: ['group.id'],
        });
        return res.status(200).json({ success: true, groups})
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const getGroup = async (req, res)=>{
    try{
        const { id } = req.params;

        const group = await Group.findByPk(id);
        if(!group){
            return res.status(404).json({success: false, message: 'Grupo no encontrado'})
        }

        return res.status(200).json({success: true, group})

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})    
    }
}

const postGroup = async (req, res)=>{
    try{
        const { name } = req.body;

        const ifGroup = await Group.findOne({
            where: {
                name: capitalize(name)
            }
        });

        if(ifGroup){
        return res.status(400).json({success: false, message: 'Ya existe un grupo con este nombre'})
    }

        const group = new Group({name: capitalize(name)})
        group.save();

        return res.json({ success: true, message: 'Grupo creado correctamente' })

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const putGroup = async (req, res)=>{
    try{
        const { id } = req.params;
        const { name } = req.body;

        const group = await Group.findByPk(id);

        const ifNameGroup = await Group.findOne({
            where: {
                name: capitalize(name)
            }
        });


        if(!group){
            return res.status(404).json({success: false, message: 'Grupo no encontrado'})
        }else if(ifNameGroup){
            return res.status(400).json({success: false, message: 'Ya existe un grupo con este nombre'})
        }

        await group.update({name: capitalize(name)})

        return res.json({ success: true, message: 'Grupo actualizado' })

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const deleteGroup = async (req, res) => {
    try{
        const { id } = req.params;

        const group = await Group.findByPk(id);
        if(!group){
            res.status(404).json({success: false, message: 'Grupo no encontrado'})
        }

        await group.destroy();
        return res.json({ success: true, message: 'Grupo eliminado' })

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

module.exports = { getGroups, getGroup, postGroup, putGroup, deleteGroup }