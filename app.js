const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const authRout = require('./routes/auth.routes');
const linkRout = require('./routes/link.routes');
const redirectRout = require('./routes/redirect.routes');

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri') || '';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRout);
app.use('/api/link', linkRout);
app.use('/t', redirectRout);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
