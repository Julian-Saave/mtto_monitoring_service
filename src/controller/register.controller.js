const Register = require('../model/register')
const Group = require('../model/group');
const { monitoring } = require('../modbus')

const types = [
    {name: 'X', type: 'BIT', address: 24576, length: 1024},
    {name: 'Y', type: 'BIT', address: 40960, length: 1024},
    {name: 'M', type: 'BIT', address: 0, length: 8192},
    {name: 'SM', type: 'BIT', address: 16384, length: 4095},
    {name: 'SR', type: 'BIT', address: 49152, length: 2048},
    {name: 'D', type: 'WORD', address: 0, length: 30000},
    {name: 'S', type: 'BIT', address: 20480, length: 2048},
    {name: 'T', type: 'BIT', address: 57344, length: 511},
    {name: 'T', type: 'WORD', address: 57344, length: 511},
    {name: 'C', type: 'BIT', address: 61440, length: 511},
    {name: 'C', type: 'WORD', address: 61440, length: 511},
]

function capitalize(string) {
    const name = string.toLowerCase()
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const getRegisters = async (req, res)=>{
    try{
        const registers = await Register.findAll();
        return res.status(200).json({ success: true, registers})
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const getRegister = async (req, res)=>{
    try{
        const { id_group } = req.params;
        const { type, number } = req.query;

        if(!type&&!number){
            const memories = await Register.findAll({
            where: {
                id_group: id_group
                }
            })

            const group = await monitoring(memories)
            const registers = group.registers

            if(!group.connected){
                return res.status(400).json({success: false,registers, message: 'Error de conexión'})
            }

            return res.status(200).json({success: true, registers, message:'Consulta exitosa'})
        }

        const register = await Register.findOne({
            where: {
                type: type,
                number: number,
                id_group: id_group
            }
        })
        if(!register){
            return res.status(404).json({success: false, message: 'No se encontro registro'})
        }

        return res.status(200).json({success: true, register, message:'Consulta exitosa'})

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})    
    }
}

const postRegister = async (req, res)=>{
    try{
        const { type, number, name, length, id_group } = req.body;
        console.log(id_group)

        const ifGroup = await Group.findByPk(id_group);

        if(!ifGroup){
        return res.status(400).json({success: false, message: 'Grupo no encontrado'})
    }
        const ifRegister = await Register.findOne({
            where: {
                type: type,
                number: number,
                id_group: id_group
            }
        })

        if(ifRegister){
        return res.status(400).json({success: false, message: 'Ya existe este registro'})
    }
        const memoryType = type.split(" ")
        const address = types.find(memory => memory.name === memoryType[0] && memory.type === memoryType[1])
        console.log(address)

        const register = new Register({
            type: type,
            number: number,
            name: capitalize(name),
            address: address.address+Number(number),
            length: length,
            id_group: id_group
        })
        register.save();

        res.json({ success: true, message: 'Registro creado correctamente' })

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const putRegister = async (req, res)=>{
    try{
        const { id } = req.params;
        const { name } = req.body;

        const group = await Register.findByPk(id);
        console.log(group)

        if(!group){
            return res.status(404).json({success: false, message: 'Grupo no encontrado'})
        }else if(group.name === capitalize(name)){
            return res.status(400).json({success: false, message: 'Ya existe un grupo con este nombre'})
        }

        await group.update({name: capitalize(name)})

        return res.json({ success: true, message: 'Grupo actualizado' })

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const deleteRegister = async (req, res) => {
    try{
        const { id_group } = req.params;
        const { type, number } = req.query;
        console.log(type)

        
        const register = await Register.findOne({
            where: {
                type: type,
                number: number,
                id_group: id_group
            }
        })
        if(!register){
            res.status(404).json({success: false, message: 'Registro no encontrado'})
        }
        
        await register.destroy();
        return res.json({ success: true, message: 'Registro eliminado' })
        
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const getTypes = async (req, res)=>{
    try{
        return res.json({ success: true, types })
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Error interno'})
    }
}

const pruebaModbus = async (req, res) => {
    try{
        const group = [
		{
			"type": "M BIT",
			"number": 0,
			"name": "Bomba vacio",
			"address": 0,
			"length": 1,
			"id_group": 75,
			"createdAt": "2025-06-16T18:48:45.411Z",
			"updatedAt": "2025-06-16T18:48:45.411Z"
		},
		{
			"type": "M BIT",
			"number": 2,
			"name": "Dosificado",
			"address": 1,
			"length": 1,
			"id_group": 75,
			"createdAt": "2025-06-16T18:49:07.332Z",
			"updatedAt": "2025-06-16T18:49:07.332Z"
		},
		{
			"type": "D WORD",
			"number": 0,
			"name": "Soplado",
			"address": 2,
			"length": 1,
			"id_group": 75,
			"createdAt": "2025-06-16T18:52:09.124Z",
			"updatedAt": "2025-06-16T18:52:09.124Z"
		}
	]
        const memoria = await monitoring(group)
        return res.json({ success: true, memoria })
    }catch(err){
        console.log(err)
    }
}
module.exports = { getRegisters, getRegister ,postRegister ,putRegister, getTypes, deleteRegister, pruebaModbus }