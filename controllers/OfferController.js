import models from "../models";
const { validationResult } = require("express-validator");

export default {
    add: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const reg = await models.Offer.create(req.body);
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
            const reg = await models.Offer.find();
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const getId = req.params.id;

            const reg = await models.Offer.updateOne({ _id: getId }, {
                name: req.body.name,
                price: req.body.price,
                img: req.body.img,
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
        const getId = req.params.id;
        try {
            const reg = await models.Offer.findByIdAndDelete({ _id: getId });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                msg: "Ocurrio un error"
            });
            next(e);
        }
    }

}