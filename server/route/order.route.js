import { Router } from "express";
import auth from "../middleware/auth.js";
import{ CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.post('/cod',auth,CashOnDeliveryOrderController);
orderRouter.post('/payment',auth,paymentController);
orderRouter.post('/webhook',webhookStripe);
orderRouter.get('/get',auth,getOrderDetailsController);

export default orderRouter;