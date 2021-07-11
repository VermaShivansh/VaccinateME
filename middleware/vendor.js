const vendorAuth = (req, res, next) => {
  try {
    if (
      !(req.body.username === "vendor" && req.body.password === "vendorPass")
    ) {
      return res.status(400).send("Wrong Credentials, Pls Contact Our Team");
    }
    next();
  } catch (error) {
    res.send(404).send(error);
  }
};
module.exports = vendorAuth;
