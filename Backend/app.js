const http = require('http');
const {createServer} = require('node:http');

const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const passwordRoutes = require('./routes/password');



const User = require('./models/User');
const ForgotPassword = require('./models/ForgotPassword');



const app = express();
var cors = require('cors');
app.use(cors());



require('dotenv').config();







//middlewares with Routes
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')))


app.use('/user', userRoutes);
app.use('/password', passwordRoutes);




//DB Associations
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);



const PORT = process.env.PORT_NO;

function initiate(){
    sequelize
        // .sync({force: true})
        .sync()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`>>>>Server is listening on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err);
    }); 
}

initiate();