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
    const titleIndex = Records.findIndex(
      (recordTitle) => recordTitle.title === title,
    );
    const typeIndex = Records.findIndex((typeindex) => typeindex.type === type);
    const commentIndex = Records.findIndex(
      (recordComment) => recordComment.comment === comment,
    );
    const locationIndex = Records.findIndex((loc) => loc.location === location);
    if (titleIndex >= 0 && typeIndex >= 0 && commentIndex >= 0 && locationIndex >= 0) { return res.json({ message: 'record exists' }); }
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

  // Edit the comment of a specific red-flag record.
  static editComment(req, res) {
    const commentIndex = Records.findIndex(
      (comment) => comment.id === parseInt(req.params.id, 10),
    );
    if (Records[commentIndex].status === 'draft') {
      if (commentIndex >= 0) {
        Records[commentIndex].comment = req.body.comment;
        return res.status(200).json({
          status: res.statusCode,
          message: 'Updated red-flag record’s comment',
          data: Records[commentIndex],
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error: 'Comment with given ID  not found',
      });
    }
    return res.status(400).json({
      status: res.statusCode,
      message: "You can't edit the record it is into investigation",
    });
  }

  // Delete a specific red flag record.
  static deleteRecord(req, res) {
    const findRecord = Records.find(
      (record) => record.id === parseInt(req.params.id, 10),
    );
    if (findRecord.status === 'draft') {
      if (!findRecord) {
        return res
          .status(404)
          .json({ message: 'The record of the given id not found' });
      }
      const index = Records.indexOf(findRecord);
      Records.splice(index, 1);
      return res.status(200).json({
        status: res.statusCode,
        message: 'red-flag record has been deleted',
        data: findRecord,
      });
    }
    return res.status(400).json({
      status: res.statusCode,
      message: "You can't delete this Record",
    });
  }
}

export default RecordControllers;
