const express = require("express");
const app = express();
const cors = require("cors");
const main = require("./db");

const port = 4000;

main().catch((err) => console.log(err));

/* router.use((req, res) => {
  console.log("hello router");
  const user_1 = new User({
    name: "Viraj Chavan",
    password: "12345",
    email: "virajchavan308@gmail.com",
    location: "nashik",
  });
  user_1.save();
}); */
/* app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

app.use(cors());

app.use(express.json());

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
