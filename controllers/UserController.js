import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
    add: async (req, res, next) => {
        
        try {
            let user = await models.User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ msg: "Este email ya esta en uso. Elige otro." });
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.User.find().populate("course");
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        
        try {
            let existUser = await models.User.findOne({ email: req.body.email });

            if (existUser) {
                if (existUser._id != req.body._id) {
                    return res.status(400).json({ msg: "Este email ya esta en uso. Elige otro." });
                }
            }

            let user = await models.User.findOne({ _id: req.body._id });

            let pass = req.body.password;
            if (pass != user.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const reg = await models.User.updateOne({ _id: req.body._id }, {
                fullName: req.body.name,
                role: req.body.role,
                cellPhoneNumber: req.body.cellPhoneNumber,
                email: req.body.email,
                password: req.body.password
            });

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    },
        
    remove: async (req, res, next) => {
        const getId = req._parsedUrl.query.replace("0=", "");
        try {
            const reg = await models.User.findOne({ _id: getId });
            const reg2 = await models.User.deleteOne(reg);
            res.status(200).json(reg2);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            let user = await (await models.User.findOne({ email: req.body.email, state: 1 }));
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(404).send({
                        msg: "Email o constraseña incorrectos."
                    });
                }
            } else {
                res.status(404).send({
                    msg: "El usuario no existe."
                });
            }

        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    }

}