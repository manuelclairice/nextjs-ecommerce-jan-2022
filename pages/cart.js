import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { setParsedCookie } from '../util/cookies';
// import { getProducts, getSingleProduct } from '../util/database';
import { getProducts } from '../util/database';

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
  /* will-change: transform;
  transition: transform 450ms;
  cursor: pointer;

  :hover {
    transition: transform 125ms;
    transform: translateY(-10px);
  } */
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
  // const currentCookies = getParsedCookie('cart');
  const [productAddedToCart, setProductAddedToCart] = useState([0]);
  const [productPrice, setProductPrice] = useState([0]);
  const [productAmount, setProductAmount] = useState([0]);

  // let amountOfProductAddedToCart = 0;
  // const sum = [];

  // function eventHandler(id, amount) {
  //   console.log('id:', id, 'amount:', amount);

  //   const newCartAmount = productAddedToCart.filter(
  //     (event) => event.productId !== id,
  //   );

  //   if (newCartAmount.length) {
  //     newCartAmount.forEach((cookie) => {
  //       setParsedCookie('cart', [cookie]);
  //     });
  //     setProductAddedToCart(newCartAmount);
  //   } else {
  //     deleteCookie('cart');
  //     setProductAddedToCart([]);
  //   }
  // }

  useEffect(() => {
    const getAmount = () => {
      const amountInCart = props.cart.map((product) => {
        return product.productAmount;
      });

      const sum = amountInCart.reduce((productAdded, a) => productAdded + a, 0);

      setProductAmount(sum);

      const cartPrice = productAddedToCart.map((product) => {
        return props.products.price * product.productAmount;
      });

      const totalCartPrice = cartPrice.reduce(
        (productAdded, a) => productAdded + a,
        0,
      );
      setProductPrice(totalCartPrice);
    };
    getAmount();
  });

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

  function handleDeleteCookie(id) {
    const newCookie = productAddedToCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });
    console.log('newCookie', newCookie);

    setProductAddedToCart(newCookie);
    setParsedCookie('cart', [newCookie]);
    // Cookies.set('cart', JSON.stringify(newCookie));

    const amountInCart = newCookie.map((product) => {
      return product.productAmount;
    });

    const sum = amountInCart.reduce((productAdded, a) => productAdded + a, 0);

    setProductAmount(sum);

    const cartPrice = newCookie.map((product) => {
      return props.products.price * product.productAmount;
    });

    const totalCartPrice = cartPrice.reduce(
      (productAdded, a) => productAdded + a,
      0,
    );
    setProductPrice(totalCartPrice);
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
          <article data-test-id="cart-product-<product id>">
            {/* {props.products.map((cookie) => {
            return{' '} */}
            {productAddedToCart.map((product) => {
              return (
                <div
                  key={`product-${product.id}`}
                  data-test-id="cart-product-<product id>"
                >
                  <div>
                    <a css={shoppingCartStyle}>
                      <Image
                        src={`/images/${props.cart.id}.png`}
                        alt={`Bored Ape number${product.name}`}
                        width="300"
                        height="300"
                      />
                    </a>
                    <div>Ref: {props.cart.name}</div>
                  </div>
                  <div>Price: {props.products.price}</div>
                  <div>Quantity: {product.productAmount}</div>
                  <span data-test-id="cart-total">
                    Total:
                    {product.productAmount < 0
                      ? handleDeleteCookie(product.id)
                      : product.price * product.productAmount}{' '}
                  </span>
                  <button
                    onClick={() => handleDeleteCookie(product.id)}
                    data-test-id="cart-product-remove-<product id>"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </article>
        </section>
        <div>
          <h3>
            Total: {productPrice} Euro for {productAmount}{' '}
            {productAmount > 1 ? 'NFTs' : 'NFT'}
          </h3>
        </div>
        <div>
          <Link href="/checkout">
            <a>
              <button data-test-id="cart-checkout" css={checkoutButtonStyle}>
                Checkout
              </button>
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const productId = context.query.productId;
  // const matchingProduct = products.find((product) => product.id === productId);
  const cartWithCookie = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartWithCookie);

  // const products = await getProducts();

  // const productId = context.query.productId;

  // const products = await getSingleProduct(Number(productId));
  const products = await getProducts();

  return {
    props: {
      products: products,
      cart: cart,
      // productId: productId,
    },
  };
}
