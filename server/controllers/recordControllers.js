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
      (record) => record.id === parseInt(req.params.id, 10),
   );
    if (!findRecord) {
      return res
        .status(404)
        .json({ message: 'Record with that ID is not found' });
    }

    return res.status(200).json({ status: res.statusCode, findRecord });
  }


  //   Edit Location
  static editLocation(req, res) {
    const locationIndex = Records.findIndex(
      (location) => location.id === parseInt(req.params.id, 0),
    );
    if (Records[locationIndex].status === 'draft') {
      if (locationIndex >= 0) {
        Records[locationIndex].location = req.body.location;
        return res.status(200).json({
          status: res.statusCode,
          message: 'Updated red-flag record’s location',
          data: Records[locationIndex],
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error: 'Location with given ID not found',
      });
    }
    return res.status(400).json({
      status: res.statusCode,
      message: "You can't edit this property",
    });
  }

}

export default RecordControllers;
