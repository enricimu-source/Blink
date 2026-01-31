import { Router } from "express";
import { addToCartItemController, getCartItemController, deleteCartItemQtyController, updateCartItemQtyController } from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.post('/create',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-qty',auth,updateCartItemQtyController);
cartRouter.delete('/delete-cart-qty',auth,deleteCartItemQtyController);


export default cartRouter;