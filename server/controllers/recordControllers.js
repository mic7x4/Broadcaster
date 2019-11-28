import Records from '../model/Records';

class RecordControllers {
  // Create a new RedFlag
  static createRecord(req, res) {
    const {
      title, type, comment, location, status, images, videos,
    } = req.body;
    const newRecord = {
      id: Records.length + 1,
      title,
      type,
      comment,
      location,
      status,
      images,
      videos,
    };
    Records.push(newRecord);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Created red-flag successfully',
      data: newRecord,
    });
  }
}

export default RecordControllers;
