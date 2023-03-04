const rolesModel = require("../models/rolesSchema");

const createRole = (req, res) => {
  //destructure the body
  const { role, permissions } = req.body;

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

module.exports = { createRole };
