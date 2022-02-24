import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
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
  setParsedCookie('cart', newCookie);

  const totalProductPrice = newCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  function deleteFromCart(id) {
    const cartAmount = getParsedCookie('cart') || [];

    const updatedCookie = cartAmount.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setProductAddedToCart(updatedCookie);
  }

  // const [productPrice, setProductPrice] = useState([0]);
  // const [productAmount, setProductAmount] = useState([0]);

  // useEffect(() => {
  //   const getAmount = () => {
  //     const amountInCart = props.cart.map((product) => {
  //       return product.productAmount;
  //     });

  //     const sum = amountInCart.reduce((productAdded, a) => productAdded + a, 0);

  //     setProductAmount(sum);

  //     const cartPrice = productAddedToCart.map((product) => {
  //       return props.products.price * product.productAmount;
  //     });

  //     const totalCartPrice = cartPrice.reduce(
  //       (productAdded, a) => productAdded + a,
  //       0,
  //     );
  //     setProductPrice(totalCartPrice);
  //   };
  //   getAmount();
  // });

  // function handleDeleteCookie(id) {
  //   const newCookie = productAddedToCart.filter((cookieObject) => {
  //     return cookieObject.id !== id;
  //   });
  //   console.log('newCookie', newCookie);

  //   setProductAddedToCart(newCookie);
  //   setParsedCookie('cart', [newCookie]);
  //   // Cookies.set('cart', JSON.stringify(newCookie));

  //   const amountInCart = newCookie.map((product) => {
  //     return product.productAmount;
  //   });

  //   const sum = amountInCart.reduce((productAdded, a) => productAdded + a, 0);

  //   setProductAmount(sum);

  //   const cartPrice = newCookie.map((product) => {
  //     return props.products.price * product.productAmount;
  //   });

  //   const totalCartPrice = cartPrice.reduce(
  //     (productAdded, a) => productAdded + a,
  //     0,
  //   );
  //   setProductPrice(totalCartPrice);
  // }

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
            {newCookie.map((singleProduct) => {
              const totalProduct = singleProduct.price * singleProduct.quantity;
              return (
                <div
                  key={`product-${singleProduct.id}`}
                  data-test-id="cart-product-<product id>"
                >
                  <div>
                    <a css={shoppingCartStyle}>
                      <Image
                        src={`/images/${singleProduct.id}.png`}
                        alt={`Bored Ape number${singleProduct.name}`}
                        width="300"
                        height="300"
                      />
                    </a>
                    <div>Ref: {singleProduct.name}</div>
                  </div>
                  <div>Price: {singleProduct.price} euro</div>
                  <div>
                    Quantity: {singleProduct.quantity}{' '}
                    {singleProduct.quantity > 1 ? 'NFTs' : 'NFT'}
                  </div>
                  <span data-test-id="cart-total">
                    Total: {totalProduct} euro
                  </span>
                  <button
                    onClick={() => deleteFromCart(singleProduct.id)}
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
          <h3>Total: {totalProductPrice} euro</h3>
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

  // const products = await getSingleProduct(Number(productId));
  const products = await getProducts();

  return {
    props: {
      products,
      cart,
      // productId: productId,
    },
  };
}
