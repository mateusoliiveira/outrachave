import { Accordion, Label, Radio, TextInput } from "flowbite-react"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import CardCar from "./CardCar"
import ScrollCars from "./ScrollCars"

const CarsForSale = ({ cars, query }: any) => {
  const [carsList, setCarsList] = useState<any[]>(cars)
  const [filters, setFilters] = useState<any>({
    model: "",
    doors: undefined,
    liters: undefined,
    cylinders: undefined,
    year_start: 1900,
    year_end: 2022,
    price_start: undefined,
    price_end: undefined,
    is_automatic: 2,
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
        (car) =>
          Number(car.year) >= Number(filters.year_start) &&
          Number(car.year) <= Number(filters.year_end)
      )
    }

    if (filters.liters && parseFloat(filters.liters) > 0) {
      toFilter = toFilter.filter(
        (car) => parseFloat(car.liters) === parseFloat(filters.liters)
      )
    }

    if (filters.horsepower && Number(filters.horsepower) > 0) {
      toFilter = toFilter.filter(
        (car) => Number(car.horsepower) >= Number(filters.horsepower)
      )
    }

    if (filters.gearbox) {
      toFilter = toFilter.filter((car) =>
        filters.gearbox === 2 ? toFilter : car.is_automatic == filters.gearbox
      )
    }

    console.log(toFilter)
    console.log("-----filters-----")
    console.log(filters)

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
                  <TextInput
                    id="doors"
                    type="number"
                    placeholder="portas"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        doors: Number(e.target.value),
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
                        liters: parseFloat(e.target.value),
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
                        cylinders: Number(e.target.value),
                      })
                    }
                  />
                  <TextInput
                    id="cylinders"
                    type="number"
                    placeholder="até ... cavalos"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        horsepower: Number(e.target.value),
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
                className="flex flex-col gap-4"
                id="radio"
                onChange={(e: any) =>
                  setFilters({
                    ...filters,
                    gearbox: Number(e.target.value),
                  })
                }
              >
                <div className="flex items-center gap-2">
                  <Radio id="germany" name="countries" value={0} />
                  <Label htmlFor="germany">Manual</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="spain" name="countries" value={1} />
                  <Label htmlFor="spain">Automático</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="uk" name="countries" value={2} />
                  <Label htmlFor="uk">Todos</Label>
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
