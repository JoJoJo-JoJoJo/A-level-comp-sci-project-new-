import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:8080"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "This is the register/login page."
  });
});

app.get("/home", (req, res) => {
  res.json({
    msg: "This is the home page."
  })
});

app.get("/register", (req, res) => {
  res.json({
    msg: "This is the register form page."
  })
});

app.get("/login", (req, res) => {
  res.json({
    msg: "This is the login form page."
  })
});

app.get("/password", (req, res) => {
  res.json({
    msg: "This is the password form page."
  })
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
