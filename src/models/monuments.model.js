var dbConn  = require('../../config/db.config');

var Monuments = function(monuments){
    this.nom     =   monuments.nom;
    this.latitude      =   monuments.latitude;
    this.longitude          =   monuments.longitude;
    this.ville          =   monuments.ville;
    this.commentaire   =   monuments.commentaire;
    this.date    =   monuments.date;
    this.image    =   monuments.image;
}

Monuments.getMonuments = (result) =>{
    dbConn.query('SELECT * FROM monuments', (err, res)=>{
        if(err){
            console.log('Error while fetching Monuments', err);
            result(null,err);
        }else{
            console.log('monuments fetched successfully');
            result(null,res);
        }
    })
}


module.exports = Monuments;