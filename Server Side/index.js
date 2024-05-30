const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware ==============
const options = {
  origin: [
    'http://localhost:5173',
    'https://office-lunch-menu.web.app',
    'https://office-lunch-menu.firebaseapp.com',
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(options));
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.htex290.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const employeeCollection = client
      .db('office_lunchDB')
      .collection('employee');
    const menuCollection = client.db('office_lunchDB').collection('today_menu');
    const orderCollection = client
      .db('office_lunchDB')
      .collection('employee_order');

    // login role
    app.post('/employee', async (req, res) => {
      const user = req.body;
      // console.log(user);
      // return;
      const query = { employeeEmail: user.employeeEmail };
      const existEmloyee = await employeeCollection.findOne(query);
      if (existEmloyee) {
        return res.send({ message: 'User Allready Exists', insertedId: null });
      }
      const result = await employeeCollection.insertOne(user);
      res.send(result);
    });
    app.get('/employees', async (req, res) => {
      const result = await employeeCollection.find().toArray();
      res.send(result);
    });
    app.get('/user/admin/:email', async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const query = { employeeEmail: email, power: 'admin' };
      const result = await employeeCollection.findOne(query);
      let admin = false;
      if (result?.power === 'admin') {
        admin = true;
      }
      // console.log(admin);

      res.send({ admin });
    });
    app.patch('/change-power', async (req, res) => {
      const powerEmp = req.query.power;
      const id = req.query.id;
      // console.log('empolye:', powerEmp, '===id:', id);
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          power: powerEmp,
        },
      };
      const result = employeeCollection.updateOne(query, update);
      res.send(result);
    });

    // menu part
    app.post('/add-item', async (req, res) => {
      const newItem = req.body;
      // console.log(newItem);
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });

    app.put('/update-item', async (req, res) => {
      const updateItem = req.body;
      const filter = { _id: req.query.id };
      // console.log({ ...updateItem });
      // return
      const updateDoc = {
        $set: { ...updateItem },
      };
      const result = await menuCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete('/item-delete/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    app.get('/today-menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.get('/totalItem', async (req, res) => {
      const result = await menuCollection.find().toArray();
      const totalItem = result.length;
      res.send({ totalItem });
    });

    app.post('/order', async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await orderCollection.insertOne(data);
      res.send(result);
    });

    app.get('/orders-length', async (req, res) => {
      const result = await orderCollection.find().toArray();
      const totalOrder = result.length;
      res.send({ totalOrder });
    });
    app.get('/orders', async (req, res) => {
      const result = await orderCollection.find().toArray();
      res.send(result);
    });
    app.get('/orderDta/:id', async (req, res) => {
      const id = req.params.id;
      const query = { userEmail: id };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    app.patch('/order-update', async (req, res) => {
      const id = req.query.id;
      const statusDta = req.query.status;
      // console.log('id:', id, '  status: ', statusDta);
      const query = { _id: new ObjectId(id) };
      const docUpdate = {
        $set: {
          status: statusDta,
        },
      };
      const result = orderCollection.updateOne(query, docUpdate);
      res.send(result);
    });

    app.delete('/my-order-delete/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // await client.db('admin').command({ ping: 1 });
    // console.log(
    //   'Pinged your deployment. You successfully connected to MongoDB!'
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
