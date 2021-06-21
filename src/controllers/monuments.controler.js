
const MonumentsModel = require('../models/monuments.model');


// get all employee list
exports.getMonumentsList = (req, res)=> {
    MonumentsModel.getMonuments((err, monuments) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Monument', monuments);
        res.send(monuments)
    })
}

