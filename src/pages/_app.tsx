import ReactDOM from "react-dom"
import Router from "next/router"
import PageChangeComponent from "../components/Structure/PageChange/PageChange"
import App from "next/app"
import Head from "next/head"
import React from "react"
import Wrapper from "./../components/Structure/Wrapper"
import "../styles/index.css"
import { SessionProvider } from "next-auth/react"

Router.events.on("routeChangeStart", () => {
  ReactDOM.render(
    <PageChangeComponent />,
    document.getElementById("splash-loading")
  )
})

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
