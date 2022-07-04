//@ts-ignore
import SimpleFileUpload from "react-simple-file-upload"
import { Button, Dropdown, Label, Select, TextInput } from "flowbite-react"
import FormData from "form-data"
import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
import { ApiServer } from "../../../_services"
import { Brand } from "../../../types/Brand"
import { Category } from "../../../types/Category"
import { Offer } from "../../../types/Offer"
import { Vehicle } from "../../../types/Vehicle"
import Feedback from "../../Feedback"
import Tab from "../../Tab"

type Steps = {
  first: JSX.Element
  second: JSX.Element
  third: JSX.Element
  fourth: JSX.Element
}
type Stp = keyof Steps

type StepsAlreadyDone = {
  greenIfBrandModelCategoryIsFilled: string
  greenIfTitleDescriptionPriceIsFilled: string
  greenIfContactZipCodeIsFilled: string
}
type StpAlreadyDone = keyof StepsAlreadyDone

const OfferNewFlow = ({ categories, brands, token }: any) => {
  const navigate = useRouter()
  const [requisitionResult, setRequisitionResult] = useState<any>(undefined)
  const [brandsList, setBrandsList] = useState<Brand[]>(brands)
  const [vehiclesList, setVehiclesList] = useState<any[]>([])
  const [keywordBrand, setKeywordBrand] = useState<string>("")
  const [keywordVehicle, setKeywordVehicle] = useState<string>("")
  const [actualStep, setActualStep] = useState<Stp>("first")
  const [offer, setOffer] = useState<Offer>({
    brand_id: "",
    category_id: "",
    vehicle_id: "",
    title: "",
    description: "",
    picture: "",
    price: "",
    contact: "",
    zip_code: "",
  })

  const brandsFiltered = (): Brand[] => {
    if (keywordBrand.trim() !== "") {
      return brandsList.filter((brand: Brand) =>
        brand.name.toLowerCase().includes(keywordBrand.toLowerCase())
      )
    }
    return brandsList
  }

  const carsFiltered = (): Vehicle[] => {
    if (keywordVehicle.trim() !== "") {
      return vehiclesList.filter((vehicle: Vehicle) =>
        vehicle.name.toLowerCase().includes(keywordVehicle.toLowerCase())
      )
    }
    return vehiclesList
  }

  const uploadedUrl = (url: string): void => {
    console.log(url)
    setOffer({
      ...offer,
      picture: url,
    })

    handlePublish()
  }

  const handlePublish = async () => {
    let body = new FormData()
    body.append("brand_id", offer.brand_id)
    body.append("category_id", offer.category_id)
    body.append("vehicle_id", offer.vehicle_id)
    body.append("title", offer.title)
    body.append("description", offer.description)
    body.append("price", offer.price.toString())
    body.append("contact", offer.contact)
    body.append("zip_code", offer.zip_code)
    body.append("picture", offer.picture)
    setRequisitionResult(undefined)

    try {
      const request = await ApiServer.post("/offers", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      navigate.push("/conta?after=createOffer")
    } catch (error: any) {
      setRequisitionResult({
        messages: Object.values(error.response.data.errors).flat(2),
        status: error.response.status,
      })
    }
  }

  const handleStepAlreadyDone = (stepToCheck: StpAlreadyDone | "all") => {
    const CLASS_IF_FILLED = "bg-green-400"
    const CLASS_IF_EMPTY = "bg-gray-200"
    const checkFill = (inputs: unknown[]): string => {
      return inputs.every((input) => input) ? CLASS_IF_FILLED : CLASS_IF_EMPTY
    }

    const alreadyDone = {
      greenIfBrandModelCategoryIsFilled: checkFill([
        offer.brand_id && offer.category_id && offer.vehicle_id,
      ]),
      greenIfTitleDescriptionPriceIsFilled: checkFill([
        offer.title && offer.description && offer.price,
      ]),
      greenIfContactZipCodeIsFilled: checkFill([
        offer.contact && offer.zip_code,
      ]),
    }

    if (stepToCheck === "all") return alreadyDone

    return alreadyDone[stepToCheck] ?? CLASS_IF_EMPTY
  }

  const checkIfAreAllFilled = () => {
    return Object.values(handleStepAlreadyDone("all")).every((groupOfSteps) =>
      groupOfSteps.includes("green")
    )
  }

  const handleSteps = (stage: Stp) => {
    const stepsComponents = {
      first: (
        <Tab>
          <div className="flex flex-col w-full gap-5">
            <div className="gap-3 flex">
              <div className="w-1/2">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="category"
                  value="qual a marca..."
                />
                <div className="gap-5 bg-white p-2 border mt-2 rounded-lg">
                  <div
                    style={{
                      padding: 3,
                    }}
                  >
                    <TextInput
                      list="brands"
                      name="brands"
                      helperText="buscar marca"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setKeywordBrand(e.target.value)
                      }
                    />
                    <div className="h-40 overflow-auto mt-2">
                      {brandsList &&
                        brandsFiltered()?.map((brand: Brand) => {
                          return (
                            <div
                              key={brand.id}
                              onClick={() =>
                                setVehiclesList([...brand.vehicles])
                              }
                            >
                              <Dropdown.Item>{brand.name}</Dropdown.Item>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="category"
                  value="e o modelo?"
                />
                <div className="gap-5 bg-white p-2 border mt-2 rounded-lg">
                  <div
                    style={{
                      padding: 3,
                    }}
                  >
                    <TextInput
                      list="vehicles"
                      name="vehicles"
                      helperText="buscar modelo"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setKeywordVehicle(e.target.value)
                      }
                    />
                    <div className="h-40 overflow-auto mt-2">
                      {vehiclesList &&
                        carsFiltered()?.map((vehicle: Vehicle) => {
                          return (
                            <div
                              className={`${
                                offer.vehicle_id === vehicle.id
                                  ? "border border-purple-600 rounded"
                                  : ""
                              }`}
                              key={vehicle.id}
                              onClick={() =>
                                setOffer({
                                  ...offer,
                                  brand_id: vehicle.brand_id,
                                  category_id: vehicle.category_id,
                                  vehicle_id:
                                    vehicle.id === offer.vehicle_id
                                      ? ""
                                      : vehicle.id,
                                })
                              }
                            >
                              <Dropdown.Item>
                                <div>
                                  <p className="mb-1">{`${vehicle.name} ${vehicle.year}`}</p>
                                  <hr />
                                  <small>{`${vehicle.doors}p | ${Number(
                                    vehicle.liters
                                  ).toFixed(1)} ${vehicle.cylinders}cl.  | ${
                                    vehicle.horsepower
                                  }cv`}</small>
                                </div>
                              </Dropdown.Item>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="select">
              <Label
                className="text-red-300 font-extrabold"
                htmlFor="category"
                value="agora a categoria"
              />
              <Select
                id="categories"
                className="mt-2"
                required={true}
                value={offer.category_id}
                onChange={(e) =>
                  setOffer({ ...offer, category_id: e.target.value })
                }
              >
                <option disabled key={0}>
                  selecione a categoria do seu auto
                </option>
                {categories?.map((category: Category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </Select>
            </div>
            <Button type="button" onClick={() => setActualStep("second")}>
              avançar
            </Button>
          </div>
        </Tab>
      ),
      second: (
        <Tab>
          <div
            onSubmit={(e: any) => e.preventDefault()}
            className="flex flex-col gap-5 w-full"
          >
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="title"
                  value="título do anúncio"
                />
              </div>
              <TextInput
                id="title"
                type="text"
                placeholder=""
                value={offer.title}
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOffer({ ...offer, title: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="description"
                  value="descrição"
                />
              </div>
              <TextInput
                id="description"
                type="text"
                value={offer.description}
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOffer({ ...offer, description: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="price"
                  value="preço"
                />
              </div>
              <TextInput
                id="price"
                type="text"
                value={offer.price}
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setOffer({ ...offer, price: e.target.value })
                }}
              />
            </div>
            <Button type="button" onClick={() => setActualStep("third")}>
              avançar
            </Button>
          </div>
        </Tab>
      ),
      third: (
        <Tab>
          <div
            onSubmit={(e: any) => e.preventDefault()}
            className="flex flex-col gap-5 m-auto"
          >
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="zip_code"
                  value="cep"
                />
              </div>
              <TextInput
                id="zip_code"
                type="text"
                value={offer.zip_code}
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOffer({ ...offer, zip_code: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-red-300 font-extrabold"
                  htmlFor="contact"
                  value="telefone c/ DDD"
                />
              </div>
              <TextInput
                id="contact"
                type="text"
                placeholder=""
                value={offer.contact}
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOffer({ ...offer, contact: e.target.value })
                }
              />
            </div>
            <Button type="button" onClick={() => setActualStep("fourth")}>
              avançar
            </Button>
          </div>
        </Tab>
      ),
      fourth: (
        <Tab>
          <div
            onSubmit={(e: any) => e.preventDefault()}
            className="flex flex-col gap-5 m-auto"
          >
            {checkIfAreAllFilled() ? (
              <div className="mb-2 block">
                {
                  <SimpleFileUpload
                    apiKey="9c124e6cfcc1638f4a5c54d8a5429fc8"
                    onSuccess={(url: string) => uploadedUrl(url)}
                    preview="true"
                    resizeWidth="500"
                    data-accepted="image/*"
                    data-maxFileSize="1"
                  />
                }
              </div>
            ) : (
              <div className="items-center gap-x-3 border p-3 rounded">
                <h3>
                  preencha todos os campos para poder escolher sua imagem :)
                </h3>
                <div className="flex gap-x-3 items-center">
                  <span className="text-yellow-200 text-lg">⚠</span>
                  <small className="text-white">
                    seu anúncio será enviado automaticamente após o envio da
                    imagem, que deve ter no máximo 1MB
                  </small>
                </div>
              </div>
            )}
          </div>
        </Tab>
      ),
    }
    return stepsComponents[stage]
  }

  return (
    <div className="lg:w-5/6 container md:justify-evenly px-0 lg:px-40 m-auto font-bold">
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-20 pb-24 mx-auto flex flex-wrap">
          <div className="m-auto">
            <Feedback
              messages={requisitionResult?.messages}
              status={requisitionResult?.status}
            />
          </div>
          <div className="lg:flex flex-wrap w-full text-blue-600">
            <div className="lg:w-2/5 md:pr-10 md:py-3">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div
                    className={`h-full w-1 ${handleStepAlreadyDone(
                      "greenIfBrandModelCategoryIsFilled"
                    )} pointer-events-none`}
                  ></div>
                </div>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${handleStepAlreadyDone(
                    "greenIfBrandModelCategoryIsFilled"
                  )}  inline-flex items-center justify-center text-black relative z-10`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div
                  className="flex-grow pl-4 cursor-pointer hover:ml-1 transition-all"
                  onClick={() => setActualStep("first")}
                >
                  <h2 className="title-font text-sm text-gray-300 mb-1 font-extrabold tracking-wider">
                    Marca, modelo e categoria
                  </h2>
                  <p className="leading-relaxed">
                    Busque o modelo correspondente ao seu carro e em qual
                    categoria seu anúncio se encaixa: sedãs, hatches, etc.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div
                    className={`h-full w-1 ${handleStepAlreadyDone(
                      "greenIfTitleDescriptionPriceIsFilled"
                    )} pointer-events-none`}
                  ></div>
                </div>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${handleStepAlreadyDone(
                    "greenIfTitleDescriptionPriceIsFilled"
                  )}  inline-flex items-center justify-center text-black relative z-10`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div
                  className="flex-grow pl-4 cursor-pointer hover:ml-1 transition-all"
                  onClick={() => setActualStep("second")}
                >
                  <h2 className="title-font text-sm text-gray-300 mb-1 font-extrabold tracking-wider">
                    Informações sobre o carro
                  </h2>
                  <p className="leading-relaxed">
                    O carro está em bom estado? Documento em dia? Há algo a
                    fazer? A hora de dizer isso é agora!
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div
                    className={`h-full w-1 ${handleStepAlreadyDone(
                      "greenIfContactZipCodeIsFilled"
                    )} pointer-events-none`}
                  ></div>
                </div>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${handleStepAlreadyDone(
                    "greenIfContactZipCodeIsFilled"
                  )}  inline-flex items-center justify-center text-black relative z-10`}
                >
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="Layer 4" id="Layer_4">
                      <path d="M9,5V27H23V5Zm2,5.53H21v9.09H11ZM21,7V8.53H11V7ZM11,25V21.63H21V25Z" />
                      <rect height="2" width="1.92" x="15.08" y="22.33" />
                    </g>
                  </svg>
                </div>
                <div
                  className="flex-grow pl-4 cursor-pointer hover:ml-1 transition-all"
                  onClick={() => setActualStep("third")}
                >
                  <h2 className="title-font text-sm text-gray-300 mb-1 font-extrabold tracking-wider">
                    Dados para contato e local
                  </h2>
                  <p className="leading-relaxed">
                    Informe aqui telefone, com DDD, e o CEP de onde o carro
                    está, para que o comprador lhe contacte
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center"></div>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${handleStepAlreadyDone(
                    "greenIfFileIsFilled"
                  )} inline-flex items-center justify-center text-white relative z-10`}
                >
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="Layer 6" id="Layer_6">
                      <path d="M5,5V27H27V5ZM25,7V17.83l-3.5-3.25-5.71,6.33L12,18.83,7,23.65V7ZM8.49,25l3.86-3.71,3.86,2.13,5.41-6L25,20.56V25Z" />
                      <rect height="2" width="1.81" x="11.06" y="15" />
                    </g>
                  </svg>
                </div>
                <div
                  className="flex-grow pl-4 cursor-pointer hover:ml-1 transition-all"
                  onClick={() => setActualStep("fourth")}
                >
                  <h2 className="title-font text-sm text-gray-300 mb-1 font-extrabold tracking-wider">
                    Fotos
                  </h2>
                  <p className="leading-relaxed">
                    Um anúncio com foto vende até 3x mais rápido do que anúncios
                    sem foto. Capriche nas fotos! 📸🎇
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-auto lg:w-3/5 object-cover object-center">
              {handleSteps(actualStep)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferNewFlow
