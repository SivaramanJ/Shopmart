require("dotenv").config();
const express = require("express");
const mangoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const router = require("./routes/userRouter");


const init = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );

  //connect to mangodb

  const URI = process.env.MONGODB_URL;
  mangoose.connect(URI, (err) => {
    if (err) throw err;
    console.log("Connected to DB");
  });

  //routes

  app.use("/user", require("./routes/userRouter"));
  app.use("/api", require("./routes/categoryRouter"));
  app.use("/api", require("./routes/upload"));
  app.use("/api", require("./routes/productRouter"));

  const PORT = process.env.PORT || 5000;
  if (!module.parent) {
    app.listen(PORT, () => {
      console.log("Server listening to port: " + PORT);
    });
  }
  return app;
};

init();

module.exports = {
  init: init,
};
