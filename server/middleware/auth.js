import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res.status(401).json({
        message: "Access token missing",
        error: true,
        success: false,
      });
    }

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
