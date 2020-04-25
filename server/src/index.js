const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet') 
const cors = require('cors')
const middleware = require('./middlewares')
require('dotenv').config()
const logs = require('./api/logs')

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.use(morgan('common')) 
app.use(helmet())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message: "Hello World"
    });
});

app.use('/api/logs', logs);
app.use(middleware.notFound)
app.use(middleware.errorHandler)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
