import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;
