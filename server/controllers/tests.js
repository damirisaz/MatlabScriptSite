import Test from "../models/Test.js";
import StudentTest from "../models/StudentTest.js";
import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('_id username');
    res.json(students);
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    res.status(500).json({ message: 'Ошибка при получении студентов' });
  }
};


// Создать тест (только преподаватель)
export const createTest = async (req, res) => {
    try {
        const { title, description } = req.body;
        const fileUrl = req.file.path; // MATLAB-скрипт

        const newTest = new Test({
            title,
            description,
            fileUrl,
            createdBy: req.userId
        });

        await newTest.save();
        res.json(newTest);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при создании теста" });
    }
};

// Получить все тесты преподавателя
export const getTeacherTests = async (req, res) => {
    try {
        const tests = await Test.find({ createdBy: req.userId });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении тестов" });
    }
};

// Получить все тесты студента
export const getStudentTests = async (req, res) => {
    try {
        const studentTests = await StudentTest.find({ student: req.userId }).populate("test");
        res.json(studentTests);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении тестов" });
    }
};

// Назначить тест студенту
export const assignTestToStudent = async (req, res) => {
    try {
        const { testId, studentId } = req.body;

        const studentTest = new StudentTest({
            student: studentId,
            test: testId,
            status: "pending"
        });

        await studentTest.save();
        res.json({ message: "Тест назначен студенту", studentTest });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при назначении теста" });
    }
};
