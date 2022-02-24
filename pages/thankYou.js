import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function thankYou() {
  return (
    <Layout>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Thank you for your order" />
      </Head>
      <div>
        <h1>Thank you for your order</h1>
      </div>
    </Layout>
  );
}
