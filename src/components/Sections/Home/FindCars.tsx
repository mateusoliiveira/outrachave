import { Button, Dropdown, TextInput } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import React, { ChangeEvent, useState } from "react"
import { Brand } from "../../../types/Brand"

const FindCars = (props: any) => {
  const [brandsList, setBrandsList] = useState<Brand[]>(props.brands)
  const [keywordBrand, setKeywordBrand] = useState<string>("")
  const [keywordModel, setKeywordModel] = useState<string>("")

  const allOrFiltered = () => {
    if (keywordBrand.trim() !== "") {
      return brandsList.filter((brand) =>
        brand.name.toLowerCase().includes(keywordBrand.toLowerCase())
      )
    }
    return brandsList
  }

  const keyDownCheck = (e: any) => {
    var e = window.event || e
    var key = e.keyCode
    if (key == 32) {
      e.preventDefault()
    }
  }

  const checkWhitespace = (event: any) => {
    var data = event.clipboardData.getData("text/plain")
    var isNullOrContainsWhitespace =
      !data || data.length === 0 || /\s/g.test(data)

    if (isNullOrContainsWhitespace) {
      event.preventDefault()
    }
  }

  return (
    <div className="pt-5">
      <h2
        className="text-4xl pb-10 text-center font-bold"
        style={{ color: "#F77365" }}
      >
        vamos começar?
      </h2>
      <div className="w-50 flex justify-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="md:flex justify-content-center gap-5">
            <div className="mb-20 md:mb-10 lg:mb-0">
              <TextInput
                required={true}
                helperText="busque por modelo de automóvel"
                placeholder="Argo 1.6"
                onKeyDown={(e) => keyDownCheck(e)}
                onPaste={(e) => checkWhitespace(e)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeywordModel(
                    `${
                      e.target.value.split(e.target.value[1])[0].toUpperCase() +
                      e.target.value.slice(1)
                    }`
                  )
                }
              />
              <div className="pt-2 absolute">
                <Button color="dark" disabled={!keywordModel}>
                  <Link href={`/busca/veiculo?title=${keywordModel}`}>
                    <div className="font-bold">buscar</div>
                  </Link>
                </Button>
              </div>
            </div>
            <Dropdown
              label="ou busque por marcas"
              color="light"
              size="md"
              style={{
                padding: 3,
              }}
            >
              <TextInput
                list="brands"
                name="brands"
                helperText="busque pela marca do automóvel"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeywordBrand(e.target.value)
                }
              />
              <div className="h-20 overflow-auto">
                {brandsList &&
                  allOrFiltered().map((brand: Brand) => {
                    return (
                      <Link key={brand.id} href={`/busca/marca?id=${brand.id}`}>
                        <div>
                          <Dropdown.Item>
                            <div className="flex gap-x-3">
                              <Image
                                src={brand.picture}
                                width="20rem"
                                height="20rem"
                                className=""
                              />
                              <span>{brand.name}</span>
                            </div>
                          </Dropdown.Item>
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </Dropdown>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FindCars
