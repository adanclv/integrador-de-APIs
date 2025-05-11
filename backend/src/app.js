const express = require('express');
const newsRoutes = require('./routes/todo');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', newsRoutes);

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send(`<h1>API RESTful en NodeJS para Servicios Embebidos</h1>`)
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
