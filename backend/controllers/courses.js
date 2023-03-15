const coursesModel = require("../models/coursesSchema");
const lecturesModel = require("../models/lecturesSchema");
const categoryModel = require("../models/categorySchema");
const usersModel = require("../models/usersSchema");
const enrollmentSchema = require("../models/enrollmentSchema");

//get all courses
const getAllCourses = (req, res) => {
  coursesModel
    .find({})
    .populate("lectures")
    .populate("category")
    .exec()
    .then((results) => {
      if (results.length) {
        res.status(200).json({
          success: true,
          message: `All courses`,
          courses: results,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Courses Yet`,
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

const getCourseById = (req, res) => {
  const courseId = req.params.courseId;

  coursesModel
    .findOne({ _id: courseId })
    .populate("lectures")
    .populate("category")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//create category
const createCategory = (req, res) => {
  const { category } = req.body;

  const newCategory = new categoryModel({
    category,
  });

  newCategory
    .save()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//get category
const getCategoryId = (req, res) => {
  const category = req.params.categoryName;

  categoryModel
    .findOne({ category })
    .then((results) => {
      res.status(200).json({
        success: true,
        categoryId: results._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//upload course
const uploadCourse = (req, res) => {
  const { title, description, category, level } = req.body;

  const instructor = req.token.userId;
  const newCourse = new coursesModel({
    title,
    description,
    instructor,
    category,
    level,
  });

  newCourse
    .save()
    .then(async (results) => {
      //save the created course to the createdCourses array in the user schema
      await usersModel.updateOne(
        {
          _id: req.token.userId,
        },
        { $push: { createdCourses: results } }
      );

      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//upload lecture and save it to the lectures array
const uploadLectures = (req, res) => {
  const { title, description, videoId } = req.body;

  const courseId = req.params.courseId;
  const course = courseId;
  const videoURL = videoId;

  const newLecture = new lecturesModel({
    course,
    title,
    description,
    videoURL,
  });

  newLecture
    .save()
    .then(async (results) => {
      //add this lecture to the lectures array in the course schema
      await coursesModel.updateOne(
        {
          _id: course,
        },
        { $push: { lectures: results } }
      );
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//delete course by id
const deleteCourseById = (req, res) => {
  const id = req.params.courseId;
  coursesModel
    .findByIdAndDelete({ _id: id })
    .then((results) => {
      res.json("deleted");
    })
    .catch((err) => {
      throw err;
    });

  lecturesModel
    .deleteMany({ course: id })
    .then((results) => {})
    .catch((err) => {});

  usersModel
    .updateMany({ $pull: { enrolldCourses: { $in: [id] } } })
    .then((results) => {})
    .catch((err) => {});
};

//update course informations
const updateCourseById = (req, res) => {
  const id = req.params.courseId;

  const { title, description, category, level } = req.body;
  const instructor = req.token.userId;

  coursesModel
    .findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        instructor,
        category,
        level,
      },
      { new: true }
    )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//update lecture informations
const updateLecture = (req, res) => {
  const courseId = req.params.courseId;
  const lectureId = req.params.lectureId;

  const { title, description, videoURL } = req.body;
  const course = courseId;

  lecturesModel
    .findByIdAndUpdate(
      { _id: lectureId },
      {
        course,
        title,
        description,
        videoURL,
      },
      { new: true }
    )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      throw err;
    });
};

//delete lecture
const deleteLecture = (req, res) => {
  const courseId = req.params.courseId;
  const lectureId = req.params.lectureId;

  lecturesModel
    .findByIdAndDelete({ _id: lectureId })
    .then((results) => {
      res.json("deleted");
    })
    .catch((err) => {
      throw err;
    });

  coursesModel
    .updateMany({ $pull: { lectures: { $in: [lectureId] } } })
    .then((results) => {})
    .catch((err) => {});
};

//show courses by category
const getCoursesByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  coursesModel
    .find({ category: categoryId })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//show courses by level
const getCoursesByLevel = (req, res) => {
  const level = req.query.level;
  // const category = req.query.category

  coursesModel
    .find({ level })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAllCategories = (req, res) => {
  categoryModel
    .find({})
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const searchByCourseName = (req, res) => {
  const searchText = req.params.search;

  coursesModel
    .find({ title: { $regex: searchText, $options: "i" } })
    .populate("category")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getCoursesByInstructor = (req, res) => {
  const userId = req.params.userId;

  coursesModel
    .find({ instructor: userId })
    .populate("lectures")
    .populate("category")
    .exec()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const checkIfTheUserIsTheInstructor = (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  coursesModel
    .find({ _id: courseId, instructor: userId })
    .then((results) => {
      if (results.length === 0) {
        res.json(false);
      } else {
        res.json(true);
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
  getAllCourses,
  createCategory,
  uploadCourse,
  uploadLectures,
  deleteCourseById,
  updateCourseById,
  updateLecture,
  deleteLecture,
  getCoursesByCategory,
  getCourseById,
  getCoursesByInstructor,
  getCategoryId,
  checkIfTheUserIsTheInstructor,
  getAllCategories,
  getCoursesByLevel,
  searchByCourseName,
};
