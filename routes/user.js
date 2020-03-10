import routerx from "express-promise-router";
import userController from "../controllers/UserController";
const router = routerx();

router.post("/add", userController.add);
router.get("/list", userController.list);
router.put("/update/:id", userController.update);
router.delete("/remove/:id", userController.remove);
router.post("/login", userController.login);
router.put("/addtomyoffers", userController.addtomyoffers);
router.put("/removetomyoffers", userController.removetomyoffers);

export default router;