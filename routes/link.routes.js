const { Router } = require('express');
const shortid = require('shortid');

const Link = require('../models/Link');
const auth = require('../midleware/auth.midleware');
const config = require('config');

const BASE_URL = config.get('baseUrl');
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await Link.findOne({ from })
      .where('owner')
      .equals(req.user.userId);

    if (existing) {
      return res.json({ link: existing, message: 'Success' });
    }

    const to = BASE_URL + '/t/' + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link, message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong :(' });
  }
  res.status(201).json({ ok: 'OK' });
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong :(' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong :(' });
  }
});

module.exports = router;
