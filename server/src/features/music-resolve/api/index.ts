import { Router } from "express";
import { musicResolveActions } from "./actions";
import { resolveMusicQuerySchema } from "./req-schema";
import { validate } from "../../common/middlewares/validate";

const router = Router();

router.get("/resolve", validate(resolveMusicQuerySchema), musicResolveActions.resolve);

export default router;
