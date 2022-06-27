import { GetServerSideProps, NextPage } from "next"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"
import OfferPublished from "../../../components/Sections/Offer/Published/OfferPublished"

const OfferPage: NextPage = ({ offer, locate }: any) => {
  return (
    <Container>
      <OfferPublished offer={offer} locate={locate} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { data } = await ApiClient.get(`/offers/${query.id}`)
  const location = await fetch(
    `https://viacep.com.br/ws/${data.zip_code}/json/`
  )
  const locationJSON = await location.json()
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=180"
  )
  if (!data) {
    return { notFound: true }
  }
  return {
    props: {
      offer: data,
      locate: locationJSON,
    },
  }
}

export default OfferPage
