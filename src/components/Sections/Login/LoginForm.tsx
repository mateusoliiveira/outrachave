import { Button, Label, TextInput } from "flowbite-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { LoginCredential } from "../../../types/LoginCredential"
import Feedback from "../../Feedback"
import { useRouter } from "next/router"

const LoginForm = () => {
  const router = useRouter()
  const [requisitionResult, setRequisitionResult] = useState<any>({})
  const [user, setUser] = useState<LoginCredential>({
    email: "",
    password: "",
  })

  const handleLogin = async () => {
    try {
      setRequisitionResult(undefined)
      await signIn("credentials", { ...user })
    } catch (error: any) {
      setRequisitionResult({
        messages: Object.values(error.response.data.errors).flat(2),
        status: error.response.status,
      })
    }
  }

  const catchLoginFailedAttempt = () => router.query.error

  useEffect(() => {
    const getErrorIfExists = catchLoginFailedAttempt()
    if (
      typeof getErrorIfExists === "string" &&
      getErrorIfExists !== undefined
    ) {
      setRequisitionResult({
        messages: ["Usuário ou senha incorretos"],
        status: Number(getErrorIfExists.match(/\d+/g)),
      })
    }
  }, [])

  return (
    <form
      onSubmit={(e: any) => e.preventDefault()}
      className="flex flex-col gap-4 m-auto w-4/5 lg:w-1/3 py-3"
    >
      {
        <Feedback
          messages={requisitionResult?.messages}
          status={requisitionResult?.status}
        />
      }
      <div>
        <div className="mb-2 block">
          <Label className="text-red-300" htmlFor="email" value="email" />
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
          <Label className="text-red-300" htmlFor="pass" value="senha" />
        </div>
        <TextInput
          id="pass"
          type="password"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
        />
      </div>
      <Button
        type="button"
        disabled={!Object.values(user).every((v) => v.trim() !== "")}
        onClick={() => handleLogin()}
      >
        entrar
      </Button>
    </form>
  )
}

export default LoginForm
