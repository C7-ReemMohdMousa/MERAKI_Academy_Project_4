const coursesModel = require("../models/coursesSchema");
const lecturesModel = require("../models/lecturesSchema");
const categoryModel = require("../models/categorySchema");

//get all courses
const getAllCourses = (req, res) => {
  coursesModel
    .find({})
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

//upload course
const uploadCourse = (req, res) => {
  const { title, description, instructor, category, level } = req.body;

  const newCourse = new coursesModel({
    title,
    description,
    instructor,
    category,
    level,
  });

  newCourse
    .save()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

//upload lecture and save it to the lectures array
const uploadLectures = (req, res) => {
  const { course, title, description, videoURL } = req.body;

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
      res.json("uploaded");
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
};

//update course informations
const updateCourseById = (req, res) => {
  const id = req.params.courseId;

  const { title, description, instructor, category, level } = req.body;

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

  const { course, title, description, videoURL } = req.body;

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
};
