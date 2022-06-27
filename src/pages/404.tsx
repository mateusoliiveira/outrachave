import { NextPage } from "next"
import Container from "../components/Structure/Container"
import Hero from "../components/Hero"

const Custom404: NextPage = () => {
  return (
    <Container>
      <Hero />
      <h1>{"Não encontrado, tente buscar por outros termos"}</h1>
    </Container>
  )
}

export default Custom404
