
const UserModel = require('../models/user.model');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");


// get all employee list
exports.getUserList = (req, res)=> {
    UserModel.getUser((err, users) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('User', users);
        res.send(users)
    })
}


exports.createNewUser = (req, res) =>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData', userReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUser(req.body, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Usr Created Successfully', data: user.insertId})
        })
    }
}
exports.getLogin= (req, res)=>{
    
    const body = req.body;
    UserModel.getUserByUserEmail(body.email, (err, results) => {
        if (err) {
        console.log(err);
        }
        // if (!results) {
        //     return res.json({
        //         success: 0,
        //         data: "Invalid email or password"
        //     });
        // }
        if (results) {
            UserModel.getUserByUserPassword(body.password, (err, results) => {
                if (err) {
                console.log(err);
                }
                // if (!results) {
                // return res.json({
                //     success: 0,
                //     data: "Invalid email or password"
                // });
                // }
                if (results) {
                    return res.json({
                    success: 1,
                    data: results
                });
                }
            });
        }
    });
        
            
}
