import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ Check cookies
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
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
