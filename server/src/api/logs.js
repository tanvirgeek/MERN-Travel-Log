
const {Router} = require('express');
const router = Router()
const OneDataModel = require('../models/oneDataModel')
const LogEntryModel = require('../models/logEntry')

router.get('/', async(req, res, next)=>{

    try{
        const entries = await LogEntryModel.find();
        res.json(entries);
    }catch(error){
        next(error)
    }
    
})

router.post("/", async(req, res, next)=>{
    try{
        console.log(req.body)
        const logData = new LogEntryModel(req.body);
        const createdEntry = await logData.save();
        res.json(createdEntry);
    }catch(error){
        if (error.name === "ValidationError"){
            res.status(422)
        }
        next(error);
    }
    
})

router.get('/insertLog/:title',(req,res)=>{
    const logData = new LogEntryModel({
        title: `${req.params.title}`
    })
    logData.save((err, document)=>{
        if(err){
            res.status(500).json({
                message:{
                    messageBody: "Unable to Add Data",
                    msgError: true
                }
            })
        }else{
            res.status(200).json({message:{
                msgBody: "Data added Successfully",
                msgErr: false
            }})
        }
    })
})

router.get('/insert/:data', (req, res)=>{
    const oneData = new OneDataModel({
        title:`${req.params.data}`,
        name: "GMK"
    });
    oneData.save((err,document)=>{
        if(err){
            res.status(500).json({
                message:{
                    msgBody:"unable to add data",
                    msgError: true
                }
            })
        }else{
            res.status(200).json({message:{
                msgBody: "data successfully added",
                msgError: false
            }})
        }
    })
})

router.get('/gmk', (req, res)=>{
    res.json({
        message: "gmk from logs page"
    })
})
router.get('/plus/:one/:two', (req, res)=>{
    if(isNaN(req.params.one || isNaN(req.params.two))){
        res.json({
            message: 'please type whole number in the URL'
        })
    }else{
        const result = parseInt(req.params.one) + parseInt(req.params.two);
        res.json({
            result: `${result}`
        })    
    }
    
})

module.exports = router;