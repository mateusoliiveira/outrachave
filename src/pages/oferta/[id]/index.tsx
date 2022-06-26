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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const offer = await ApiClient.get(`/offers/${query.id}`)
  const location = await fetch(
    `https://viacep.com.br/ws/${offer.data.zip_code}/json/`
  )
  const locationJSON = await location.json()
  return {
    props: {
      offer: offer.data,
      locate: locationJSON,
    },
  }
}

export default OfferPage
