const { PrismaClient } =  require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new  PrismaClient();

const createUser = async (req, res) => {
    try {
      const user = await prisma.user.create({ data: req.body });
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error creating user: ${error}` });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching users: ${error}` });
    }
  };
  
  const getUserById = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({ where: { UserID: parseInt(req.params.id) } });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      }
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching user: ${error}` });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const user = await prisma.user.update({
        where: { UserID: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error updating user: ${error}` });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      await prisma.user.delete({ where: { UserID: parseInt(req.params.id) } });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error deleting user: ${error}` });
    }
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  }