function errorHandling(error, req, res, next) {
  console.log(error);
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    let errors = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors[0] });
  } else if (error.name === "EMAIL_NOT_FOUND") {
    res.status(400).json({ message: "Email is required" });
  } else if (error.name === "PASSWORD_NOT_FOUND") {
    res.status(400).json({ message: "Password is required" });
  } else if (error.name === "INVALID_EMAIL_PASS") {
    res.status(401).json({ message: "Invalid email/password" });
  } else if (error.name === "DATANOTFOUND") {
    res.status(404).json({ message: "Data not found" });
  } else if (error.name === "NO_MATCH") {
    res.status(404).json({ message: "Match cannot be empty" });
  } else if (error.name === "NO_STATUS") {
    res.status(404).json({ message: "Status cannot be empty" });
  } else if (error.name === "FORBIDDEN") {
    res.status(403).json({ message: "You're not authorized" });
  } else if (error.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "Invalid token" });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = errorHandling;
