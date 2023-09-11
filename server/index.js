const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const codeBlockRoute = require("./Routes/codeBlockRoute");
const socketDef = require("./socket/socketDef");
const {Server} = require("socket.io");


const app = express();
const server = require("http").createServer(app);

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/codeBlocks", codeBlockRoute);

app.get("/", (req, res) => {
    res.send("Welcome our online coding web app");
});

const port = process.env.PORT || 7000;
const uri = process.env.ATLAS_URI;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
} );


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established"))
.catch((error) => console.log("MongoDB connection failed: " , error.message));


const io = new Server ({cors: "https://online-coding-web-app-iota.vercel.app/"});

socketDef(io);



  