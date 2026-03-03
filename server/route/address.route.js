import { Router } from "express";   
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from "../controllers/address.controller.js";
import auth from "../middleware/auth.js";
const addressRouter = Router();

addressRouter.post('/create',auth,addAddressController);
addressRouter.put('/update',auth,updateAddressController);
addressRouter.delete('/delete',auth,deleteAddresscontroller);
addressRouter.get('/get',auth,getAddressController);

export default addressRouter;