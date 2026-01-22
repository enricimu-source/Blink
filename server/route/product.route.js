import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import {createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails,searchProduct, updateProductDetails} from "../controllers/product.controller.js";

const productRouter = Router(); 
productRouter.post('/create',auth,admin,createProductController);
productRouter.post('/get',getProductController);
productRouter.post('/get-product-details',getProductDetails);
productRouter.put('/update-product-details',auth,admin,updateProductDetails);
productRouter.delete('/delete-product',auth,admin,deleteProductDetails);
productRouter.post('/get-products-by-category',getProductByCategory);
productRouter.post('/get-products-by-category-and-subcategory',getProductByCategoryAndSubCategory);
productRouter.post('/search-product',searchProduct);


export default productRouter;

