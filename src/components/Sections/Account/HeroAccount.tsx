import { Tabs } from "flowbite-react"
import React from "react"
import Profile from "./Profile"
import Published from "./Published"
import Tab from "../../Tab"
import Edit from "./Edit"

const HeroAccount = ({ user, offers }: any) => {
  return (
    <div
      className="lg:px-32 container md:justify-evenly m-auto mt-10 font-bold"
      style={{ color: "#E34C67" }}
    >
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item active={true} title="Perfil">
          <Tab>
            <Profile user={user} />
          </Tab>
        </Tabs.Item>
        <Tabs.Item title="Editar minha conta">
          <Tab>
            <Edit user={user} />
          </Tab>
        </Tabs.Item>
        <Tabs.Item title="Meus Anúncios (em breve)" disabled={true}>
          <Tab>
            <Published offers={offers} />
          </Tab>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  )
}

export default HeroAccount
