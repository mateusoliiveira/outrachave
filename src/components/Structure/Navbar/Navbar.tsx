import { Button, Navbar } from "flowbite-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

const NavbarComponent = () => {
  const authed = useSession().data?.user
  return (
    <Navbar fluid={true} className="bg-transparent py-9 pt-5 px-10 xl:px-80">
      <Navbar.Brand>
        <Link href="/">
          <div className="self-center text-4xl cursor-pointer">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-pink-600">
              outrachave
            </span>
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {authed ? (
          <>
            <Button gradientDuoTone="purpleToBlue">
              <Link href="/oferta/nova">
                <div className="font-bold">vender</div>
              </Link>
            </Button>
            <Button gradientDuoTone="pinkToOrange">
              <Link href="/conta">
                <div className="font-bold">minha conta</div>
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button gradientDuoTone="greenToBlue">
              <Link href="/login">
                <div className="font-bold">entrar</div>
              </Link>
            </Button>
            <Button gradientDuoTone="pinkToOrange">
              <Link href="/register">
                <div className="font-bold">vender meu auto</div>
              </Link>
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
