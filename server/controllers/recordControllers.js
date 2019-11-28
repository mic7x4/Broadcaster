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

  //   Get all RedFlags
  static getAllRecord(req, res) {
    return res.status(200).json({
      data: Records,
    });
  }

  //   Get single Redflag by id
  static getSingleRecord(req, res) {
    const findRecord = Records.find(
      // eslint-disable-next-line radix
      (record) => record.id === parseInt(req.params.id),
    );
    if (!findRecord) {
      return res
        .status(404)
        .json({ message: 'Record with that ID is not found' });
    }

    return res.status(200).json({ status: res.statusCode, findRecord });
  }
}

export default RecordControllers;
