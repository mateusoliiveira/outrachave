import { GetServerSideProps, NextPage } from "next"
import Container from "../../../components/Structure/Container"
import { ApiClient } from "../../../_services"
import OfferPublished from "../../../components/Sections/Offer/Published/OfferPublished"

const OfferPage: NextPage = ({ offer }: any) => {
  return (
    <Container>
      <OfferPublished offer={offer} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { data } = await ApiClient.get(`/offers/${query.id}`)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=180"
  )
  if (!data || !query) {
    return { notFound: true }
  }
  return {
    props: {
      offer: data,
    },
  }
}

export default OfferPage
