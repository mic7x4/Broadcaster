import express from 'express';
import validation from '../validation/recordValidation';
import recordController from '../controllers/recordControllers';

const recordRoute = express.Router();
// Create a Redflag
recordRoute.post('/redflags', validation.createRecord, recordController.createRecord);
// Getting all records
recordRoute.get('/redflags', recordController.getAllRecord);
// Get a single Record by id
recordRoute.get('/redflags/:id', validation.recordId, recordController.getSingleRecord);

export default recordRoute;
