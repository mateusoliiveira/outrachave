import { NextPage } from "next"
import Container from "../components/Structure/Container"
import Hero from "../components/Hero"

const Custom404: NextPage = () => {
  return (
    <Container>
      <Hero />
      <div className=" m-auto text-xs justify-center text-center text-white">
        <h1>
          {
            "Não encontrado, assim o carrinho aí de cima correrá até o infinito!"
          }
        </h1>
      </div>
    </Container>
  )
}

export default Custom404
