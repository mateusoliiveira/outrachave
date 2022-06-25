import { NextPage } from "next"
import Container from "../components/Structure/Container"
import LoginForm from "../components/Sections/Login/LoginForm"
import Hero from "../components/Hero"

const Login: NextPage = () => {
  return (
    <Container>
      <Hero />
      <LoginForm />
    </Container>
  )
}

export default Login
