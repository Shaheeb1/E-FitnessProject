import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from'next/document';
import React from 'react';


export default class MyDocument extends Document{
  render() {
    return (
      <Html lang="en">
          <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600&display=swap"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
      </Html>
    );
  }

}

MyDocument.getInitialProps = async (ctx) => {
  const s = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => (props) => s.collect(<App {...props} />),
    });
  };
  const intialProps = await Document.getInitialProps(ctx);
  return {
    ...intialProps,
    styles: [
      ...React.Children.toArray(intialProps.styles), 
      s.getStyleElement(),
    ],
  };
};