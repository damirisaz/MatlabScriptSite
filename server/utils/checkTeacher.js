import jwt from 'jsonwebtoken'

export const checkTeacher = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Отладочный вывод роли
            console.log('Decoded token:', decoded)  // Выведет весь декодированный токен
            console.log('User role:', decoded.role)  // Выведет только роль
            
            // Проверка на роль преподавателя
            if (decoded.role !== 'teacher') {
                return res.status(403).json({
                    message: 'Нет доступа (только для преподавателей)',
                })
            }

            req.userId = decoded.id
            req.userRole = decoded.role
            return next()
        } catch (error) {
            console.error('JWT Error:', error) // Отладочный вывод ошибки
            return res.status(403).json({
                message: 'Нет доступа (невалидный токен)',
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа (токен не передан)',
        })
    }
}
