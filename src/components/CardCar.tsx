import { Badge, Card } from "flowbite-react"
import Link from "next/link"
import React from "react"
import { formatToBRL } from "../_utils"

const CardCar = ({ carData }: any) => {
  return (
    <Link href={`/oferta/${carData.id}`}>
      <div className="max-w-sm h-95 hover:animate-[scaleUp_0.5s_ease-in-out_forwards] p-0.5">
        <Card
          imgAlt="Image Car"
          style={{ minHeight: "50%" }}
          imgSrc={carData.picture}
        >
          <h5 className="text-1xl md:text-1xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {`${carData.title}`}
          </h5>
          <h6 className="text-1xl md:text-md font-bold tracking-tight text-gray-700 dark:text-white">
            {`${carData.vehicles.doors}p | ${
              carData.vehicles.is_automatic ? "AT" : "MT"
            } | ${Number(carData.vehicles.liters).toFixed(1)} | ${
              carData.vehicles.horsepower || "n/a "
            }cv`}
          </h6>
          <span className="text-start text-2xl font-extrabold">
            {formatToBRL(carData.price)}
          </span>
        </Card>
      </div>
    </Link>
  )
}

export default CardCar
