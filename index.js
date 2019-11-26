import express from "express";
import UserRoute from "./server/routes/userRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users routes
app.use("/api/v1", UserRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Runninfg on port ${PORT}`));
