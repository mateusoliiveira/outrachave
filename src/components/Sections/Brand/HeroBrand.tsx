import React from "react"

const HeroBrand = ({ brandName }: any) => {
  return (
    <div className="px-20">
      <div className="text-center">
        <h1 style={{ color: "#F77365" }} className="text-3xl font-bold">
          procurando por {brandName}
        </h1>
      </div>
    </div>
  )
}

export default HeroBrand
