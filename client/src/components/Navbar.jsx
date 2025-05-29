import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authslice';
import { toast } from 'react-toastify';

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();

    const activeStyles = "text-white border-b-2 border-white";

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        toast('Вы вышли из системы');
    };

    return (
        <div className="w-full bg-gray-900 shadow-lg">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6 text-white">
                <h1 className="text-xl font-bold">BamBamStudy</h1>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? activeStyles : "hover:text-gray-300 transition"}>
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeStyles : "hover:text-gray-300 transition"}>
                            Личный кабинет
                        </NavLink>
                    </li>
                </ul>
                <div>
                    {isAuth ? (
                        <button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm transition">
                            Выйти
                        </button>
                    ) : (
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm transition">
                            Войти
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};
