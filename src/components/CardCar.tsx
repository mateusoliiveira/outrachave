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
          style={{ minHeight: "100%" }}
          imgSrc={carData.picture}
        >
          <h5 className="text-1xl md:text-1xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {`${carData.title}`}
          </h5>
          <div className="flex items-center gap-x-2">
            <Badge color="info" className="block">
              <span className="font-extrabold">
                {`${carData.vehicles.year} | ${carData.vehicles.doors}p | ${
                  carData.vehicles.is_automatic ? "AT" : "MT"
                } | ${Number(carData.vehicles.liters).toFixed(1)} | ${
                  carData.vehicles.cylinders
                } cil.`}
              </span>
            </Badge>
          </div>

          <span className="text-start sm:text-2xl truncate font-extrabold">
            {formatToBRL(carData.price)}
          </span>
        </Card>
      </div>
    </Link>
  )
}

export default CardCar
