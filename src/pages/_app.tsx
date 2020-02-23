import App, { AppContext } from 'next/app';
import React from 'react';

import styles from './_app.scss';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <section className={styles.container}>
        <Component {...pageProps} />
      </section>
    );
  }
}
