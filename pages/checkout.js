import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

export default function Checkout() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Checkout</title>
          <meta name="description" content="Shipping and payment details" />
        </Head>
        <section>
          <h1>Shipping and payment details</h1>
        </section>
        <Footer />
      </Layout>
    </div>
  );
}
