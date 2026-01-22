import { Router } from "express";
import { addToCartItemController, getCartItemController, deleteCartItemQtyController, updateCartItemQtyController } from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.post('/add',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update',auth,updateCartItemQtyController);
cartRouter.delete('/remove',auth,deleteCartItemQtyController);


export default cartRouter;