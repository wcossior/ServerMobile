import routerx from "express-promise-router";
import offerController from "../controllers/OfferController";
const router = routerx();
import auth from "../middlewares/auth";
const { check } = require("express-validator");

router.post("/add",
    [
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("price", "El precio debe ser un valor numérico").isNumeric(),
        check("img", "Al menos una imágen es obligatorio y un máximo de 4 imágenes").isArray({ min: 1, max: 4 })
    ], auth.verifyUser, offerController.add);
router.get("/list", auth.verify, offerController.list);
router.put("/update/:id",
    [
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("price", "El precio debe ser un valor numérico").isNumeric(),
        check("img", "Al menos una imágen es obligatorio y un máximo de 4 imágenes").isArray({ min: 1, max: 4 })
    ], auth.verifyUser, offerController.update);
router.delete("/remove/:id", auth.verify, offerController.remove);

export default router;