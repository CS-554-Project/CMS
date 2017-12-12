const adminRoutes = require('./admin');
const userRoutes = require('./user');
const loginRoutes = require('./login');

module.exports = (app, passport) => {

  app.use('/admin', adminRoutes);
  app.use('/user', userRoutes);
  app.use('/login', loginRoutes);
  
  // app.use("*", (req, res) => {
  //   res.status(404).json({ error: "Path not found" });
  // });

};
