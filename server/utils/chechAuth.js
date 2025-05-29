import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.userId = decoded.id
            req.userRole = decoded.role
            console.log(req.userId)
            return next() // ВАЖНО!!!
        } catch (error) {
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
