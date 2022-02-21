import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  deleteCookie,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
// import { getProducts, getSingleProduct } from '../util/database';
import { getSingleProduct } from '../util/database';

const shoppingCartStyle = css`
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

const checkoutButtonStyle = css`
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

export default function ShoppingCArt(props) {
  // const [sumProductPrice, setSumProductPrice] = useState([]);
  const currentCookies = getParsedCookie('cart');
  const [productAddedToCart, setProductAddedToCart] = useState(
    props.currentCookies,
  );

  let amountOfProductAddedToCart = 0;
  const sum = [];

  function eventHandler(id, amount) {
    console.log('id:', id, 'amount:', amount);

    const newCartAmount = productAddedToCart.filter(
      (event) => event.productId !== id,
    );

    if (newCartAmount.length) {
      newCartAmount.forEach((cookie) => {
        setParsedCookie('cart', [cookie]);
      });
      setProductAddedToCart(newCartAmount);
    } else {
      deleteCookie('cart');
      setProductAddedToCart([]);
    }
  }

  if (productAddedToCart === undefined || !productAddedToCart.length) {
    return (
      <div>
        <Layout>
          <Head>
            <title>Bored Ape NFTs cart</title>
            <meta
              name="description"
              content="A look of what you have added to the cart"
            />
          </Head>
          <section>
            <h1>Sorry --- Your cart is empty</h1>
          </section>
        </Layout>
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <Head>
          <title>Bored Ape NFTs cart</title>
          <meta
            name="description"
            content="A look of what you have added to the cart"
          />
        </Head>
        <section>
          <h1>A look of what you have added to the cart</h1>
        </section>

        <section>
          <article>
            {props.products.map((product) => {
              return productAddedToCart.map((cookie) => {
                return (
                  product.id === cookie.productId && (
                    <div
                      key={`productInCart_${props.products.id}`}
                      data-test-id="cart-product-<product id>"
                    >
                      <div>
                        <Image
                          src={`/images/${props.products.id}.png`}
                          width="300"
                          height="300"
                        />
                        <div>Ref: {product.name}</div>
                      </div>
                      <div>Price: {product.price}</div>
                      <div>Quantity: {cookie.quantity}</div>
                      <div data-test-id="cart-total">
                        Total:{' '}
                        {
                          (amountOfProductAddedToCart = (
                            product.price * cookie.quantity
                          ).toFixed(2))
                        }
                        {sum.push(amountOfProductAddedToCart)}
                      </div>
                      <button
                        onClick={() =>
                          eventHandler(cookie.productId, cookie.quantity)
                        }
                        data-test-id="cart-product-remove-<product id>"
                      >
                        x
                      </button>
                    </div>
                  )
                );
              });
            })}
          </article>

          <article>
            <div>
              <h2>What you are about to add to your NFTs collection</h2>
              <div>
                <a css={shoppingCartStyle}>
                  <Image
                    src={`/images/${props.products.id}.png`}
                    width="300"
                    height="300"
                  />
                  <div>
                    <div>{props.products.name}</div>
                    <div>{props.products.price}</div>
                  </div>
                </a>
                <p>
                  <span>Total:</span>
                </p>
                {/* <p>{sum.reduce((a, b) => a + b)}</p> */}
                <Link href="/checkout">
                  <a>
                    <button
                      data-test-id="cart-checkout"
                      css={checkoutButtonStyle}
                    >
                      Checkout
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </article>
        </section>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const productId = context.query.productId;
  // const matchingProduct = products.find((product) => product.id === productId);
  const productWithCookies = context.req.cookies.cart || '[]';

  const cartWithCookie = JSON.parse(productWithCookies);

  // const products = await getProducts();

  const productId = context.query.productId;

  const products = await getSingleProduct(Number(productId));

  return {
    props: {
      products: products,
      currentCookies: cartWithCookie,
      // productId: productId,
    },
  };
}
