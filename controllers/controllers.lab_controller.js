
const PcsData = require('../models/lab_controller.model')
const shutdownWS = require('./shutdownWS.lab_controller')


const starting = (req, res) => {
    res.send('starting is working')
}

const addToDatabaseClint = async (req, res) => {
    const clintdata = req.body
    const {pcNumber, labNumber, macAddress, password} = req.body
    // res.json(clint)
    // res.send('updateDatabaseClint is working')
    if (password == 123) {

        const newPcsData = new PcsData(clintdata.data)
        
        await newPcsData.save()
        res.send('done')
            // {
            //     "password" : 123,   
            //     "data" : {
            //         "status": {
            //             "mouce": "2023-10-25T10:30:00.000Z",
            //             "keyboard": "2023-10-25T10:30:00.000Z",
            //             "openedTab": ["goos.com"]
            //         },
            //         "macAddress": "02:1A:2B:dsfsdfdfsdf:4D:5E",
            //         "pcNumber": 18,
            //         "labNumber": 1,
            //         "timeOfBoot": "2023-10-25T08:00:00.000Z",
            //         "openTimeAllowed": null
            //     }
            // }
    } else {
        res.send('error')
    }
    // mongodb
    // update database with (clint)

    // await PcsData.updateOne(
    //     { pcNumber : pcNumber, labNumber : labNumber, macAddress : macAddress, }, 
    //     { $set : clintdata }
    // );
}

const updateDatabaseClint = async (req, res) => {
    const clintdata = req.body
    const {pcNumber, labNumber, macAddress} = req.body
    // res.json(clint)
    // res.send('updateDatabaseClint is working')
    // const newPcsData = new PcsData(clintdata)
    // mongodb
    // update database with (clint)
    // await newPcsData.save()
    await PcsData.updateOne(
        { pcNumber : pcNumber, labNumber : labNumber, macAddress : macAddress, }, 
        { $set : clintdata }
    );
    res.send('done')
}

const getAllInfo = async (req, res) => {
    // mongodb
    const data = await PcsData.find()
    
    // res.send('getAllInfo is working')
    res.json(data)
    // sind all info in database
}

const shutdownAPC =  (req, res) => {
    const lab = req.params.lab
    const pcId = req.params.pcId

    // numbers or "all"
    // res.json()
                                                        // do the shut down
                                                        shutdownWS.shutdownIt(lab, pcId)
    // WS
    res.send('shutdownAPC is working')
}

const shutdownAllowence = async (req, res) => {
    const clint = req.body
    const {pcNumber, labNumber, macAddress} = req.body
    // is it allowed to do so??
    // res.send({states : true})
    // mongodb
    // res.send({states : true, time : "2024-07-23 08:00:00"})

    const now = new Date.now();
    // console.log(now); 

    const clintInDB = await PcsData.find(
        { pcNumber : pcNumber, labNumber : labNumber, macAddress : macAddress, }
    );

    if (clintInDB.openTimeAllowed < now || clintInDB.openTimeAllowed == null) {

                                                        res.send({states : true})
                                                        // you may do the shut down
                                                        // res.send(true)
    }
    else {
                                                        res.send({states : false, time : (clintInDB.openTimeAllowed - now)})
    }



    // res.send('shutdownAllowence is working')

}

const clintAllowanceChange = async (req, res) => {
    // the pc and the time
    const clint = req.body
    // mongodb
    // res.send('done')

    const {pcNumber, labNumber, openTimeAllowed} = req.body
    // res.json(clint)
    // res.send('updateDatabaseClint is working')
    // const newPcsData = new PcsData(clintdata)
    // mongodb
    // update database with (clint)
    // await newPcsData.save()
    await PcsData.updateOne(
        { pcNumber : pcNumber, labNumber : labNumber }, 
        { openTimeAllowed : openTimeAllowed }
    );
// {
//     "pcNumber" : 1,
//     "labNumber" : 1,
//     "openTimeAllowed" : "2026-04-25 20:26:50"
// }
    res.send('done')

}

const getdashBoard =  (req, res) => {
    // will be reblaced with github pages
    res.send('getdashBoard is working')
}

module.exports = {
    starting,
    updateDatabaseClint,
    getAllInfo,
    shutdownAPC,
    shutdownAllowence,
    clintAllowanceChange,
    getdashBoard,
    addToDatabaseClint
}