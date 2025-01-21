const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors(corsOptions));

const indexRoutes = require("./routes/Index.route");
const productRoutes = require("./routes/Products.route");
const categoryRoutes = require("./routes/Categories.route");
const orderRoutes = require("./routes/Orders.route");
const userRoutes = require("./routes/Users.route");

app.use("/api/v1", indexRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/user", userRoutes);

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/eshopper")) {
    res.sendFile(
      path.resolve(__dirname, "..", "public/eshopper/frontend", "index.html")
    );
  } else {
    next();
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
