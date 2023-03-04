const authorization = (text) => {
  return (req, res, next) => {
    //if the permissions array which is saved in the req.token.role includes the entered permission
    if (!req.token.role.permissions.includes(text)) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized`,
      });
    }
    next();
  };
};

module.exports = authorization;
