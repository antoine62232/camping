import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js'
import usersRoutes from './routes/usersRoutes.js';
import noticesRoutes from './routes/noticesRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import reservationsRoutes from './routes/reservationsRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import couponsRoutes from './routes/couponsRoute.js'
import paymentsRoutes from './routes/paymentsRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import optionsRoutes from './routes/optionsRoutes.js';
import employeesSchedulesRoutes from './routes/employeesSchedulesRoutes.js';
import reservationsOptionsRoutes from "./routes/reservationsOptionsRoutes.js";
import kpiRoutes from "./routes/kpiRoute.js";
import financialReportsRoutes from "./routes/financialReportsRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/reservations', reservationsRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/employeesSchedules', employeesSchedulesRoutes);
app.use("/api/reservations-options", reservationsOptionsRoutes);
app.use("/api/kpi", kpiRoutes);
app.use("/api/reports", financialReportsRoutes);




