const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

//routers
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");

app.use(cors());
app.use(express.json());

//use routers (middleware)
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
