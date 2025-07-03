const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Contact = require('./models/Contact'); // make sure this exists and is correct
const Order = require('./models/Order'); // Add at top with Contact import

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Local Connection (Community Edition)
const mongoURI = 'mongodb://127.0.0.1:27017/CafeDB'; // this will create CafeDB if it doesn't exist

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Community Edition (local)'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.post('/contact', async (req, res) => {
  console.log('📩 Incoming POST to /contact');
  console.log('📦 Data received:', req.body);

  const { category, name, email, message } = req.body;

  if (!category || !name || !email || !message) {
    console.log('⚠️ Missing field(s)');
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ category, name, email, message });
    await newContact.save();
    console.log('✅ Contact saved');
    res.status(201).json({ message: 'Message received. We’ll get back to you shortly!' });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/order', async (req, res) => {
  console.log("📥 Received order:", req.body);

  const { items, total } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log("❌ Invalid order format");
    return res.status(400).json({ message: 'Cart is empty or invalid.' });
  }

  try {
    console.log("💾 Saving order to database...");
    const newOrder = new Order({ items, total });
    const savedOrder = await newOrder.save();

    // Prepare clean response
    const response = {
      message: 'Order placed successfully!',
      order: {
        items: savedOrder.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: savedOrder.total
      }
    };

    console.log('✅ Order saved');
    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
