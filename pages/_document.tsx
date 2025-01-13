import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Educational fruit and vegetable catching game for kids" />
          <meta name="theme-color" content="#87CEEB" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument