const authRoute = require("#routes/auth");
const usersRoute = require("#routes/users");
const moviesRoute = require("#routes/movies");
const listsRoute = require("#routes/lists");
const router = require("express").Router();

module.exports = (app) => {
    router.use("/auth", authRoute);
    router.use("/users", usersRoute);
    router.use("/movies", moviesRoute);
    router.use("/lists", listsRoute);

    app.use("/api", router);
};
