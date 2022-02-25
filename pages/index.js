import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getProducts } from '../util/database';

const heroSectionStyle = css`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 90vh;
  /* padding-top: 50px 50px; */
  /* -webkit-box-orient: vertical;
  -webkit-box-direction: normal; */
  flex-direction: column;
  /* -webkit-box-align: center; */
  align-items: center;

  /* object-fit: cover; */ ;
`;

const heroButtonStyle = css`
  margin-top: 20px;
  margin-bottom: 50px;
  width: 200px;
  height: 50px;
  border-radius: 45px;
  background-color: #fd435a;
  /* padding: 13px 10px 0 15px; */
  color: #fff;
  margin-top: 7px;
  margin-right: 0;
  margin-left: 30px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  transition: box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;
  :hover {
    background-color: #bfc500;
  }
`;

const heroTextStyle = css`
  position: relative;
  top: 40px;
  left: 40px;
  width: 800px;
  height: auto;
  margin-top: 180px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
`;

const headerHeroBackground = css`
  position: relative;
  background-image: url('/bayc-mutant-hero.png');
`;

const collectionStyle = css`
  display: inline-block;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
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

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>N.F.T. Marketplace</title>
        <meta name="description" content="Best NFTs collections" />
      </Head>
      <div css={headerHeroBackground}>
        <section css={heroSectionStyle}>
          <div css={heroTextStyle}>
            <h1>Best NFTs collections</h1>
            <Link href="/collection">
              <a>
                <button css={heroButtonStyle}>Buy Now</button>
              </a>
            </Link>
          </div>
        </section>
      </div>
      <section>
        <h2>Best sellers of the week</h2>
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
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </a>
              </Link>
            </div>
          );
        })}
      </section>
    </Layout>
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
