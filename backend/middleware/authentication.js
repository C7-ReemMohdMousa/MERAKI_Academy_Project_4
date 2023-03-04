const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  //check if the token is exsisted (it is saved in the request's headers)
  //if not; return forbidden

  try {
    if (!req.headers.authorization) {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    //else; verify the token

    //1-get the token from the request headers
    const token = req.headers.authorization.split(" ").pop();

    //verify the token by using jwb.verfiy
    jwt.verify(token, process.env.SECRET, function (err, result) {
      if (err) {
        //if it is not valid, return an err msg
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      }
      // if it is valid, save it in the request, so it can be used in the next function
      if (result) {
        console.log("RESULTS: ", result);
        req.token = result;
        console.log("REQUEST: ", req.token);
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

module.exports = { authentication };
