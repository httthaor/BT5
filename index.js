require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware kiểm tra tuổi (age)
const checkAgeMiddleware = (req, res, next) => {
  const { age } = req.query;

  if (!age || isNaN(age)) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp độ tuổi hợp lệ (age)"
    });
  }

  const parsedAge = parseInt(age, 10);

  // Nếu age < 18: trả về lỗi và chặn request
  if (parsedAge < 18) {
    return res.status(403).json({
      success: false,
      message: "Bạn chưa đủ 18 tuổi để truy cập"
    });
  }

  // Nếu age >= 18: tiếp tục xử lý
  next();
};

// Route: GET /api/info
app.get("/api/info", checkAgeMiddleware, (req, res) => {
  const { name, age } = req.query;

  return res.json({
    success: true,
    message: "Xác thực thành công",
    data: {
      name: name || "Ẩn danh",
      age: parseInt(age, 10)
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});