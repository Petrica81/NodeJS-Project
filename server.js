//creez serverul
const express = require("express");
const server = express();

const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const facilityRoutes = require("./routes/facilityRoutes");


server.use(express.json());

server.use("/user", userRoutes);
server.use("/trainer", trainerRoutes);
server.use("/session", sessionRoutes);
server.use("/facility", facilityRoutes);

const PORT = process.env.PORT || 3000;

server.get("/", (req, res) => {
    res.send("Bine ai venit in aplicatie!");
  });

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });

module.exports = { server };