import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import PizzaRouter from "./src/controllers/pizzaController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/pizza", PizzaRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
