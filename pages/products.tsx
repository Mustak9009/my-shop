import React from "react";
import { Roboto } from "@next/font/google";
import Link from 'next/link';
const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});
const Image_base_url:string = 'http://127.0.0.1:1337'; //That is a base url for fetch asset(img) from strapi
export default function products({ products }: { products: any }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-7">
          <h1 className={`tracking-wider font-bold mb-2 text-black text-3xl ${roboto.className}`}>
            Product List - My shop
          </h1>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
        </div>
        <div className="flex flex-wrap -m-4" >
        {products?.data.map((item:any) => (
            <div className="p-4 md:w-1/3" key={item.id}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img className="lg:h-48 md:h-36 w-full object-contain object-center"  src={item.attributes.Images.data && `${Image_base_url}${item.attributes.Images.data.attributes.url}`} alt={item.attributes.Images.data.attributes.name}/>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {item.attributes.Categories}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {item.attributes.Title}
                  </h1>
                  <div className="hidden bg-white bg-black bg-orange-500 bg-red-500 bg-green-500"></div> {/*For aply dynamic bg color...*/}
                  {item.attributes.colors && item.attributes.colors.map((color:any)=>(
                     <button className={`border-2 border-gray-300 ml-1  rounded-full w-6 h-6 focus:outline-none bg-${(color != 'black' && color != 'white') ? color + '-500' : color}`} key={color}></button>
                  ))}
                  <p className="leading-relaxed mb-3">
                    {item.attributes.Description} 
                  </p>
                  <div className="flex items-center flex-wrap ">
                     <Link href={`product/${item.attributes.Slug}`}>
                      <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0 bg-blue-500 text-white hover:text-gray-200 justify-center">
                        Buy Now
                      </button>
                     </Link>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
      </div>
    </section>
  );
}
export async function getServerSideProps() {
  const res = await fetch("http://127.0.0.1:1337/api/products?populate=*", {
    method: "GET",
    mode: "same-origin",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 018b89570b147b067aa61c42efc4336f32d7ca226673119599abfdfe94801a8e925383429efe47bb9a59615003055ff4bd620f5866072488665b55cdda96906ca7c3f31d465431ff504ceb441b8e6a01d185370894858319a5e0e63175a4b2917abff2ba67485c7ca1d91964c66134d1f68d7d8d163d9bd504004985f29c6ab7",
    },
  });
  const products = await res.json();
  return {
    props: { products }, // will be passed to the page component as props
  };
}
