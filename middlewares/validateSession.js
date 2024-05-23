const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const validateSession = async (request, response, next) => {
    try {
        const { FacilityID, TrainerID, SessionDateTime } = request.body;
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userID = decodedToken.UserID;

        const session = request.body;
        const sessionStart = new Date(sessionDateTime);
        //durata unei sesiuni este de o ora
        const sessionEnd = new Date(sessionStart.getTime() + 60 * 60000); 

        const user = await prisma.user.findUniqueOrThrow({
            where: { UserID: parseInt(userID) },
        });

        const facility = await prisma.facility.findUniqueOrThrow({
            where: { FacilityID: parseInt(FacilityID) },
        });

        const overlappingSessions = await prisma.session.findMany(
            {
                where:{
                    FacilityID: parseInt(FacilityID),
                    SessionDateTime:{
                        gte: sessionStart,
                        lt: sessionEnd,
                    }
                }
            }
        );
        if(overlappingSessions.length >= facility.Capacity){
            throw new Error(`The facility has reached its capacity of ${facility.capacity} sessions for the selected time interval.`);
        }

        const overlappingTrainerSessions = await prisma.session.findMany({
            where: {
              trainerId: parseInt(trainerId),
              sessionDateTime: {
                gte: sessionStart,
                lt: sessionEnd,
              },
            },
          });
      
          if (overlappingTrainerSessions.length > 0) {
            throw new Error(`The trainer already has a session in the selected time interval.`);
          }
      
          next();
    }
    catch (error) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
};

module.exports = validateSession;