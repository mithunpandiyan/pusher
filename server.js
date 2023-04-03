const express = require("express");
const cors = require("cors");

const app = express();
const Pusher = require("pusher");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const pusher = new Pusher({
  appId: "1576821",
  key: "537c56aa056e3f7d3f5c",
  secret: "099b216652927a021b24",
  cluster: "ap2",
  useTLS: true
});


const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
  pusher.trigger("my-channel", "my-event", {
    message: "Am sending pusher notification"
  });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
