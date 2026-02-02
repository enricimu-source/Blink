import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/connectDB.js";

import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.router.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

dotenv.config();

const app = express();


// ✅ TRUST PROXY (important for cookies on vercel)
app.set("trust proxy", 1);


// ✅ CORS CONFIG (VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blink-frontend-git-dev-enricimu-sources-projects.vercel.app",
      /\.vercel\.app$/ // allow all vercel previews
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);



// ✅ MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running 🚀",
  });
});


// ✅ ROUTES
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);


// ✅ DB CONNECT
connectDB();


// ✅ LOCAL DEV
if (process.env.NODE_ENV !== "production") {
  const PORT = 8080;
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
  );
}


// ✅ EXPORT FOR VERCEL
export default app;
