import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        
        const isUsed = await User.findOne({ username })
        
        if(isUsed) { // проверка на существования данного логина
            return res.status(402).json({
                message: 'данный юзернейм уже занят.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        
        const token = jwt.sign({
            id: newUser._id,
            role: newUser.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}, 
        )

        await newUser.save()

        res.json({
            newUser, message: 'Регистрация прошла успешно',
        })

    } catch(error) {
        res.json({
            message:'Ошибка при создании пользователя',
        })
    }
}
// Login user
export const login = async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})

        if(!user) {
            return res.json({
                message:'Данного пользователя не существует',
            })
        } 

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.json({
                message:'Неправильный пароль',
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}, 
        )

        res.json({
            token, user, message: 'Вы вошли в систему',
        })


    } catch(error) {
        res.json({
            message:'Ошибка при входе',
        })
    }
}
// Get Me

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({
                message: 'такого пользователя не существует',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d'},
        )

        res.json({
            user,
            token,
        })
    } catch(error) {
        res.json({
            message:'нет доступа',
        })
    }
}