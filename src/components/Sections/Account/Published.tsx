import React from "react"
import { baseImageURL } from "../../../lib/api"
import { formatDate } from "../../../_utils"

const Published = ({ offers }: any) => {
  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          {offers &&
            offers?.map((offer: any) => {
              return (
                <div className="p-4 lg:w-1/2 truncate">
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img
                      alt="team"
                      className="flex-shrink-0 rounded-lg w-100 h-48 object-cover object-center sm:mb-0 mb-4"
                      src={`${baseImageURL + offer.picture}`}
                    />
                    <div className="flex-grow sm:pl-8 truncate">
                      <h2 className="title-font text-lg font-semibold text-gray-200 truncate">
                        {offer.title}
                      </h2>
                      <h3 className="text-gray-500 mb-3">
                        {`há ${formatDate(offer.created_at)}, em ${new Date(
                          offer.created_at
                        ).toLocaleString()}`}
                      </h3>
                      <p className="mb-4 truncate">{offer.description}</p>
                      <span className="inline-flex">
                        <a className="text-gray-500">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Published
