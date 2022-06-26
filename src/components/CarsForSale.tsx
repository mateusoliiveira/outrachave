import { Accordion, TextInput } from "flowbite-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import CardCar from "./CardCar"
import ScrollCars from "./ScrollCars"

const CarsForSale = ({ cars, query }: any) => {
  const [carsList, setCarsList] = useState<any[]>(cars)
  const [filters, setFilters] = useState<any>({
    model: "",
    year_start: 1950,
    year_end: new Date().getFullYear(),
    price_start: 0,
    price_end: 0,
  })

  const allOrFiltered = () => {
    let toFilter = carsList

    if (filters.model.trim() !== "") {
      toFilter = toFilter.filter((car) =>
        car.title.toLowerCase().includes(filters.model.toLowerCase())
      )
    }

    if (filters.year_start <= filters.year_end) {
      toFilter = toFilter.filter(
        (car) => car.year >= filters.year_start && car.year <= filters.year_end
      )
    }

    return toFilter
  }

  useEffect(() => {
    allOrFiltered()
  }, [filters])

  return (
    <div className="px-5 lg:flex lg:justify-center gap-5 mt-10">
      <div className="flex-column">
        <div className="text-2xl p-3 mb-3 text-gray-50 font-bold bg-gradient-to-r from-red-600 to-orange-200 rounded-lg">
          <p className="text-bold text-sm">filtrando por modelos</p>
          {query}
        </div>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Modelo e litragem</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold">
                <div className="mb-1">
                  <TextInput
                    id="model"
                    type="text"
                    placeholder="modelo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({ ...filters, model: e.target.value })
                    }
                  />
                </div>
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput id="doors" type="number" placeholder="portas" />
                  <TextInput
                    id="liters"
                    type="number"
                    step={0.1}
                    placeholder="litragem"
                  />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Ano</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold ">
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    defaultValue={filters.year_start}
                    id="yearStart"
                    type="number"
                    placeholder="2016"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        year_start:
                          Number(e.target.value) < filters.year_start
                            ? 1950
                            : Number(e.target.value),
                      })
                    }
                  />
                  <TextInput
                    defaultValue={filters.year_end}
                    id="yearEnd"
                    type="number"
                    placeholder="2021"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        year_end:
                          Number(e.target.value) > filters.year_end
                            ? new Date().getFullYear()
                            : Number(e.target.value),
                      })
                    }
                  />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Motorização</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold ">
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    id="cylinders"
                    type="number"
                    placeholder="cilindros"
                  />
                  <TextInput id="cylinders" type="number" placeholder="hp" />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Câmbio</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold ">
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    id="cylinders"
                    type="number"
                    placeholder="cilindros"
                  />
                  <TextInput id="cylinders" type="number" placeholder="hp" />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Quilômetros rodados</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold ">
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    id="cylinders"
                    type="number"
                    placeholder="cilindros"
                  />
                  <TextInput id="cylinders" type="number" placeholder="hp" />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      {allOrFiltered().length === 0 ? (
        <ScrollCars>
          <div className="m-auto px-2 flex align-middle">
            <span className="text-gray-200 font-bold my-10">
              oops, não há veículos com esses parâmetros
            </span>
          </div>
        </ScrollCars>
      ) : (
        <ScrollCars>
          {carsList &&
            allOrFiltered().map((car) => {
              return (
                <div key={car.id} className="">
                  <CardCar carData={car} />
                </div>
              )
            })}
        </ScrollCars>
      )}
    </div>
  )
}

export default CarsForSale
