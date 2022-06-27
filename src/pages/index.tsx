import { GetServerSideProps, NextPage } from "next"
import Container from "../components/Structure/Container"
import Hero from "../components/Hero"
import FindCars from "../components/Sections/Home/FindCars"
import ClassifiedForYour from "../components/Sections/Home/ClassifiedForYour"
import { Brand } from "../types/Brand"
import { ApiClient } from "../_services"
import { Offer } from "../types/Offer"

type IndexProps = {
  brands: Brand[]
  offers: Offer[]
}

const Index: NextPage<IndexProps> = ({
  brands,
  offers,
}: {
  brands: Brand[]
  offers: Offer[]
}) => {
  return (
    <Container>
      <Hero />
      <FindCars brands={brands} />
      <ClassifiedForYour offers={offers} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const brands = await ApiClient.get("/brands")
  const offers = await ApiClient.get("/offers")
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=360, stale-while-revalidate=3600"
  )
  if (!brands || !offers) {
    return { notFound: true }
  }
  return {
    props: {
      brands: brands.data,
      offers: offers.data,
    },
  }
}

export default Index
