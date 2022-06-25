import {
  Badge,
  Button,
  Dropdown,
  Label,
  Select,
  TextInput,
} from "flowbite-react"
import React, { ChangeEvent, useState } from "react"
import { baseImageURL } from "../../../../lib/api"
import { Brand } from "../../../../types/Brand"
import { Category } from "../../../../types/Category"
import { Offer } from "../../../../types/Offer"
import { Vehicle } from "../../../../types/Vehicle"
import {
  formatDate,
  formatPhone,
  formatToBRL,
  formatZipCode,
} from "../../../../_utils"
import Horse from "../../../Horse"

const OfferPublished = ({ offer }: any) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`${baseImageURL + offer.picture}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {offer.title}
            </h2>
            <h3 className="text-xs title-font text-gray-500 tracking-widest mb-3">
              {`publicado há ${formatDate(offer.created_at)}, em ${new Date(
                offer.created_at
              ).toLocaleDateString()}`}
            </h3>
            <h1 className="text-gray-200 text-3xl title-font font-medium mb-1">
              {offer.vehicles.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <div className="text-gray-600 flex gap-3 ml-3">
                  <img
                    className="invert"
                    src="https://img.icons8.com/external-icongeek26-outline-icongeek26/23/000000/external-car-door-car-parts-and-service-icongeek26-outline-icongeek26.png"
                  />
                  {offer.vehicles.doors}
                </div>
                <div className="text-gray-600 flex gap-3 ml-3">
                  <img
                    className="invert"
                    src="https://img.icons8.com/ios/25/000000/engine.png"
                  />
                  {Number(offer.vehicles.liters).toFixed(1)}|
                  {offer.vehicles.cylinders} cil.|{offer.vehicles.horsepower} cv
                </div>
              </span>
              <div className="flex ml-3 gap-2 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <p className="leading-relaxed text-blue-300 mb-5">
              {offer.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge color="success" size="sm">
                {formatPhone(offer.contact)}
              </Badge>
              <Badge color="info" size="sm">
                {formatZipCode(offer.zip_code)}
              </Badge>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
            <div className="flex">
              <span className="title-font text-2xl font-extrabold text-gray-200">
                {formatToBRL(offer.price)}
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Button
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OfferPublished
