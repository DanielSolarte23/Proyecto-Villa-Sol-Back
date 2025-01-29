const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const apartamentoRoutes = require('./routes/apartamentoRoutes');
const visitanteRoutes = require('./routes/visitanteRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const propietarioRoutes = require('./routes/propietarioRoutes');
const informeRoutes = require('./routes/informeRoutes')
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3004;
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', apartamentoRoutes);
app.use('/api', visitanteRoutes);
app.use('/api', pagoRoutes);
app.use('/api', informeRoutes);
app.use('/api', propietarioRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync();
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }


}

startServer();