import { GetServerSideProps, NextPage } from "next"
import { getToken } from "next-auth/jwt"
import OfferNewFlow from "../../../components/Sections/Offer/OfferNewFlow"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"

const OfferNew: NextPage = ({ brands, categories, token }: any) => {
  return (
    <Container>
      <OfferNewFlow brands={brands} categories={categories} token={token} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const brands = await ApiClient.get("/brands/vehicles")
  const categories = await ApiClient.get("/categories")
  const { token }: any = await getToken({ req })

  if (!brands || !categories) {
    return { notFound: true }
  }

  return {
    props: {
      brands: brands.data,
      categories: categories.data,
      token,
    },
  }
}

export default OfferNew
