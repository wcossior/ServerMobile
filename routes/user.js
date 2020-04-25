import routerx from "express-promise-router";
import userController from "../controllers/UserController";
const router = routerx();
import auth from "../middlewares/auth";
const { check } = require("express-validator");

router.post("/add", [
    check("fullName", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Ingrese un email valido.").isEmail(),
    check("cellphoneNumber", "El celular es obligatorio.").not().isEmpty(),
    check("password", "El password es obligatorio.").not().isEmpty(),

    check("cellphoneNumber", "Ingrese un celular valido.").isLength({ min: 8, max: 8 }),
    check("password", "El password debe ser minimo de 6 caracteres.").isLength({ min: 6 }),
], userController.add);

router.get("/list", auth.verifyAdmin, userController.list);
router.put("/update/:id", [
    check("fullName", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Ingrese un email valido.").isEmail(),
    check("cellphoneNumber", "El celular es obligatorio.").not().isEmpty(),
    check("password", "El password es obligatorio.").not().isEmpty(),

    check("cellphoneNumber", "Ingrese un celular valido.").isLength({ min: 8, max: 8 }),
    check("password", "El password debe ser minimo de 6 caracteres.").isLength({ min: 6 }),
], auth.verify, userController.update);
router.delete("/remove/:id", auth.verifyUser, userController.remove);
router.post("/login",
    [
        check("email", "Ingrese un email valido.").isEmail(),
        check("password", "El password es obligatorio.").not().isEmpty(),
        check("password", "El password debe ser minimo de 6 caracteres.").isLength({ min: 6 }),
    ], userController.login);
router.put("/addtomyoffers", auth.verifyUser, userController.addtomyoffers);
router.put("/removetomyoffers", auth.verifyUser, userController.removetomyoffers);

export default router;