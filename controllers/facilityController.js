const { PrismaClient } =  require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new  PrismaClient();

const createFacility = async (req, res) => {
    try{
        const facility = await prisma.facility.create({ data: req.body });
        re.status(StatusCodes.CREATED).json(facility);
    }
    catch (error){
        res.status(StatusCodes.BAD_REQUEST)
                .json({ message: `Error creating facility: ${error}`});
    }
};
// Read All
const getAllFacilities = async (req, res) => {
    try {
      const facilities = await prisma.facility.findMany();
      res.status(StatusCodes.OK).json(facilities);
    } 
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching facilities: ${error}` });
    }
  };
  
  // Read One
  const getFacilityById = async (req, res) => {
    try {
      const facility = await prisma.facility.findUnique({ where: { FacilityID: parseInt(req.params.id) } });
      if (!facility) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Facility not found" });
      }
      res.status(StatusCodes.OK).json(facility);
    } 
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error fetching facility: ${error}` });
    }
  };
  
  // Update
  const updateFacility = async (req, res) => {
    try {
      const facility = await prisma.facility.update({
        where: { FacilityID: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(StatusCodes.OK).json(facility);
    } 
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error updating facility: ${error}` });
    }
  };
  
  // Delete
  const deleteFacility = async (req, res) => {
    try {
      await prisma.facility.delete({ where: { FacilityID: parseInt(req.params.id) } });
      res.status(StatusCodes.NO_CONTENT).send();
    } 
    catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Error deleting facility: ${error}` });
    }
  };
  
  module.exports = {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
  };