import { Footer, NavBar } from '@/components';
import Head from 'next/head';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
  </Head>
  const [cart,setNewCart] = useState<any>([]);
  const [relodKey,setrelodKey] = useState<number>(1);

  const addToCart = (item:any,qty:any,price:any)=>{
      let newCart = cart;
      for(let i=0; i<qty; i++){
        newCart.push([item,price]);
      }
      setrelodKey(Math.random()); //For navBar refreshment
      setNewCart(newCart);

  }
  const removeFromCart = (item:any,qty:any)=>{
    let newCart = cart;
    let index = newCart.indexOf(item);
    newCart.splice(index);
    setNewCart(newCart);
  }
  const clearCart = ()=>{
    setNewCart([]);
  }
  
  return(
    <>
      <NavBar cart={cart} relodKey={relodKey}/>
      <Component {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}/>
      <Footer/>
    </>
  );
}
