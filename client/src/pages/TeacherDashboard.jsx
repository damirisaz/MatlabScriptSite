import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

export const TeacherDashboard = () => {
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);

  // Для формы создания теста
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [selectedTest, setSelectedTest] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get('/tests/getAllTests');
        setTests(data);
      } catch (error) {
        toast.error('Ошибка загрузки тестов');
      }
    };

    const fetchStudents = async () => {
  try {
    const { data } = await axios.get('/tests/getAllStudents');
    console.log('СТУДЕНТЫ С СЕРВЕРА:', data);  // <- добавь это
    setStudents(data);
  } catch (error) {
    toast.error('Ошибка загрузки студентов');
  }
};

    fetchTests();
    fetchStudents();
  }, []);

  // Загрузка нового теста
  const handleCreateTest = async (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      toast.error('Заполните все поля и выберите файл');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const { data } = await axios.post('/tests/uploadTest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Тест успешно создан');
      setTests((prev) => [...prev, data]);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      toast.error('Ошибка при создании теста');
    }
  };

  const handleAssign = async () => {
    if (!selectedTest || !selectedStudent) {
      toast.error('Выберите тест и студента');
      return;
    }

    try {
      await axios.post('/tests/assign', {
        testId: selectedTest,
        studentId: selectedStudent,
      });
      toast.success('Тест назначен студенту');
    } catch (error) {
      toast.error('Ошибка при назначении теста');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Мои тесты</h2>

      {tests.length === 0 ? (
        <p>Тестов пока нет.</p>
      ) : (
        <ul className="mb-6">
          {tests.map((test) => (
            <li key={test._id} className="border p-3 rounded mb-2">
              <h3 className="font-semibold">{test.title}</h3>
              <p>{test.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Форма создания нового теста */}
      <form onSubmit={handleCreateTest} className="mb-6 border p-4 rounded">
        <h3 className="mb-2 font-semibold">Создать новый тест</h3>

        <input
          type="text"
          placeholder="Название теста"
          className="border p-2 rounded w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Описание теста"
          className="border p-2 rounded w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept=".m" // или подходящий формат MATLAB-скрипта
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Создать тест
        </button>
      </form>

      {/* Назначение теста студенту */}
      <div className="border p-4 rounded">
        <h3 className="mb-2 font-semibold">Назначить тест студенту</h3>

        <select
          className="border p-2 rounded w-full mb-3"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="">Выберите тест</option>
          {tests.map((test) => (
            <option key={test._id} value={test._id}>
              {test.title}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full mb-3"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Выберите студента</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.username}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Назначить
        </button>
      </div>
    </div>
  );
};
