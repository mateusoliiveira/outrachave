import React from "react"
import NavbarComponent from "./Navbar/Navbar"

type ReactChildren = {
  children: JSX.Element
}

const Wrapper = ({ children }: ReactChildren) => {
  return (
    <main className="bg-image min-h-100 min-h-screen globalFont">
      <NavbarComponent />
      <div className="bg-gray-900 m-auto text-xs justify-center text-center text-white">
        site criado para fins de estudo sobre desenvolvimento web, todos os
        anúncios são fictícios e as imagens de seus respectivos donos
      </div>
      {children}
    </main>
  )
}

export default Wrapper
