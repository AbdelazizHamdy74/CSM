const express = require("express");
const cookieParser = require('cookie-parser');
const {authenticate}=require('./utlis/middleware/authenticate')
const {authorize}=require('./utlis/middleware/authorization')
const app = express();
app.use(cookieParser())
app.use(express.json());
// Import Routes
const assetRoutes = require("./src/asset/assetRoute");
const authRoutes=require("./src/authentication/authRouter")
const usersRoutes=require("./src/users/userRouter")
// Use Routes
app.use("/auth",authRoutes)
app.use("/users",usersRoutes)
app.use("/api/assets",authenticate,authorize(['Admin','Support']) ,assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
