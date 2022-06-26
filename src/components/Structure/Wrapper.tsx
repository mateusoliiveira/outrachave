import React from "react"
import NavbarComponent from "./Navbar/Navbar"

type ReactChildren = {
  children: JSX.Element
}

const Wrapper = ({ children }: ReactChildren) => {
  return (
    <main className="bg-image min-h-100 min-h-screen globalFont">
      <NavbarComponent />
      <div className="mt-5 bg-gray-900 m-auto text-xs justify-center text-center text-white">
        site criado para fins de estudo sobre desenvolvimento web, todos os
        anúncios são fictícios e as imagens de seus respectivos donos
      </div>
      <div className="bg-gray-900 m-auto text-xs justify-center text-center text-white">
        marcas e modelos disponíveis para busca/publicação: marcas: Volkswagen e
        BMW | modelos: T-Cross, Voyage, Gol, 320i e 318i
      </div>
      {children}
    </main>
  )
}

export default Wrapper
