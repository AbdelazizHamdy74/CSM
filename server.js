const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const {authenticate}=require('./utlis/middleware/authenticate')
const {authorize}=require('./utlis/middleware/authorization')

const app = express();
app.use(cors({
  origin:'http://localhost:4200',
  credentials: true,
}));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Import Routes
const assetRoutes = require("./src/asset/assetRoute");
const authRoutes=require("./src/authentication/authRouter")
const usersRoutes=require("./src/users/userRouter")
const noteRoutes=require("./src/notes/route")
// Use Routes
app.use("/auth",authRoutes)
app.use("/users",usersRoutes)
app.use("/api/assets" ,authenticate,authorize(['Admin','Support']), assetRoutes);
app.use("/api/notes",authenticate,authorize(['Admin','Support']) , noteRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
