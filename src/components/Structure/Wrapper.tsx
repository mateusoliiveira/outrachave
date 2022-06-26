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
        modelos disponíveis para busca/publicação: Volkswagen e BMW, modelos
        disponíveis para busca/publicação: T-Cross, Voyage, Gol, 320i e 318i
      </div>
      {children}
    </main>
  )
}

export default Wrapper
