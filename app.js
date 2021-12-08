const express = require("express");
const createError = require("http-errors");

const { verifyToken } = require("./verifyToken");
require("dotenv").config();
require("./config/db.users").connectedDb();
require("./config/db.redis").connect();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const authRouter = require("./router/routerAuthUser");
const dashboard = require("./router/routerDashboard");

app.use("/auth-user", authRouter);
app.use("/", verifyToken, dashboard);

app.use(async (req, res, next) => {
    next(createError.NotFound());
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});


app.listen(PORT, () => console.log(`Server Running Port ${PORT}`));