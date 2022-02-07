import Head from 'next/head';
import Layout from '../components/Layout';

export default function Collection() {
  return (
    <div>
      <Layout>
        <Head>
          <title>N.F.T. Collection</title>
          <meta
            name="description"
            content="Collection of the best NFTs on the market"
          />
        </Head>

        <h1>Collection</h1>
      </Layout>
    </div>
  );
}
