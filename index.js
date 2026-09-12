const express = require('express');
const cors = require('cors');
const { PORT, ADMIN_EMAIL, ADMIN_PASSWORD } = require('./config/env');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// --- MIDDLEWARES ---
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// --- HEALTH CHECK ROUTE ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Gouseva Maatra Seva Backend API',
    timestamp: new Date().toISOString()
  });
});

const v1Routes = require('./routes/v1');

// --- API ROUTES MOUNTING ---
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminRoutes);

// --- MOBILE APP API V1 ROUTES ---
app.use('/api/v1', v1Routes);

// --- START SERVER & DB ---
app.listen(PORT, async () => {
  console.log(`=================================================`);
  console.log(`🚀 Gouseva Maatra Seva Backend running on port ${PORT}`);
  console.log(`🔑 Admin Login Email   : ${ADMIN_EMAIL}`);
  console.log(`🔒 Admin Login Password: ${ADMIN_PASSWORD}`);
  console.log(`=================================================`);
  await connectDB();
});

module.exports = app;
