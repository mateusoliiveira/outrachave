import React from "react"
import { baseImageURL } from "../../../lib/api"
import { Offer } from "../../../types/Offer"
import { formatToBRL } from "../../../utils"

type Offers = {
  offers: Offer[]
}

const ClassifiedForYour = ({ offers }: Offers) => {
  return (
    <section className="text-gray-600 w-full overflow-hidden">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap border-b-orange-400">
          <h1 className="sm:text-3xl text-2xl font-semibold text-gray-100 lg:w-1/3 lg:mb-0 mb-4">
            selecionamos esses pra você
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-end">
            os mais vistos de hoje e que ainda não foram vendidos, tá esperando
            o quê?!
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2">
          <div className="flex flex-wrap w-1/2">
            <div className="p-auto w-1/2 relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 f-row-col overflow-hidden mb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white "
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[0].title}</h3>
                  <p className="">{formatToBRL(offers[0].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={baseImageURL + offers[0].picture}
              />
            </div>
            <div className="w-1/2 relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 f-row-col overflow-hidden mb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white"
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[1].title}</h3>
                  <p className="">{formatToBRL(offers[1].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={baseImageURL + offers[1].picture}
              />
            </div>
            <div className="w-full relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 flex-col  overflow-hiddenmb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white"
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[2].title}</h3>
                  <p className="">{formatToBRL(offers[2].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={baseImageURL + offers[2].picture}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="w-full relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 flex-col  overflow-hiddenmb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white "
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[3].title}</h3>
                  <p className="">{formatToBRL(offers[3].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={baseImageURL + offers[3].picture}
              />
            </div>
            <div className="w-1/2 relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 flex-col  overflow-hiddenmb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white"
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[4].title}</h3>
                  <p className="">{formatToBRL(offers[4].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={baseImageURL + offers[4].picture}
              />
            </div>
            <div className="w-1/2 relative flex justify-center items-center hover:scale-[1.01] transition-all">
              <div className="absolute p-0 flex h-full w-full transition ease-in-out hover:bg-gradient-to-t from-[#EF5F67] to-transparent">
                <div
                  className="md:flex-1 flex-col  overflow-hiddenmb-2 text-xs md:text-md lg:text-2xl font-extrabold text-transparent 
                  transition ease-in-out hover:text-white"
                  style={{ padding: "7%" }}
                >
                  <h3 className="">{offers[5].title}</h3>
                  <p className="">{formatToBRL(offers[5].price)}</p>
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={baseImageURL + offers[5].picture}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClassifiedForYour
