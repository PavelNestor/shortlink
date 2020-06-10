const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRout = require('./routes/auth.routes');
const linkRout = require('./routes/link.routes');

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri') || '';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRout);
app.use('/api/link', linkRout);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`App starting in port: ${PORT}`));
  } catch (error) {
    console.log('SERVER ERROR', error.message);
    process.exit(1);
  }
};

start();
