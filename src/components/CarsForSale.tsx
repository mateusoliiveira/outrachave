import { Accordion, Label, Radio, TextInput } from "flowbite-react"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import CardCar from "./CardCar"
import ScrollCars from "./ScrollCars"

const CarsForSale = ({ cars, query }: any) => {
  const [carsList, setCarsList] = useState<any[]>(cars)
  const handleEmptyFilter = (value: any) => value ?? undefined
  const [filters, setFilters] = useState<any>({
    name: undefined,
    doors: undefined,
    liters: undefined,
    cylinders: undefined,
    price_start: undefined,
    price_end: undefined,
    horsepower: undefined,
    is_automatic: undefined,
    year_start: 1900,
    year_end: 2022,
  })

  const allOrFiltered = () => {
    let toFilter = carsList

    if (filters.name && filters.name.trim() !== "") {
      toFilter = toFilter.filter((car) =>
        car.vehicles.name.toLowerCase().includes(filters.name.toLowerCase())
      )
    }

    if (filters.year_start <= filters.year_end) {
      toFilter = toFilter.filter(
        (car) =>
          Number(car.vehicles.year) >= Number(filters.year_start) &&
          Number(car.vehicles.year) <= Number(filters.year_end)
      )
    }

    if (filters.price_start <= filters.price_end) {
      toFilter = toFilter.filter(
        (car) =>
          parseFloat(car.price) >= parseFloat(filters.price_start) &&
          parseFloat(car.price) <= parseFloat(filters.price_end)
      )
    }

    if (filters.cylinders && parseInt(filters.cylinders) > 0) {
      toFilter = toFilter.filter(
        (car) =>
          parseInt(car.vehicles.cylinders) === parseInt(filters.cylinders)
      )
    }

    if (filters.liters && parseFloat(filters.liters) > 0) {
      toFilter = toFilter.filter(
        (car) => parseFloat(car.vehicles.liters) === parseFloat(filters.liters)
      )
    }

    if (filters.doors && Number(filters.doors) > 0) {
      toFilter = toFilter.filter(
        (car) => Number(car.vehicles.doors) === Number(filters.doors)
      )
    }

    if (filters.horsepower && Number(filters.horsepower) > 0) {
      toFilter = toFilter.filter(
        (car) => Number(car.vehicles.horsepower) > Number(filters.horsepower)
      )
    }

    if (filters.is_automatic) {
      toFilter = toFilter.filter((car) => {
        if (filters.is_automatic === 1) return !car.vehicles.is_automatic
        if (filters.is_automatic === 2) return car.vehicles.is_automatic
      })
    }
    return toFilter
  }

  useEffect(() => {
    allOrFiltered()
  }, [filters])

  return (
    <div className="px-5 lg:flex lg:justify-center gap-5 mt-10">
      <div className="flex-column mb-6">
        <div className="text-2xl p-3 mb-3 text-gray-50 font-bold bg-gradient-to-r from-red-600 to-orange-200 rounded-lg">
          <p className="text-bold text-sm">filtrando por</p>
          {query}
        </div>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Modelo e litragem</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold">
                <div className="mb-1">
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="modelo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        name: handleEmptyFilter(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    id="doors"
                    type="number"
                    placeholder="portas"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        doors: handleEmptyFilter(Number(e.target.value)),
                      })
                    }
                  />
                  <TextInput
                    id="liters"
                    type="number"
                    placeholder="litragem"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        liters: handleEmptyFilter(parseFloat(e.target.value)),
                      })
                    }
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
                        year_start: Number(e.target.value),
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
                        year_end: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Preço</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center gap-4 text-red-600 font-bold ">
                <div className="flex row justify-evenly lg:justify-center gap-1">
                  <TextInput
                    defaultValue={filters.price_start}
                    id="priceStart"
                    type="number"
                    step={0.1}
                    placeholder="15000"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        price_start: parseFloat(e.target.value),
                      })
                    }
                  />
                  <TextInput
                    defaultValue={filters.price_end}
                    id="priceEnd"
                    type="number"
                    step={0.1}
                    placeholder="36000"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        price_end: parseFloat(e.target.value),
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
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        cylinders: handleEmptyFilter(Number(e.target.value)),
                      })
                    }
                  />
                  <TextInput
                    id="horsepowers"
                    type="number"
                    placeholder="até ... cavalos"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        horsepower: handleEmptyFilter(Number(e.target.value)),
                      })
                    }
                  />
                </div>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Câmbio</Accordion.Title>
            <Accordion.Content>
              <fieldset
                className="flex flex-row gap-5 px-10 justify-center"
                id="radio"
                onChange={(e: any) =>
                  setFilters({
                    ...filters,
                    is_automatic: Number(e.target.value),
                  })
                }
              >
                <div className="flex items-center gap-1">
                  <Radio id="mt" name="countries" value={1} />
                  <Label className="text-white" htmlFor="mt">
                    Manual
                  </Label>
                </div>
                <div className="flex items-center gap-1">
                  <Radio id="at" name="countries" value={2} />
                  <Label className="text-white" htmlFor="at">
                    Automático
                  </Label>
                </div>
                <div className="flex items-center gap-1">
                  <Radio id="all" name="countries" value={0} />
                  <Label className="text-white" htmlFor="all">
                    Todos
                  </Label>
                </div>
              </fieldset>
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
                <div key={car.vehicles.id} className="">
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
