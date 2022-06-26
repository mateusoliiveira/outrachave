import { GetServerSideProps, NextPage } from "next"
import { getToken } from "next-auth/jwt"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Feedback from "../../components/Feedback"
import HeroAccount from "../../components/Sections/Account/HeroAccount"
import Container from "../../components/Structure/Container"
import { ApiClient } from "../../_services"

const Account: NextPage = ({ user }: any) => {
  console.log(user)
  const [afterCreateOffer, setAfterCreateOffer] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    if (router.query.after) setAfterCreateOffer(true)
  }, [])
  return (
    <Container>
      <div className="mt-10">
        {afterCreateOffer ? (
          <Feedback
            messages={["Você criou um novo anúncio :) Boa sorte!"]}
            status={201}
          />
        ) : (
          ""
        )}
      </div>
      <HeroAccount user={user} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  const { token }: any = getToken({ req })
  const { data } = await ApiClient.get("/users/data/offers", {
    headers: { Authorization: "Bearer " + token },
  })
  console.log(data)
  return {
    props: {
      user: data,
    },
  }
}

export default Account
