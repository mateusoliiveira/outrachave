import App from "next/app"
import Head from "next/head"
import React from "react"
import Wrapper from "./../components/Structure/Wrapper"
import "../styles/index.css"
import { SessionProvider } from "next-auth/react"
import { formatToBRL } from "../_utils"

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>
              {pageProps.offer
                ? `${pageProps.offer.title} | ${formatToBRL(
                    pageProps.offer.price
                  )}`
                : "outrachave"}
            </title>
          </Head>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </React.Fragment>
      </SessionProvider>
    )
  }
}
