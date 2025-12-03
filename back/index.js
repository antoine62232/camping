import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js'
import usersRoutes from './routes/usersRoutes.js';
import noticesRoutes from './routes/noticesRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "Bienvenue dans l'API camping !"});
});



app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancée sur http://localhost:${process.env.SERVER_PORT}`);
    
});
app.use('/api/employees', employeeRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/accommodations', accommodationRoutes);

