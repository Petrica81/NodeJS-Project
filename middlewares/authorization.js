const { response, request } = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');

const verifyAuth = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if(!authorization) {
            throw new Error("You must be logged in!");
        }

        const bearer = authorization.split(" ")[0];
        const token = authorization.split(" ")[1];

        if(bearer !== "Bearer") {
            throw new Error("You must provide a Bearer token!"); 
        } else if(!token) {
            throw new Error("You must provide a token!");
        }

        jwt.verify(token, process.env.SECRET_KEY);
    
        next();
    } catch(error) {
        response.status(StatusCodes.UNAUTHORIZED).json({ message: `${error}` });
    }
}


const verifyAdmin = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const role = decodedToken.role;

        if(role !== "ADMIN") {
            throw new Error("Admin role is needed!");
        }

        next();
    } catch(error) {
        response.status(StatusCodes.UNAUTHORIZED).json({ message: `${error}` });
    }
}

module.exports = { verifyAuth, verifyAdmin };