import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)

productRouter.put('/update-product-details',auth,admin,updateProductDetails)

productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

productRouter.post("/search-product", async (req, res) => {
  const { search, page = 1 } = req.body;

  res.json({
    success: true,
    page,
    totalPage: 1,
    data: [],
  });
});

export default productRouter;
