var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Users = require('./users')


mongoose.connect('mongodb+srv://admin:admin@shop-qdrg3.gcp.mongodb.net/test',{ useUnifiedTopology: true ,useNewUrlParser: true},(error)=>{
    if(!error){
        console.log("bağlantı başarılı")}
    if(error){
        throw error
    }
    mongoose.set('useFindAndModify',false);
    });

var urlEncodedParser = bodyParser.urlencoded({extended:false})
//app.use(bodyParser.json)

app.get('/',function(req,res){})

app.get('/sil',function(req,res){
    fs.readFile('sil.html',function(err,data){
        res.write(data)
        res.end()
    })
})

app.get('/guncelle',function(req,res){
    fs.readFile('guncelle.html',function(err,data){
        res.write(data)
        res.end()
    })
})

app.get('/example',function(req,res){
    fs.readFile('index.html',function(err,data){
        res.write(data)
        res.end()
    })

})

var Fname, Lname, Age;

app.post('/example',urlEncodedParser,function(req,res){
    res.setHeader('Content-Type','text/html')
    var Fname = req.body.fname;
    var Lname = req.body.lname;
    var Age = req.body.age;

    var Users1 = new Users({
        fname:Fname,
        lname:Lname,
        age:Age
    })

    Users1.save((error)=>{
        if(error){
            throw error
        }
        else{
            req.method='get';
            res.redirect('http://localhost:8000/example')
        }
    })
    
})
app.post('/sil',urlEncodedParser,function(req,res){
    res.setHeader('Content-Type','text/html')
    var İsim = req.body.isim;

    Users.findOneAndDelete({name:İsim},(error)=>{
        if(error){
            throw error;
        }
        else{
            req.method='get';
            res.redirect('http://localhost:8000/example')
        }
    })
})

app.post('/guncelle',urlEncodedParser,function(req,res){
    res.setHeader('Content-Type','text/html')
    var Gfname = req.body.gfname;
    var Glname = req.body.glname;
    var Gage = req.body.gage;
    var Efname = req.body.efname;

    //var newValues = {$set:{fname:Gfname, lname:Glname,age:Gage}}

    Users.findOneAndUpdate(Efname,{fname:Gfname,lname:Glname,age:Gage},(error)=>{
        if(error){
            throw error
        }
        else{
            req.method='get';
            res.redirect('http://localhost:8000/example')
        }
    })
})



app.listen(8000)