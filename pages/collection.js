import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getProducts } from '../util/database';

const collectionStyle = css`
  display: inline-block;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 22px;
  width: 150px;
  justify-content: space-evenly;
  align-items: stretch;

  will-change: transform;
  transition: transform 450ms;
  cursor: pointer;

  :hover {
    transition: transform 125ms;
    transform: translateY(-10px);
  }
`;

const collectionTextStyle = css`
  text-decoration: none;
  color: #fed2ff;
  font-weight: bold;
  font-size: 1.2rem;
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
                <a
                  data-test-id="product-<product id>"
                  css={collectionTextStyle}
                >
                  <Image
                    data-test-id="product-image"
                    src={`/images/${product.id}.png`}
                    width="300"
                    height="300"
                  />
                  <div>
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                  </div>
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

export async function getServerSideProps(context) {
  const productWithCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(productWithCookies);

  const products = await getProducts();

  return {
    props: {
      products: products,
      cart: cart,
    },
  };
}
