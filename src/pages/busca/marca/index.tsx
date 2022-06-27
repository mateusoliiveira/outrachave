import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import CarsForSale from "../../../components/CarsForSale"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"

const SearchBrand: NextPage = ({ query, cars }: any) => {
  return (
    <Container>
      <CarsForSale query={query} cars={cars} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, res } = context
  const { data } = await ApiClient.get(`/offers/by/brand/${query.id}`)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=180"
  )
  if (!data || !query.id) {
    return { notFound: true }
  }
  return {
    props: {
      cars: data.offers,
      query: data.name,
    },
  }
}

export default SearchBrand
