const express = require("express");
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler } = require('./middlewares/error.handler');


const app = express();
const PORT = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));




app.get('/', (req, res) => {
  res.send('Hello ');
});


app.get('/route-new', (req, res) => {
  res.send('Hola soy una nueva ruta o endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);


app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'iPhone X3',
    price: 32000,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    category: 'Computers & Accesories'
  });
});

app.get('/people', (req, res) => {
  res.json([{
    name: 'Arturo',
    type: 'employee'
  }, {
    name: 'Jimena',
    type: 'customer'
  }]);
});

app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Arturo',
    type: 'employee'
  });
});

app.listen(PORT, () => {
  console.log('Mi puerto es: ' + PORT);
})
