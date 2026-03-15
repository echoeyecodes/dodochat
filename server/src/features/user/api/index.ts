import { Router } from "express";
import isAuthenticated from "../../common/middlewares/isAuthenticated";
import { validate } from "../../common/middlewares/validate";
import { UpdateProfileSchema } from "./req-schema";
import { getCurrentUser, updateCurrentUser } from "./actions";

const router = Router();

router.get("/me", isAuthenticated, getCurrentUser);
router.put("/me", isAuthenticated, validate(UpdateProfileSchema), updateCurrentUser);

export default router;
