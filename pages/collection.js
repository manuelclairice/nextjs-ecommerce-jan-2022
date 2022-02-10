import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import products from '../util/database';

const collectionStyle = css`
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  width: 150px;
  justify-content: space-evenly;
  align-items: stretch;
`;

export default function Collection(props) {
  return (
    <div>
      <Layout>
        <Head>
          <title>Bored Ape NFTs collection</title>
          <meta description="A sneak peak of the Bored Ape NFTs collection" />
        </Head>

        <h1>Bored Ape NFTs collection</h1>
        {props.products.map((product) => {
          return (
            <div key={`product- ${product.id}`} css={collectionStyle}>
              <Link href={`/collection/${product.id}`}>
                <a data-test-id="product-<product id>">
                  <Image
                    data-test-id="product-image"
                    src={`/images/${product.id}.png`}
                    width="300"
                    height="300"
                  />
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </a>
              </Link>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
// READ FILES FROM FILES SYSTEM
// CONNECT TO THE DATABASE
export function getServerSideProps() {
  return {
    props: { products: products },
  };
}
