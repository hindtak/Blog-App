const { models } = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRegister = async(req, res) => {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });
    user.save()
    .then(user => {
        const token = jwt.sign({serId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token, user });
        console.log("user added")
    })
    .catch( err => res.status(400).json(err));
    
};
const userLogin = async(req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
     res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
     res.status(400).json({ message: 'Invalid password' });
    } else {
        console.log("loging sussssssssss")
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.json({ token, user });
    }
    
   
    } catch (err){ console.log(err)}
}

module.exports = {
    userRegister,
    userLogin
}