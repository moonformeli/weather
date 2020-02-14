import axios from 'axios';
import { NextApiRequest, NextPage } from 'next';
import React from 'react';

import styles from './index.scss';

interface IAppProps {
  stars: number;
  userAgent: string;
}

const App: NextPage<IAppProps> = ({ stars, userAgent }) => (
  <h1 className={styles.container}>
    Hello world {stars}, {userAgent}
  </h1>
);

App.getInitialProps = async ({ req }): Promise<any> => {
  const res = await axios('https://api.github.com/repos/zeit/next.js', {
    method: 'get'
  });
  const userAgent = req?.headers['user-agent'];
  console.dir(res.data);
  return { stars: res.data.stargazers_count, userAgent };
};

export default App;
