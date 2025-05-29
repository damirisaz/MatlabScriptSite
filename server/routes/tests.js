import { Router } from "express";
import { checkAuth } from "../utils/chechAuth.js";

import upload from "../middleware/upload.js";
import { createTest, getTeacherTests, getStudentTests, assignTestToStudent, getAllStudents } from "../controllers/tests.js";
import { submitAnswer, getStudentAnswers, gradeTest } from "../controllers/studentAnswers.js";
import uploadMatlab from "../middleware/uploadMatlab.js";
import { checkTeacher } from "../utils/checkTeacher.js";

const router = new Router();

// Тесты преподавателя
router.post("/uploadTest", checkAuth, checkTeacher, uploadMatlab.single("file"), createTest); // MATLAB-скрипт
router.get("/getAllTests", checkAuth, checkTeacher, getTeacherTests);
router.post("/assign", checkAuth, checkTeacher, assignTestToStudent);

// Тесты студента
router.get("/student", checkAuth, getStudentTests);
router.get("/getAllStudents", checkAuth, checkTeacher, getAllStudents);
router.post("/uploadAnswer", checkAuth, upload.single("file"), submitAnswer); // Ответ студента в .txt
//router.get("/answers/:testId", checkAuth, getStudentAnswers);
router.post("/grade", checkAuth, gradeTest);

export default router;

