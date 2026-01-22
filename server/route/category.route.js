import { Router } from "express";
import { AddCategoryController, getCategoryController, deleteCategoryController, updateCategoryController } from "../controllers/category.controller.js";
import auth from "../middleware/auth.js";
const categoryRouter = Router();

categoryRouter.post('/add',auth,AddCategoryController);
categoryRouter.get('/get',auth,getCategoryController);
categoryRouter.put('/update',auth,updateCategoryController);
categoryRouter.delete('/remove',auth,deleteCategoryController);

export default categoryRouter;