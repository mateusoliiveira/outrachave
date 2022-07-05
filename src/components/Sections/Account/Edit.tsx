import { Label, TextInput } from "flowbite-react"
import React, { ChangeEvent, useState } from "react"
import { hideEmail } from "../../../_utils"

const Edit = ({ user }: any) => {
  const [userData, setUserData] = useState<any>(user)
  return (
    <div className="col lg:flex">
      <div className="flex flex-col lg:py-3 -mb-10 lg:pl-12 pl-5 pt-10 rounded-md my-3 lg:text-left bg-white w-full lg:bg-transparent lg:w-1/2 items-start">
        <div className="flex flex-col mb-10 lg:items-start items-center">
          <div className="flex-grow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className="text-gray-200 text-lg title-font font-medium mb-3">
                me atualizar
              </h2>
            </div>
            <div className="flex md:flex-col">
              <div className="flex-col">
                <div className="mb-2 block">
                  <div>
                    <Label
                      className="text-white"
                      htmlFor="nameEdit"
                      value="seu novo nome"
                    />
                  </div>
                  <TextInput
                    id="nameEdit"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    value={user.name}
                    type="text"
                  />
                </div>
                <div className="mb-2 block">
                  <div>
                    <Label
                      className="text-white"
                      htmlFor="emailEdit"
                      value="seu novo nome"
                    />
                  </div>
                  <TextInput
                    id="emailEdit"
                    defaultValue={`${hideEmail(user.email)}`}
                    type="text"
                    disabled={true}
                  />
                </div>
                <a className="cursor-pointer block w-max border rounded-md p-1 px-3 mt-3">
                  atualizar novos dados
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-10 lg:items-start items-center">
          <div className="flex-grow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-300 text-lg title-font font-medium mb-3">
                favoritos
              </h2>
            </div>
            <div className="flex-col">
              <div className="mb-2 block">
                <div>
                  <Label
                    className="text-white"
                    htmlFor="oldPass"
                    value="sua senha atual"
                  />
                </div>
                <TextInput id="oldPass" type="password" />
              </div>
              <div className="mb-2 block">
                <div>
                  <Label
                    className="text-white"
                    htmlFor="newPass"
                    value="sua nova senha"
                  />
                </div>
                <TextInput id="newPass" type="password" />
              </div>
              <div className="mb-2 block">
                <div>
                  <Label
                    className="text-white"
                    htmlFor="confirmNewPass"
                    value="confirme a nova senha"
                  />
                </div>
                <TextInput id="confirmNewPass" type="password" />
              </div>
              <a className="cursor-pointer block w-max border rounded-md p-1 px-3 mt-3">
                salvar nova senha
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
