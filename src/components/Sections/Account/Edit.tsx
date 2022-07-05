import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { formatToBRL, hideData, hideEmail } from "../../../_utils"

const Edit = ({ user }: any) => {
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
                minhas informações
              </h2>
            </div>
            <p className="leading-relaxed text-base">{hideData(user.name)}</p>
            <p className="leading-relaxed text-base">{hideEmail(user.email)}</p>
            <a className="mt-3 text-indigo-500 inline-flex items-center">
              editar dados
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <a
              className="cursor-pointer block w-max border rounded-md p-1 px-3 mt-3"
              onClick={() => signOut()}
            >
              sair
            </a>
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
            <p className="leading-relaxed text-base">
              {"você favoritou X autos (em breve)"}
            </p>
            <a className="mt-3 text-indigo-500 inline-flex items-center">
              ver todos
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit