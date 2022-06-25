import { NextPage } from "next"
import Container from "../components/Structure/Container"
import RegisterForm from "../components/Sections/Register/RegisterForm"
import Hero from "../components/Hero"

const Register: NextPage = () => {
  return (
    <Container>
      <Hero />
      <RegisterForm />
    </Container>
  )
}

export default Register
