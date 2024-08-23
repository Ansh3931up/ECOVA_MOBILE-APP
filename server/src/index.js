import app from "./app.js";
import connectdb from "../database/connectdb.js";
import Razorpay from "razorpay";
const PORT=3014;
// console.log(process.env.RAZORPAY_KEY)


connectdb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SUCCESSFully connected ${PORT}`);
    });

})
.catch((error)=>{
    console.log(error);

})