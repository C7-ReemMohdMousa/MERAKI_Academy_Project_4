const rolesModel = require("../models/rolesSchema");
const userModel = require("../models/usersSchema");

const getRoles = (req, res) => {
  const roletype = req.params.role;
  rolesModel
    .find({ role: roletype })
    .select("_id")
    .then((results) => {
      res.status(200).json({
        success: true,
        role: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const createRole = (req, res) => {
  const roletype = req.params.role;
  let permissions;
  let role;

  if (roletype == "admin") {
    role = roletype;
    permissions = [
      "create_category",
      "upload_course",
      "update_course",
      "delete_course",
      "upload_lecture",
      "delete_lecture",
      "update_lecture",
      "enroll_course",
      "cancel_enrollment",
      "update_enrollment",
      "get_completed_course",
      "get_in progress_courses",
    ];
  }

  if (roletype == "student") {
    role = roletype;
    permissions = [
      "enroll_course",
      "cancel_enrollment",
      "update_enrollment",
      "get_completed_course",
      "get_in progress_courses",
    ];
  }

  if (roletype == "teacher") {
    role = roletype;
    permissions = [
      "upload_course",
      "update_course",
      "delete_course",
      "upload_lecture",
      "delete_lecture",
      "update_lecture",
      "enroll_course",
      "cancel_enrollment",
      "update_enrollment",
      "get_completed_course",
      "get_in progress_courses",
    ];
  }

  //model instance
  const newRole = new rolesModel({
    role,
    permissions,
  });

  //save the instance
  newRole
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateStudentToTeacher = (req, res) => {
  const userId = req.params.userId;

  const teacher = "640cf5ae6308a0c0b07e5792";

  userModel
    .findByIdAndUpdate({ _id: userId }, { role: teacher }, { new: true })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { createRole, getRoles, updateStudentToTeacher };
