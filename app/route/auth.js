const { Router } = require('express')
const auth = require('../controller/auth')

const router = Router()

router.post('/', auth.register)
router.get('/validate', auth.validate)
router.post('/login', auth.login)

module.exports = router
