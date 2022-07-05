import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Feedback from "../../../components/Feedback"
import HeroAccount from "../../../components/Sections/Account/HeroAccount"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const { data } = await ApiClient.get("/users", {
    headers: { ...req.headers },
  })
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=120"
  )
  if (!data) {
    return { notFound: true }
  }
  return {
    props: {
      user: data.user,
    },
  }
}

export default Account
