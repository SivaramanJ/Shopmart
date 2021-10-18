require("dotenv").config();
const express = require("express");
const mangoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const router = require("./routes/userRouter");
const path = require('path');


const init = () => {
  console.log('init ');
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
  console.log(URI);
  mangoose.connect(URI, (err) => {
    if (err) throw err;
    console.log("Connected to DB");
  });

  //routes

  app.use("/user", require("./routes/userRouter"));
  app.use("/api", require("./routes/categoryRouter"));
  app.use("/api", require("./routes/upload"));
  app.use("/api", require("./routes/productRouter"));

  //Serve static assets if we are in production

  if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }

  const PORT = process.env.PORT || 5000;
  if (!module.parent) {
    app.listen(PORT, () => {
      console.log("Server listening to  port: " + PORT);
    });
  }
  return app;
};

init();

module.exports = {
  init: init,
};
