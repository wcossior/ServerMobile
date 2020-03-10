import routerx from "express-promise-router";
import userRouter from "./user";
import offerRouter from "./offer";
const router = routerx();

router.use("/user", userRouter);
router.use("/offer", offerRouter);

export default router;