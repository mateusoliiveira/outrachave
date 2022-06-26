import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Feedback from "../../components/Feedback"
import HeroAccount from "../../components/Sections/Account/HeroAccount"
import Container from "../../components/Structure/Container"
import { ApiClient } from "../../_services"

const Account: NextPage = ({ user }: any) => {
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
      <HeroAccount user={user} offers={[]} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { data } = await ApiClient.get("/users/data", {
    headers: { ...context.req.headers },
  })
  return {
    props: {
      user: data,
    },
  }
}

export default Account
