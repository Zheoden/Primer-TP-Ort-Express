import { Router } from 'express';
import { PizzaService } from '../services/pizzaService.js';
import sql from 'mssql'

const router = Router();
const pizzaService = new PizzaService();
var config = {
  user: 'root',
  password: 'root',
  server: 'localhost',
  database: 'Ort',
  options: {
    trustServerCertificate: true,
    trustedConnection: true
  }
};

router.get('', async (req, res) => {
  console.log(`This is a get operation`);

  try {
    await sql.connect(config);
    const res = await sql.Request().query('SELECT * from [dbo].[users]');
    console.log(res)
  }
  catch(e){
    console.log(e);
  }
  
  const pizzas = pizzaService.getPizza();

  return res.status(200).json(pizzas);
});

router.get('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const pizza = pizzaService.getPizzaById(req.params.id);

  return res.status(200).json(pizza);
});

router.post('', async (req, res) => {
  console.log(`This is a post operation`);

  const pizza = pizzaService.createPizza(req.body);

  return res.status(201).json(pizza);
});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const pizza = pizzaService.updatePizzaById(req.body);

  return res.status(200).json(pizza);
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const pizza = pizzaService.deletePizzaById(req.params.id);

  return res.status(200).json(pizza);
});

export default router;
