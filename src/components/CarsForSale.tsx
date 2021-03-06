import { Accordion, Label, Radio, Select, TextInput } from "flowbite-react"
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
            <Accordion.Title>Pre??o</Accordion.Title>
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
            <Accordion.Title>Motoriza????o</Accordion.Title>
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
                    placeholder="at?? ... cavalos"
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
            <Accordion.Title>C??mbio</Accordion.Title>
            <Accordion.Content>
              <form className="flex-col justify-center text-red-600 font-bold -mx-1">
                <Select
                  id="countries"
                  className="min-w-100"
                  onChange={(e: any) =>
                    setFilters({
                      ...filters,
                      is_automatic: Number(e.target.value),
                    })
                  }
                >
                  <option className="mx-36" value={0}>
                    Todos
                  </option>
                  <option className="mx-36" value={1}>
                    Manual
                  </option>
                  <option className="mx-36" value={2}>
                    Autom??tico
                  </option>
                </Select>
              </form>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      {allOrFiltered().length === 0 ? (
        <ScrollCars>
          <div className="m-auto px-2 flex align-middle">
            <span className="text-gray-200 font-bold my-10">
              oops, n??o h?? ve??culos com esses par??metros
            </span>
          </div>
        </ScrollCars>
      ) : (
        <ScrollCars>
          {carsList &&
            allOrFiltered().map((car) => {
              return <CardCar key={car.vehicles.id} carData={car} />
            })}
        </ScrollCars>
      )}
    </div>
  )
}

export default CarsForSale
