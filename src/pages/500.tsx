import { NextPage } from "next"
import Container from "../components/Structure/Container"
import Hero from "../components/Hero"

const Custom500: NextPage = () => {
  return (
    <Container>
      <Hero />
      <div className=" m-auto text-xs justify-center text-center text-white">
        <h1>
          {"Oooops, erro interno aqui com a gente. Desculpe, e já voltamos!"}
        </h1>
      </div>
    </Container>
  )
}

export default Custom500
