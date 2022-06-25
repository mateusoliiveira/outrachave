import { Button, Label, TextInput } from "flowbite-react"
import React, { ChangeEvent, useState } from "react"
import { ApiClient } from "../../../services"
import { CreateCredential } from "../../../types/CreateCredential"
import Feedback from "../../Feedback"

const RegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [requisitionResult, setRequisitionResult] = useState<any>(undefined)
  const [user, setUser] = useState<CreateCredential>({
    email: "",
    name: "",
    password: "",
  })

  const handleRegister = async () => {
    setRequisitionResult(undefined)
    try {
      const request = await ApiClient.post("/guests/register", user)
      return setRequisitionResult({
        messages: [request.data.message],
        status: request.status,
      })
    } catch (error: any) {
      setRequisitionResult({
        messages: Object.values(error.response.data.errors).flat(2),
        status: error.response.status,
      })
    }
  }

  return (
    <form className="flex flex-col gap-4 m-auto w-4/5 lg:w-1/2 py-3">
      {
        <Feedback
          messages={requisitionResult?.messages}
          status={requisitionResult?.status}
        />
      }
      <div className="">
        <div className="mb-2 block">
          <Label
            className="text-red-300"
            htmlFor="email"
            value="seu melhor email"
          />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="seu@email.com"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            className="text-red-300"
            htmlFor="fullname"
            value="nome completo"
          />
        </div>
        <TextInput
          id="fullname"
          type="text"
          placeholder="joao silva"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, name: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between gap-2">
        <div className="w-1/2">
          <div className="mb-2 block">
            <Label className="text-red-300" htmlFor="pass" value="sua senha" />
          </div>
          <TextInput
            helperText="no mínimo 6 caracteres"
            id="pass"
            type="password"
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>
        <div className="w-1/2">
          <div className="mb-2 block">
            <Label
              className="text-red-300"
              htmlFor="confPass"
              value="confirme sua senha"
            />
          </div>
          <TextInput
            id="confPass"
            type="password"
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>
      </div>
      <Button
        type="button"
        disabled={!Object.values(user).every((v) => v.trim() !== "")}
        onClick={() => handleRegister()}
      >
        cadastrar
      </Button>
    </form>
  )
}

export default RegisterForm
