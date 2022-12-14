const express = require('express');
const cors = require('cors');
const server = express();


server.use(express.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3001' }));

// Public folder 
server.use(express.static('public'));

// Routes

const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');
server.use('/users', UserRoutes);
server.use('/pets', PetRoutes);


server.listen('5001', () => {
  console.log(`
    ==============================================
    🚀 API IS RUNNING IN http://localhost:5001/ 🚀
    ==============================================
  `);
}) 