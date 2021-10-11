const UserSchema = require('../models/loginSchema');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
    try {
        const body = req.body;
        const userExist = await UserSchema.findOne({ email: req.body.email });

        if (userExist) {
            res.status(400).json({ message: " User aleady added" })
        }
        else {
            const sample = new UserSchema(body);
            sample.save()
                .then(data => {
                    res.status(200).json(data)
                })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const body = req.body;

        const userExist = await UserSchema.findOne({ email: body.email });

        if (!userExist) {
            res.status(400).json({ message: " User not added" })
        }

        if (userExist.password !== body.password) {
            res.status(400).json({ message: " Password Incorrect" })
        }

        const payload = { email: userExist.email }
        const token = jwt.sign(payload, "podInterViewAssignMents", { expiresIn: "1d" });

      
        res.status(200).json(token);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    registerUser,
    loginUser
}