//import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";

 export async function CashOnDeliveryOrderController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 
        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}



export async function paymentController(req, res) {
  try {
    const userId = req.userId;
    const { list_items, addressId } = req.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productId.name,
          images: [item.productId.image[0]], // must be array
          metadata: {
            productId: item.productId._id.toString(),
          },
        },
        unit_amount:
          pricewithDiscount(
            item.productId.price,
            item.productId.discount
          ) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,

      metadata: {
        userId: userId.toString(),
        addressId: addressId,
      },

      line_items,

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("Stripe error:", error);

    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images
                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function webhookStripe(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    console.log("Webhook signature error:", err.message);
    return res.sendStatus(400);
  }

  console.log("✅ Webhook verified:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;

    if (!userId) {
      console.log("❌ No userId in metadata");
      return res.json({ received: true });
    }

    console.log("UserId:", userId);

    // Clear cart
    await UserModel.findByIdAndUpdate(userId, {
      shopping_cart: [],
    });

    await CartProductModel.deleteMany({ userId });

    console.log("🛒 Cart cleared!");
  }

  res.json({ received: true });
}



export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId 
        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}