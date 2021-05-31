const {
    Router
} = require('express')
const device = require('../controller/userDevice')

const router = Router()

router.post('/', device.create)
router.put('/:id', device.update)
router.get('/', device.getAll)
router.get('/:id', device.getById)

module.exports = router