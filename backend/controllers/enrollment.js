const enrollmentModel = require("../models/enrollmentSchema");

const usersModel = require("../models/usersSchema");

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
    .then(async (results) => {
      //save the enrolled course to the enrolledCourses array in the user schema
      await usersModel.updateOne(
        {
          _id: req.token.userId,
        },
        { $push: { enrolledCourses: results.course } }
      );
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
    .then(async (results) => {
      //delete the course enrollment in the enrolledCourses array
      await usersModel.updateMany({
        $pull: { enrolledCourses: { $in: [courseId] } },
      });
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

const checkIfUserEnrolled = (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.params.userId;

  enrollmentModel
    .find({ course: courseId, user: userId })
    .then((results) => {
      if (results.length !== 0) {
        res.status(201).json({
          success: true,
          message: "yes, the user is enrolled",
          author: results,
        });
      } else {
        res.status(201).json({
          success: false,
          message: "no, the user did not enroll the course",
          author: results,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  courseEnrollment,
  enrollOnce,
  cancelEnrollment,
  updateEnrollment,
  completedCourses,
  inProgressCourses,
  checkIfUserEnrolled,
};
