import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать в систему тестирования</h1>
      <p className="text-lg text-center max-w-xl mb-6">
        Эта платформа позволяет студентам проходить тесты с автоматической проверкой на основе MATLAB,
        а преподавателям — загружать свои задания и отслеживать результаты их выполнения.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Войти
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
        >
          Регистрация
        </Link>
      </div>
    </div>
  );
};
