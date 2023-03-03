//require mongoose
const mongoose = require("mongoose");

//strictQuery
mongoose.set("strictQuery", false);

//connect the db to the server
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });


