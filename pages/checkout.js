import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import { getProducts } from '../util/database';

const checkoutButtonStyle = css`
  float: inherit;
  /* margin-top: 20px; */
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

const formStyle = css`
  display: table;
  margin: 0 auto;

  div {
    display: table-row;
  }

  label,
  input {
    display: table-cell;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  label {
    width: 200px;
    padding-right: 5%;
    text-align: left;
  }

  input {
    width: 300px;
  }
`;

export default function Checkout(props) {
  const [productAddedToCart, setProductAddedToCart] = useState([0]);
  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject) => {
    function addProducts() {
      for (const singleProduct of props.products) {
        if (singleProduct.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleProduct.name,
            price: singleProduct.price,
          };
        }
      }
    }
    return addProducts();
  });
  setParsedCookie('cart', cookieValue);
  function deleteFromCart(cart) {
    const cartAmount = getParsedCookie('cart') || [];

    const updatedCookie = cartAmount.filter(
      (cookieObject) => cookieObject.cart !== cart,
    );

    setParsedCookie('cart', updatedCookie);
    setProductAddedToCart(updatedCookie);
  }

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
        <section>
          <form css={formStyle}>
            <div>
              <label data-test-id="checkout-first-name">
                First Name:
                <input placeholder="first-name" required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-last-name">
                Last Name:
                <input required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-email">
                Email:
                <input required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-address">
                Address:
                <input required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-city">
                City:
                <input required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-postal-code">
                Postal Code:
                <input type="number" required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-country">
                Country:
                <input required />
              </label>
            </div>

            <div>
              <label data-test-id="checkout-credit-card">
                Credit Card Number:
                <input type="number" required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-expiration-date">
                Expiry Date:
                <input type="number" required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-security-code">
                CVC:
                <input type="number" required />
              </label>
            </div>
          </form>
          {newCookie.map((singleProduct) => {
            return (
              <div key={`product-${singleProduct.cart}`}>
                <Link href="/thankYou">
                  <a>
                    <button
                      onClick={() => deleteFromCart()}
                      data-test-id="checkout-confirm-order"
                      css={checkoutButtonStyle}
                    >
                      Purchase
                    </button>
                  </a>
                </Link>
              </div>
            );
          })}
        </section>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cartWithCookie = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartWithCookie);

  const products = await getProducts();

  return {
    props: {
      products,
      cart,
    },
  };
}
