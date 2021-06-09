const express = require('express')
const router = express.Router()
const User = require('../models/user')

const { check, validationResult } = require('express-validator')

router.get('/', async(request, response) => {
    try {
        const users = await User.find();
        response.json(users)
    }catch(error) {
        response.send('Error: ' + error)
    }
})


router.get('/:id', async(request, response) => {
    try {
        const user = await User.findById(request.params.id);
        response.json(user)
    }catch(error) {
        response.send('Error: ' + error)
    }
})


router.post('/', [
    check('name', 'That name is not valid').isLength({ min:3 }).isAlpha(),
    check('surname', 'That surname is not valid').isLength({ min:3 }).isAlpha(),
    check('age', 'That age is not valid').isFloat({ min:0, max:125 }),
    check('id', 'That id is incorrect').isLength(9).isAlphanumeric(),
    check('birthday', 'Your birthday format is incorrect').isISO8601(),
    check('favoriteColor', 'The color is not valid').isLength({ min:3 }).isAlpha(),
    check('gender', 'You have inserted a not valid parameter').isIn(['Masculine', 'Feminine', 'Other', 'Not specified']),
], async(request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({ errors: errors.array() });
    }
    const user = new User({
        name: request.body.name,
        surname: request.body.surname,
        age: request.body.age,
        id: request.body.id,
        birthday: request.body.birthday,
        favoriteColor: request.body.favoriteColor,
        gender: request.body.gender
    })
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(error) {
        response.send('Error: ' + error)
    }
})

router.patch('/:id', async(request, response) => {
    try{
        const user = await User.findById(request.params.id)
        user.age = request.body.age,
        user.favoriteColor = request.body.favoriteColor,
        user.gender = request.body.gender
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(error) {
        response.send('Error: ' + error)
    }
})

router.delete('/:id', async(request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const removedUser = await user.remove()
        response.json(removedUser)
    }catch(error) {
        response.send('Error: ' + error)
    }
})


module.exports = router