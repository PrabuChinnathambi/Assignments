const express = require('express');

const { loginUser, registerUser } = require('../controllers/loginController');

const router = express.Router();


router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);


module.exports = {
    routes: router
}