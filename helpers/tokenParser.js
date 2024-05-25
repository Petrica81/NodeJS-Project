const { request } = require("express");
const jwt = require("jsonwebtoken");

const getUserIdFromToken = async (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.UserID;
};

const getRoleFromToken = async (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.Role;
};

module.exports = { getUserIdFromToken, getRoleFromToken };