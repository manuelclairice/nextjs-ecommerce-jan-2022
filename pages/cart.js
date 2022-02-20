import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import products from '../../util/database';
import Layout from '../components/Layout';

Export default function ShoppingCArt(props){

  const [productAddedToCart, setProductAddedToCart] = useState(props.cart);

  const cookieValue = getParsedCookie('cart') || [];

  const newCookie = cookieValue.map((cookieObject) => {

  });
  return (
    <div>
      <Layout>
        <Head>
        <title>Bored Ape NFTs cart</title>
          <meta description="A look of you have added to your cart" />
        </Head>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const productId = context.query.productId;
  // const matchingProduct = products.find((product) => product.id === productId);
  const productWithCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(productWithCookies);

  const products = await getProducts();

  return {
    props: {
      products: products,
      cart: cart,
      // productId: productId,
    },
  };
}
