import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <Layout>
      <main className="grid h-[600px] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order successfully placed</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">To get detail about your order, go to profile {">"} my order</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white  hover:bg-emerald-500 "
            >
              Go to home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
