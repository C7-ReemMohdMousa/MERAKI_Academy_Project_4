const enrollmentModel = require("../models/enrollmentSchema");

//enroll to the course

//middleware to check if the user is enrolled
const enrollOnce = (req, res, next) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  enrollmentModel
    .find({ course: courseId, user: userId })
    .then((results) => {
      if (results.length === 0) {
        next();
      } else {
        res.json("you're already enrolled");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

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
//1- completed courses
const completedCourses = (req, res) => {
  const userId = req.params.userId;

  enrollmentModel
    .find({ status: "completed", user: userId })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//2- in progress courses
const inProgressCourses = (req, res) => {
  const userId = req.params.userId;

  enrollmentModel
    .find({ status: "in progress", user: userId })
    .populate("course") //! keep it to decide what to show in frontend
    .select("course -_id")
    .exec()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  courseEnrollment,
  enrollOnce,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
};
