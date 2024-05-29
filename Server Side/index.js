const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware ==============
app.use(cors());
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
    await client.connect();

    const menuCollection = client.db('office_lunchDB').collection('today_menu');
    const orderCollection = client
      .db('office_lunchDB')
      .collection('employee_order');
    const employeesCollection = client
      .db('office_lunchDB')
      .collection('total_employees');

    app.get('/today-menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.post('/order', async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await orderCollection.insertOne(data);
      res.send(result);
    });

    app.get('/orderDta/:id', async (req, res) => {
      const id = req.params.id;
      const query = { userEmail: id };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/my-order-delete/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
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
