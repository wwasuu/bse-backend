const {
    Router
} = require('express')
const device = require('../controller/device')

const router = Router()

router.post('/', device.create)
router.get('/', device.getAll)
router.get('/:id', device.getById)
router.delete('/:id', device.destroy)
router.put('/:id', device.update)

module.exports = router