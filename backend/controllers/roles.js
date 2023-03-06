const rolesModel = require("../models/rolesSchema");

const getRoles = (req, res) => {
  rolesModel
    .find({ role: ["teacher", "student"] })
    .select("role -_id")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
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
    ];
  }

  if (roletype == "student") {
    role = roletype;
    permissions = [
      "enroll_course",
      "cancel_enrollment",
      "update_enrollment ",
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

module.exports = { createRole, getRoles };
