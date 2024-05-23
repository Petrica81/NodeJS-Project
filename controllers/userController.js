const { PrismaClient } =  require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new  PrismaClient();
const { getUserIdFromToken, getRoleFromToken } = require("../helpers/tokenParser");

const register = async (request, response) => {
  try {
    const { Username, Email, Password } = request.body;

    if (await prisma.user.findUnique({ where: { Email: Email } })) {
      throw new Error("Email already used!");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const savedUser = await prisma.user.create({
      data: {
        Username: Username, 
        Email: Email,
        Role: "USER",
        Password: hashedPassword,
      },
    });

    const { UserID, Role } = savedUser;

    const token = jwt.sign(
      {
        UserID,
        Username,
        Email,
        Role,
      },
      SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    response.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

const login = async (request, response) => {
  try {
    const { Email, Password } = request.body;

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { Email: Email },
    });

    const isPasswordCorrect = await bcrypt.compare(
      Password,
      existingUser.Password
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password!");
    }

    const { UserID, Username, Role } = existingUser;
    const token = jwt.sign(
      {
        UserID,
        Username,
        Email,
        Role,
      },
      SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    response.status(StatusCodes.ACCEPTED).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

const createUser = async (request, response) => {
    try {
      const user = await prisma.user.create({ data: request.body });
      response.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: `Error creating user: ${error}` });
    }
  };
  
const getAllUsers = async (request, response) => {
    try {
      const users = await prisma.user.findMany();
      const usersWithoutPassword = users.map((user) => {
        const { Password, ...usersWithoutPassword} = user;
        return usersWithoutPassword;
      });
      response.status(StatusCodes.OK).json(usersWithoutPassword);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching users: ${error}` });
    }
  };
  
const getUserById = async (request, response) => {
    try {
      const user = await prisma.user.findUnique({ where: { UserID: parseInt(request.params.id) }});
      if (!user) {
        return response.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      }
      const { Password, ...userWithoutPassword} = user;

      response.status(StatusCodes.OK).json(userWithoutPassword);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching user: ${error}` });
    }
  };
  
const updateUser = async (request, response) => {
    try {
      console.log(await getRoleFromToken(request));
      console.log(await getUserIdFromToken(request));
      if(await getRoleFromToken(request) !== 'ADMIN' && await getUserIdFromToken(request) !== parseInt(request.params.id)) {
        throw new Error('You are not the owner of this account!');
      }
      const user = await prisma.user.update({
        where: { UserID: parseInt(request.params.id) },
        data: request.body,
      });
      response.status(StatusCodes.OK).json(user);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: `Error updating user: ${error}` });
    }
  };
  
const deleteUser = async (request, response) => {
    try {
      if(getRoleFromToken(request) !== 'ADMIN' && getUserIdFromToken(request) !== request.params.id) {
        throw new Error('You are not the owner of this account!');
      }
      await prisma.user.delete({ where: { UserID: parseInt(request.params.id) } });
      response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({ message: `Error deleting user: ${error}` });
    }
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    register,
    login,
  }