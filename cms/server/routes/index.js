const adminRoutes = require("./admin");

const constructorMethod = (app) => {
    app.use("/admin", adminRoutes);  
    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;