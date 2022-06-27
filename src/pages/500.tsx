import { NextPage } from "next"
import Container from "../components/Structure/Container"
import Hero from "../components/Hero"

const Custom500: NextPage = () => {
  return (
    <Container>
      <Hero />
      <h1>{"Ops, erro interno aqui com a gente:(, tente novamente depois"}</h1>
    </Container>
  )
}

export default Custom500
