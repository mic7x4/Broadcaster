import express from 'express';
import validation from '../validation/recordValidation';
import recordController from '../controllers/recordControllers';

const recordRoute = express.Router();
// Create a Redflag
recordRoute.post('/redflags', validation.createRecord, recordController.createRecord);
// Getting all records
recordRoute.get('/redflags', recordController.getAllRecord);

export default recordRoute;
