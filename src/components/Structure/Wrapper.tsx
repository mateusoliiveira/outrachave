import React from "react"
import NavbarComponent from "./Navbar/Navbar"

type ReactChildren = {
  children: JSX.Element
}

const Wrapper = ({ children }: ReactChildren) => {
  return (
    <main className="bg-image min-h-100 min-h-screen globalFont">
      <NavbarComponent />
      {children}
    </main>
  )
}

export default Wrapper
