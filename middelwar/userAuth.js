const jwt = require('jsonwebtoken');

const express = require('express');
function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token =  authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

        
    

 module.exports = authenticateUser
//  const token = req.headers.authorization.replace("Bearer ", "");
//  const decoded = jwt.verify(token, process.env.JWT_SECRET);
//  req.userData = decoded;
//  next();
// } catch (err) {
//  return res.status(401).json({
//    message: "Authentification Failed"
//  });