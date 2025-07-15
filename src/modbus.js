const ModbusRTU = require("modbus-serial");

const client = new ModbusRTU();

const connect = async () => {
    try{
        client.setTimeout(5000)
        await client.connectTCP("172.27.116.23", { port: 502 });
        client.setID(1);
        console.log("Conectado")
        return(true)
    }catch(err){
        console.log("Error de conexion")
        return(false)
    }
}

const monitoring = async (array) => {
    try{
        let connected = true
        if(!client.isOpen){
            console.log("reconectando...")
         connected = await connect()
        }

    const registers = []
    for (const register of array) {
        const type = register.type.split(" ")[1]
        let value = '???'
        if(connected){
            if(type==="BIT"){
                value = await client.readCoils(register.address, 1);
            }else{
                value = await client.readHoldingRegisters(register.address, 1);
            }
            value = value.data[0]
        }
        const memorie = {...register.dataValues}
        memorie.value = value
        registers.push(memorie);
    }

    return {connected, registers}
    


    }catch(error){
        console.log(error)
    };
};

module.exports = { monitoring, connect }
