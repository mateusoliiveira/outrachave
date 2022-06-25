import React from "react"

type ReactChildren = {
  children: JSX.Element | JSX.Element[]
}

const Container = ({ children }: ReactChildren) => {
  return <section className="h-auto">{children}</section>
}

export default Container
