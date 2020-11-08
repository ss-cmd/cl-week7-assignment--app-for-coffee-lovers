let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let Datastore = require('nedb');
let db = new Datastore('cafes.db');
db.loadDatabase();



app.post('/cafes',(req,res)=>{
    let cafesObj = {
        location : req.body.location,
        address : req.body.address,
        name : req.body.name,
        option : req.body.option
    }

    db.insert(cafesObj,(err,newDocs)=>{
    if(err){
        res.json({task:"task failed"});
    }else{
        res.json({task: "success"});
    }
})
});

app.use('/',express.static('public'));

app.get('/getCafes', (req,res)=>{
    db.find({},(err,docs)=>{
        if(err){
            res.json({task:"task failed"})
        }else{
            let obj = {data:docs};
            res.json(obj);
        }
    })
});

app.listen(8000,()=>{
    console.log('listening at localhost:8000');
})