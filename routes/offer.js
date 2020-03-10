import routerx from "express-promise-router";
import offerController from "../controllers/OfferController";
const router = routerx();

router.post("/add", offerController.add);
router.get("/list", offerController.list);
router.put("/update/:id", offerController.update);
router.delete("/remove/:id", offerController.remove);

export default router;