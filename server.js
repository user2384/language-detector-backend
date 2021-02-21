const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const detect = require('./controllers/detect');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'viki',
        password : '',
        database : 'app'
    }
})  

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.send('looks fine to me')});
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.post('/detect', (req, res) => { detect.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running');
})