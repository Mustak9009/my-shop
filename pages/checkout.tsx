import React, { useState } from "react";
import Script from 'next/script';
type FormType = {
  name:string,
  email:string,
  phone:string,
  address:string
}
declare const window: any;
export default function checkout({cart}:{cart:any}) {
  let totalPrice=0;
  const [formData,setFormData] = useState<FormType>({
    name:'',
    email:'',
    phone:'',
    address:'',
  });
  // const totalPrice = cart.map((price:any)=> sum = price[1] + sum);
  // console.log(sum);
  for(let i=0; i<cart.length; i++){
    let arr = cart[i] 
    totalPrice += arr[1];
  }
  function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setFormData({...formData,[(e.target as HTMLInputElement).name]:(e.target as HTMLInputElement).value})
  }
  const handleSubmit=()=>{
    console.log(formData);
  }
  return (
    <div className="container mx-auto px-4 flex  flex-col-reverse lg:flex-row justify-center">
      <Script>
        <Script type="application/javascript" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"></Script>
          function onScriptLoad(){
            let config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
            "orderId": "", /* update order id */
            "token": "", /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": "" /* update amount */
          },
            "handler": {
            "notifyMerchant": function(eventName,data){
            console.log("notifyMerchant handler function called");
            console.log("eventName ={">"} ",eventName);
            console.log("data ={">"} ",data);
        }
      }
    };
    if(window.Paytm && window.Paytm.CheckoutJS){
      window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
   }).catch(function onError(error: any){
      console.log("error => ",error);
    });
  });
  }
}
      </Script>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col  w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Check out
            </h1>
            <p className="lg:w-2/3 leading-relaxed ">
            Welcome to our checkout page! This is the final step <br/>of your shopping journey with us. 
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 ">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Full name
                  </label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.name} onChange={handleChange}/>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.email} onChange={handleChange}/>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                    Phone
                  </label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={formData.phone} onChange={handleChange}/>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                    Address
                  </label>
                  <textarea id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  value={formData.address} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="p-2">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" onClick={handleSubmit}>
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-1/2 container px-5 py-36 md:mx-auto ">
        {cart.length !=0 ? 
        <>
          <h1 className="mb-3 text-2xl ">Your cart details here: </h1>
          <ol className="list-decimal mx-5">
            {cart.map((item:any,index:number)=>(
              <li key={index}> {item[0]} at price ₹{item[1]}</li>
              ))}
          </ol>
          <p className="mt-5 font-bold">Total price ₹{totalPrice}</p>
        </>
      : <p>Your cart is empty</p>}
      </section>
    </div>
  );
}

