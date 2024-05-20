const { PrismaClient } =  require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new  PrismaClient();

const createTrainer = async (req, res) => {
    try {
      const trainer = await prisma.trainer.create({ data: req.body });
      res.status(StatusCodes.CREATED).json(trainer);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error creating trainer: ${error}` });
    }
  };
  
  const getAllTrainers = async (req, res) => {
    try {
      const trainers = await prisma.trainer.findMany();
      res.status(StatusCodes.OK).json(trainers);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching trainers: ${error}` });
    }
  };
  
  const getTrainerById = async (req, res) => {
    try {
      const trainer = await prisma.trainer.findUnique({ where: { TrainerID: parseInt(req.params.id) } });
      if (!trainer) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Trainer not found" });
      }
      res.status(StatusCodes.OK).json(trainer);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching trainer: ${error}` });
    }
  };
  
  const updateTrainer = async (req, res) => {
    try {
      const trainer = await prisma.trainer.update({
        where: { TrainerID: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(StatusCodes.OK).json(trainer);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error updating trainer: ${error}` });
    }
  };
  
  const deleteTrainer = async (req, res) => {
    try {
      await prisma.trainer.delete({ where: { TrainerID: parseInt(req.params.id) } });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error deleting trainer: ${error}` });
    }
  };

  module.exports = {
    createTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
  }