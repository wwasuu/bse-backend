const generator = require("generate-password");
const {
    UserDevice,
    Device
} = require("../model")

async function getAll(req, res) {
    try {
        const device = await UserDevice.findAll({
            include: [{
                model: Device,
                as: 'device'
            }]
        })
        res.status(200).json({
            success: true,
            data: {
                user_device: device
            }
        })
    } catch (error) {
        console.log(error);
        const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        res.status(500).json({
            statusCode: 500,
            message,
            url: req.originalUrl
        });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params
        const device = await UserDevice.findByPk(id)
        res.status(200).json({
            success: true,
            data: {
                user_device: device
            }
        })
    } catch (error) {
        console.log(error);
        const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        res.status(500).json({
            statusCode: 500,
            message,
            url: req.originalUrl
        });
    }
}

async function create(req, res) {
    try {
        const token = generator.generate({
            length: 16,
            numbers: true
        });
        const data = req.body
        const device = await UserDevice.create({
            ...data,
            token
        })
        res.status(201).json({
            success: true,
            data: {
                user_device: device
            }
        })
    } catch (error) {
        console.log(error);
        const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        res.status(500).json({
            statusCode: 500,
            message,
            url: req.originalUrl
        });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const data = req.body
         await UserDevice.update(data, { 
             where: {
                 id
             }
        })
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        res.status(500).json({
            statusCode: 500,
            message,
            url: req.originalUrl
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update
};