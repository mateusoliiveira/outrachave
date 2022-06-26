import App from "next/app"
import Head from "next/head"
import React from "react"
import Wrapper from "./../components/Structure/Wrapper"
import "../styles/index.css"
import { SessionProvider } from "next-auth/react"

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
    console.log(this.props)
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>mynewauto</title>
          </Head>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </React.Fragment>
      </SessionProvider>
    )
  }
}
