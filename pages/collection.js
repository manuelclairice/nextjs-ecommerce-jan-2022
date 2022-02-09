import Head from 'next/head';
import Layout from '../components/Layout';

const products = [
  { id: 1, name: '#142', price: '15000 euro' },
  { id: 3, name: '#314', price: '15000 euro' },
  { id: 2, name: '#959', price: '15000 euro' },
  // { id: 4, name: "#1157", price: "15000 euro" },
  // { id: 5, name: "#2052", price: "15000 euro" },
  // { id: 6, name: "#2064", price: "15000 euro" },
  // { id: 7, name: "#2171", price: "15000 euro" },
  // { id: 8, name: "#2638", price: "15000 euro" },
  // { id: 9, name: "#7271", price: "15000 euro" },
];

export default function Collection() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Bored Ape NFTs collection</title>
          <meta description="A sneak peak of the Bored Ape NFTs collection" />
        </Head>

        <h1>Bored Ape NFTs collection</h1>
        {products.map((product) => {
          return (
            <div key={`product- ${product.id}`}>
              {product.name} {product.price}
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
