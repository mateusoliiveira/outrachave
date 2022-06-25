import React from "react"

type ScrollCars = {
  children: JSX.Element | JSX.Element[]
}

const ScrollCars = ({ children }: ScrollCars) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-screen overflow-y-scroll scroll-cars pr-1">
      {children}
    </div>
  )
}

export default ScrollCars
