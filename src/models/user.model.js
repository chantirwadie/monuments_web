var dbConn  = require('../../config/db.config');

var User = function(user){
    this.firstName     =   user.first_name;
    this.lastName      =   user.last_name;
    this.email          =   user.email;
    this.phone          =   user.phone;
    this.image   =   user.image;
    this.password    =   user.password;
}

// get all users
User.getUser = (result) =>{
    dbConn.query('SELECT * FROM users', (err, res)=>{
        if(err){
            console.log('Error while fetching Users', err);
            result(null,err);
        }else{
            console.log('users fetched successfully');
            result(null,res);
        }
    })
}

User.getUserByUserEmail = (email, result)=>{
    dbConn.query('SELECT * FROM users WHERE email=?', email, (err, res)=>{
        if(err){
            console.log('Error while fetching User by email', err);
            result(null, err);
        }else{
            result(null, res[0]);
        }
    })
}
User.getUserByUserPassword = (password, result)=>{
    dbConn.query('SELECT * FROM users WHERE password=?', password, (err, res)=>{
        if(err){
            console.log('Error while fetching User by password', err);
            result(null, err);
        }else{
            result(null, res[0]);
        }
    })
}

// create new users
User.createUser = (userReqData, result) =>{
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('user created successfully');
            result(null, res)
        }
    })
}

module.exports = User;