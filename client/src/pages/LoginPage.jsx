import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authslice';
import { toast } from 'react-toastify';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-white min-h-[90vh] py-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">Вход в систему</h1>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Имя пользователя</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">Пароль</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Войти
          </button>
          <Link to="/register" className="text-sm text-blue-600 hover:underline">
            Нет аккаунта? Зарегистрируйтесь
          </Link>
        </div>
      </form>
    </div>
  );
};
