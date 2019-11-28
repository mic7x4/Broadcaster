import express from 'express';
import validation from '../validation/recordValidation';
import recordController from '../controllers/recordControllers';
import tokenValidator from '../middleware/auth';

const recordRoute = express.Router();
// Create a Redflag
recordRoute.post('/redflags', validation.createRecord, recordController.createRecord);
// Getting all records
recordRoute.get('/redflags', recordController.getAllRecord);
// Get a single Record by id
recordRoute.get('/redflags/:id', validation.recordId, recordController.getSingleRecord);
// Edit the location of a specific red-flag record.
recordRoute.patch('/redflags/:id/location', tokenValidator, validation.recordId, recordController.editLocation);
// Edit the comment of a specific red-flag record.
recordRoute.patch('/redflags/:id/comment', tokenValidator, validation.recordId, recordController.editComment);

export default recordRoute;
