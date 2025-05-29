import { useSelector } from 'react-redux';
import { selectUserRole } from '../redux/features/auth/authslice';

import { StudentDashboard } from './StudentDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { AdminDashboard } from './AdminDashboard';
import { LoginPage } from './LoginPage';

export const Dashboard = () => {
    const role = useSelector(selectUserRole);

    if (!role) {
        return <LoginPage />;
    }

    switch (role) {
        case 'student':
            return <StudentDashboard />;
        case 'teacher':
            return <TeacherDashboard />;
        case 'admin':
            return <AdminDashboard />;
        default:
            return <p>Неизвестная роль</p>;
    }
};
