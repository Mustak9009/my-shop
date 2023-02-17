import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function NavBar() {
  return (
    <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row sm:items-center">
          <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 outline-none" href={'/'}>
            <Image src={'/myShop.png'} alt='my shop' width={24} height={24}/>
            <span className="ml-3 text-xl font-black">My shop</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link href='/' className="mr-5 hover:text-gray-900 cursor-pointer outline-none">Home</Link>
            <Link href='/about' className="mr-5 hover:text-gray-900 cursor-pointer outline-none">About</Link>
            <Link href='/products' className="mr-5 hover:text-gray-900 cursor-pointer outline-none">Products</Link>
            <Link href='/contactus' className="mr-5 hover:text-gray-900 cursor-pointer outline-none">Contact US</Link>
          </nav>
          <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0 bg-blue-600 text-white hover:text-gray-200 justify-center">
            Login
          </button>
        </div>
      </header>
  )
}
