const { PrismaClient } =  require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new  PrismaClient();

const createSession = async (req, res) => {
    try {
      const session = await prisma.session.create({ data: req.body });
      res.status(StatusCodes.CREATED).json(session);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error creating session: ${error}` });
    }
};
  
const getAllSessions = async (req, res) => {
    try {
      const sessions = await prisma.session.findMany();
      res.status(StatusCodes.OK).json(sessions);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching sessions: ${error}` });
    }
};
  
const getSessionById = async (req, res) => {
    try {
      const session = await prisma.session.findUnique({ where: { SessionID: parseInt(req.params.id) } });
      if (!session) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Session not found" });
      }
      res.status(StatusCodes.OK).json(session);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching session: ${error}` });
    }
};
  
const updateSession = async (req, res) => {
    try {
      const session = await prisma.session.update({
        where: { SessionID: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(StatusCodes.OK).json(session);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error updating session: ${error}` });
    }
};
  
const deleteSession = async (req, res) => {
    try {
      await prisma.session.delete({ where: { SessionID: parseInt(req.params.id) } });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error deleting session: ${error}` });
    }
};

module.exports = {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession,
}