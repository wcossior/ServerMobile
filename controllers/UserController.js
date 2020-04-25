import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";
const { validationResult } = require("express-validator");

export default {
    add: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                response: {
                    status: "error",
                    http_code: "400",
                    errors: errors.array() 
                },
                data: {}
            });
        }
        try {
            let user = await models.User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ 
                    response: {
                        status: "error",
                        http_code: "400",
                        errors: "Este email ya esta en uso. Elige otro"
                    },
                    data: {}
                });
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body);
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.User.find().populate("offer");
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },

    addtomyoffers: async (req, res, next) => {

        try {
            const reg = await models.User.updateOne({ _id: req.body.userId }, { $push: { offer: req.body.offerId } });
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },

    removetomyoffers: async (req, res, next) => {

        try {
            const reg = await models.User.updateOne({ _id: req.body.userId }, { $pull: { offer: req.body.offerId } });
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },

    update: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                response: {
                    status: "error",
                    http_code: "400",
                    errors: errors.array()
                },
                data: {}
             });
        }
        try {
            let existUser = await models.User.findOne({ email: req.body.email });
            const getId = req.params.id;

            if (existUser) {
                if (existUser._id != getId) {
                    return res.status(400).json({
                        response: {
                            status: "error",
                            http_code: "400",
                            errors: "Este email ya esta en uso. Elige otro"
                        },
                        data: {} 
                    });
                }
            }

            let user = await models.User.findOne({ _id: getId });

            let pass = req.body.password;
            if (pass != user.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const reg = await models.User.updateOne({ _id: getId }, {
                fullName: req.body.fullName,
                role: req.body.role,
                cellphoneNumber: req.body.cellphoneNumber,
                email: req.body.email,
                password: req.body.password
            });

            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },

    remove: async (req, res, next) => {
        const getId = req.params.id;
        try {
            const reg = await models.User.findByIdAndDelete({ _id: getId });
            res.status(200).json({
                response: {
                    status: "ok",
                    http_code: "200",
                    errors: []
                },
                data: {
                    reg
                }
            });
        } catch (e) {
            // res.status(500).send({
            //     msg: "Ocurrio un error"
            // });
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    },
    login: async (req, res, next) => {
        const errors = validationResult(req);
        // return res.status(400).json({ errors: errors.array() });
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                response: {
                    status: "error",
                    http_code: "400",
                    errors: errors.array()
                },
                data: {}
             });
        }
        try {
            let user = await models.User.findOne({ email: req.body.email });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    // res.status(200).json({ user, tokenReturn });
                    res.status(200).json({
                        response: {
                            status: "ok",
                            http_code: "200",
                            errors: []
                        },
                        data: {
                            user,
                            tokenReturn
                        }
                    });
                } else {
                    res.status(404).send({
                        response: {
                            status: "error",
                            http_code: "404",
                            errors: "Email o contraseña incorrectos"
                        },
                        data: {}
                    });
                }
            } else {
                res.status(404).send({
                    response: {
                        status: "error",
                        http_code: "404",
                        errors: "El usuario no existe"
                    },
                    data: {}
                });
            }

        } catch (e) {
            res.status(500).send({
                response: {
                    status: "error",
                    http_code: "500",
                    errors: "huvo un error interno del servidor"
                },
                data: {}
            });
            next(e);
        }
    }

}