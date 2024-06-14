const express = require('express');
const mongoose = require('mongoose');
const Item = require('./Item');  // Import the Item model
const Building = require("./Building");
const app = express();
const port = 4000;
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(cors()); 
app.use(express.json());


// MongoDB Atlas connection
const uri = 'mongodb+srv://kasinath:app1221@cluster0.fdlji3b.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
  });

// POST endpoint to create a new item
app.post('/items', async (req, res) => {
    const { name, building, plan, phoneNumber, joiningDate, paidMonths } = req.body;
  
    console.log('Request body:', req.body);  // Log the incoming request body
  
    try {
      const newItem = new Item({
        name,
        building,
        plan,
        phoneNumber,
        joiningDate,
        paidMonths
      });
  
      const savedItem = await newItem.save();
      console.log('Saved item:', savedItem);  // Log the saved item
  
      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(400).json({ message: 'Error creating item', error });
    }
  });


  app.post('/items/:id/pay', async (req, res) => {
    const { id } = req.params;
    const { month } = req.body;
  
    try {
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).send('Item not found');
      }
  
      if (!item.paidMonths.includes(month)) {
        item.paidMonths.push(month);
        await item.save();
      }
  
      res.status(200).send(item);
    } catch (error) {
      res.status(500).send('Error marking as paid');
    }
  });
  

app.post('/buildings', async (req, res) => {
    const newItem = new Building(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET endpoint to retrieve all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/buildings', async (req, res) => {
    try {
        const items = await Building.find();
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET endpoint to retrieve a single item by id
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.send(item);
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT endpoint to update an item by id
app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedItem) {
            res.send(updatedItem);
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE endpoint to delete an item by id
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (deletedItem) {
            res.send(deletedItem);
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
