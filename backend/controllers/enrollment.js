const enrollmentModel = require("../models/enrollmentSchema");

//enroll to the course

const courseEnrollment = (req, res) => {
  const { course, user } = req.body;

  const newEnrollment = new enrollmentModel({
    course,
    user,
  });

  newEnrollment
    .save()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const cancelEnrollment = (req, res) => {
  const courseId = req.params.courseId;

  enrollmentModel
    .deleteOne({ course: courseId })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateEnrollment = (req, res) => {
  const courseId = req.params.courseId;

  const { status, completedAt, progress } = req.body;

  enrollmentModel
    .updateOne(
      { course: courseId },
      { status, completedAt, progress },
      { new: true }
    )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};


//*get courses by status
//1- completed course 





module.exports = { courseEnrollment, cancelEnrollment, updateEnrollment };
