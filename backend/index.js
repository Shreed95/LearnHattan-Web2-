import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import profileRoutes from "./routes/profileRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboard from "./routes/dashboard.js";
import achivementsRoutes from "./routes/achivementsRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import assignmentsRoutes from "./routes/assignmentRoutes.js";
import contributorRouter from "./routes/contributorRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import registerTutor from "./routes/tutorRoutes/register.js";
import loginTutor from "./routes/tutorRoutes/login.js"
import tutorRoutes from "./routes/tutorRoutes/tutorRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Use register and login routes for tutor Authentication
app.use("/api/tutor", registerTutor);
app.use("/api/tutor", loginTutor);
app.use("/api/tutor", tutorRoutes);

// Use register and login routes for user authentication
app.use("/api/users", register);
app.use("/api/users", login);

app.use("/api/users", contributorRouter);

// Use profile, course, and user routes
// app.use("/api/users", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboard);
app.use("/api/achivements", achivementsRoutes);

app.use("/api/assignments", assignmentsRoutes);

//Ranking System
app.use("/api/ranking", rankingRoutes);

//Submission System
app.use("/api/submissions", submissionRoutes);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
