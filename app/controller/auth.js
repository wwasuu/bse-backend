const passwordUtil = require("../util/password");
const tokenUtil = require("../util/token");
const {
    Auth
} = require("../model")

async function register(req, res) {
    try {
        const body = req.body;
        const password = passwordUtil.encrypt(body.password);

        const existingAuth = await Auth.findOne({
            where: {
                username: body.username
            }
        });
        if (existingAuth) {
            throw new Error("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");
        }

        await Auth.create({
            username: body.username,
            password,
            role: body.role || "USER"
        });

        res.status(201).json({
            success: true
        });
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

async function validate(req, res) {
    try {
        const query = req.query;

        const existingAuth = await Auth.findOne({
            where: {
                username: query.username
            }
        });
        if (existingAuth) {
            throw new Error("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");
        }

        res.status(200).json({
            success: true
        });
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

async function login(req, res) {
    try {
        const body = req.body;

        const auth = await Auth.findOne({
            where: {
                username: body.username
            }
        });
        if (!auth) {
            throw new Error("ไม่พบชื่อผู้ใช้นี้");
        }

        const isEqualPassword = passwordUtil.compare(body.password, auth.password);

        if (!isEqualPassword) {
            throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }

        let user;

        if (auth.role !== "ADMIN") {
            user = await User.findOne({
                where: {
                    email: body.email
                }
            });
        }


        const token = tokenUtil.generate({
            username: auth.username,
            user_id: user ? user.id : null,
            role: auth.role
        });

        await Auth.update({
            access_token: token
        }, {
            where: {
                username: auth.username
            }
        });

        res.status(200).json({
            success: true,
            data: {
                username: auth.username,
                token
            }
        });
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
    register,
    validate,
    login,
};