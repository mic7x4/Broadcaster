import express from 'express';
import UserRoute from './server/routes/userRoutes';
import RecordRoute from './server/routes/recordRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users routes
app.use('/api/v1', UserRoute);
app.use('/api/v1', RecordRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Runninfg on port ${PORT}`));

export default app;
