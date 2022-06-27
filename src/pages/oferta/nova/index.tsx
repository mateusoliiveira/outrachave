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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const brands = await ApiClient.get("/brands/vehicles")
  const categories = await ApiClient.get("/categories")
  const { token }: any = await getToken({ req })
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=360, stale-while-revalidate=3600"
  )
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
