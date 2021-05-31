const {
    Device,
    DeviceMenu,
    DeviceVisualize
} = require("../model")

async function getAll(req, res) {
    try {
        const device = await Device.findAll()
        res.status(200).json({
            success: true,
            data: device
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
        const {
            id
        } = req.params
        const device = await Device.findByPk(id, {
            include: [{
                model: DeviceMenu,
                as: 'menu',
                include: [{
                    model: DeviceVisualize,
                    as: 'data'
                }]
            }]
        })
        res.status(200).json({
            success: true,
            data: device
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
        const data = req.body
        const device = await Device.create(data)
        for (const x of data.menu) {
            const menu = await DeviceMenu.create({
                device_id: device.id,
                name: x.name
            })
            const visualize = await DeviceVisualize.bulkCreate(x.data.map(y => ({
                ...y,
                device_menu_id: menu.id
            })))
        }
        res.status(201).json({
            success: true,
            data: device
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
        const {
            id
        } = req.params
        const data = req.body
        await Device.update(data, {
            where: {
                id
            }
        })

        for (const x of data.menu) {
            await DeviceMenu.update({
                name: x.name
            }, {
                where: {
                    id: x.id
                }
            })
            for (const y of x.data) {
                await DeviceVisualize.update(y, {
                    where: {
                        id: y.id
                    }
                })
            }
        }
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

async function destroy(req, res) {
    try {
        const {
            id
        } = req.params
        await Device.destroy({
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
    getAll,
    getById,
    create,
    destroy,
    update
};