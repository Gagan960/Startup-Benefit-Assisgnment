import express from "express";
import connectDB from "./config/dbconfig.js";
import apiRouter from "./routes/apiRouter.js";
import { rateLimit } from "express-rate-limit";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const limiter = rateLimit({
    windowMs: 60 * 1000, // 60 seconds
    limit: 120, // limit each IP to 120 requests per windowMs
    message: "Too many requests from this IP, please try again after 30 seconds"
})

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
    return res.json({ name: "Express Server", version: "1.0.0" });
});

app.post("/data", (req, res) => {
    return res.json({ message: "Data received successfully" });
});

app.get("/ping", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    console.log(req.user);
    return res.json({ message: "Pong!" });
});


app.use("/api", apiRouter);


app.delete("/data/:id", (req, res) => {
    return res.json({ message: `Data deleted successfully` });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
  connectDB();
});

// zjJXuiO85mnZGmBQ