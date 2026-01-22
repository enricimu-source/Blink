import {Router} from 'express';
import auth from '../middleware/auth.js';
import { AddSubCategoryController, getSubCategoryController, deleteSubCategoryController, updateSubCategoryController } from '../controllers/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/create',auth,AddSubCategoryController);
subCategoryRouter.get('/get',auth,getSubCategoryController);
subCategoryRouter.put('/update',auth,updateSubCategoryController);
subCategoryRouter.delete('/remove',auth,deleteSubCategoryController);

export default subCategoryRouter;