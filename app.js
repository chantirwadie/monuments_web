const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

//connect to db
const mysql = require('mysql');
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'expressdb'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});

//definir moteur de template
//set views file
app.set('views',path.join(__dirname,'views'));
//app.use(express.static(__dirname + '/views/visite'));
app.use(express.static('public'));

			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ajouter le chemin d'accueil et définir la page d'index des etudiants
app.get('/users/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('users/index', {
            title : 'gestion etudiants',
            etudiant : rows
        });
    });
});


app.get('/users/add',(req, res) => {
    res.render('users/add', {
        title : 'gestion etudiants'
    });
});

app.post('/users/save',(req, res) => { 
    let data = {id: req.body.id, firstName: req.body.nom , lastName: req.body.prenom , email: req.body.email , image: req.body.image ,password: req.body.password ,};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/users/');
    });
});

app.get('/users/edit/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `Select * from users where id = ${Id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('users/edit', {
            title : 'gestion etudiants',
            e : result[0]
        });
    });
});


app.post('/users/update',(req, res) => {
    const Id = req.body.id;
    let sql = "update users SET id='"+req.body.id+"',  firstName='"+req.body.nom+"',lastName='"+req.body.prenom+"',email='"+req.body.email+"',image= '"+req.body.image+"',password= '"+req.body.password+"' where id ="+Id;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/users/');
    });
});


app.get('/users/delete/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `DELETE from users where id = ${Id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/users/');
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ajouter le chemin d'accueil et définir la page d'index des monuments
app.get('/monuments/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM monuments";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('monuments/index', {
            title : 'gestion monuments',
            etudiant : rows
        });
    });
});


app.get('/monuments/add',(req, res) => {
    res.render('monuments/add', {
        title : 'gestion monuments'
    });
});

app.post('/monuments/save',(req, res) => { 
    let data = {id: req.body.id, nom: req.body.nom , longitude: req.body.longitude , latitude: req.body.latitude , ville: req.body.ville,date: req.body.date,commentaire: req.body.commentaire,image: req.body.image};
    let sql = "INSERT INTO monuments SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/monuments/');
    });
});

app.get('/monuments/edit/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `Select * from monuments where id = ${Id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('monuments/edit', {
            title : 'gestion monuments',
            e : result[0]
        });
    });
});


app.post('/monuments/update',(req, res) => {
    const Id = req.body.id;
    let sql = "update monuments SET id='"+req.body.id+"',  nom='"+req.body.nom+"' ,  commentaire='"+req.body.commentaire+"' ,  date='"+req.body.date+"' ,  image='"+req.body.image+"',longitude='"+req.body.longitude+"',latitude='"+req.body.latitude+"',ville='"+req.body.ville+"' where id ="+Id;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/monuments/');
    });
});


app.get('/monuments/delete/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `DELETE from monuments where id = ${Id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/monuments/');
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/visite/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM monuments";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('visite/index', {
            title : 'visite',
            etudiant : rows
        });
    });
});
;
const userwebRoutes = require('./src/routes/userweb.route');
app.use('/login/',userwebRoutes, (req, res) => {
    res.render("login");
});

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});