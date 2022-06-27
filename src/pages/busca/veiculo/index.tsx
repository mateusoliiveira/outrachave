import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import CarsForSale from "../../../components/CarsForSale"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"

const SearchVehicle: NextPage = ({ query, cars }: any) => {
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
  const { data } = await ApiClient.get(`/offers/by/vehicle/${query.title}`)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=180"
  )
  if (!data) {
    return { notFound: true }
  }
  return {
    props: {
      cars: data,
      query: query.title,
    },
  }
}

export default SearchVehicle
