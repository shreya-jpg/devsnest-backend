const express = require("express");
const app = express();

// we can use multiple functions, "next" is used to move to
// next function

const checkAdmin = (req, res, next) => {
  if (req.query.admin == "true") {
    next();
  } else {
    res.status(400).send("must be admin");
  }
};

const sendData = (req, res) => {
  res.json(req.query);
  console.log("is admin");
};

app.get("/secure", checkAdmin, sendData);

// ------------------------------------- //

// app.use checks the function in all apis then proceed further
// here checkadmin will be executed in the '/user'
// even it isn't specified there

app.use(checkAdmin);
app.get("/user", sendData);

// ------------------------------------- //

app.use(express.json({ extended: true })); // here express.json() is middleware

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body); // without express.json we can't see the data of POST
});

app.listen(5000);