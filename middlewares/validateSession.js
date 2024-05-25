const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const validateSession = async (req, res, next) => {
    try {
        const { FacilityID, TrainerID, SessionDateTime } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userID = decodedToken.UserID;

        const sessionStart = new Date(SessionDateTime);
        // durata unei sesiuni este de o oră
        const sessionEnd = new Date(sessionStart.getTime() + 60 * 60000);

        const user = await prisma.user.findUniqueOrThrow({
            where: { UserID: parseInt(userID) },
        });

        const facility = await prisma.facility.findUniqueOrThrow({
            where: { FacilityID: parseInt(FacilityID) },
        });

        const overlappingSessions = await prisma.session.findMany({
            where: {
                FacilityID: parseInt(FacilityID),
                SessionDateTime: {
                    gte: sessionStart,
                    lt: sessionEnd,
                },
            },
        });

        if (overlappingSessions.length >= facility.Capacity) {
            throw new Error(`The facility has reached its capacity of ${facility.Capacity} sessions for the selected time interval.`);
        }

        const overlappingTrainerSessions = await prisma.session.findMany({
            where: {
                TrainerID: parseInt(TrainerID),
                SessionDateTime: {
                    gte: sessionStart,
                    lt: sessionEnd,
                },
            },
        });

        if (overlappingTrainerSessions.length > 0) {
            throw new Error(`The trainer already has a session in the selected time interval.`);
        }

        next();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

module.exports = validateSession;
