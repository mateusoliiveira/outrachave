import { GetServerSideProps, NextPage } from "next"
import Container from "../../../components/Structure/Container"
import { Brand } from "../../../types/Brand"
import { ApiClient } from "../../../services"
import { Offer } from "../../../types/Offer"
import OfferPublished from "../../../components/Sections/Offer/Published/OfferPublished"

const OfferPage: NextPage = ({ offer }: any) => {
  return (
    <Container>
      <OfferPublished offer={offer} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const offer = await ApiClient.get(`/offers/${query.id}`)
  console.log(offer)
  return {
    props: {
      offer: offer.data,
    },
  }
}

export default OfferPage
