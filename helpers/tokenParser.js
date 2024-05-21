const { request } = require("express");
const jwt = require("jsonwebtoken");

const getUserIdFromToken = async (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.UserID;
};

const getRoleFromToken = async (request) => {
  const role = jwt.verify(
    request.headers.authorization.split(" ")[1],
    process.env.SECRET_KEY
  ).Role;
  return role;
};

module.exports = { getUserIdFromToken, getRoleFromToken };