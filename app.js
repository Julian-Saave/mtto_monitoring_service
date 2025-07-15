const express = require('express');
const cors = require('cors');

const app = express();

const registerRoutes = require('./src/routes/register.routes.js');
const groupRoutes = require('./src/routes/group.routes.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de CORS
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization','content-disposition'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
};

app.use(cors(corsOptions));

app.use('/api/register', registerRoutes);
app.use('/api/group', groupRoutes);

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aplicación escuchando en el puerto ${PORT}`);
});
// [END gae_storage_app]

module.exports = app;