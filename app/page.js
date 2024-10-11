"use client";
import * as React from 'react';
import Link from 'next/link';

export default function HomeV2() {
  return (
    <main>
      <header className="bg-blue-500 p-4 flex">
        <h1 className="text-white font-bold mr-6">VMS</h1>
        <nav className="flex space-x-4">
          <Link href="/products">
            <a className="text-white">PRODUCTS</a>
          </Link>
          <Link href="/categories">
            <a className="text-white">CATEGORIES</a>
          </Link>
          <Link href="/customers">
            <a className="text-white">CUSTOMER MANAGEMENT</a>
          </Link>
        </nav>
      </header>

      <div className="w-full h-full my-10 mx-10">
        <h1 className="font-bold text-xl">Stock App</h1>
        <p>Simple stock management</p>
      </div>
    </main>
  );
}