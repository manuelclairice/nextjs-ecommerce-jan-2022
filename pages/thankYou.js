import Head from 'next/head';
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
