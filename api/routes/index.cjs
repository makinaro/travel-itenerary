const express = require('express');
const userRoutes = require('./userRoutes.cjs');
// Import other routes here
// const anotherRoutes = require('./anotherRoutes.cjs');

const router = express.Router();

router.use('/users', userRoutes);
// Use other routes here
// router.use('/another', anotherRoutes);

module.exports = router;