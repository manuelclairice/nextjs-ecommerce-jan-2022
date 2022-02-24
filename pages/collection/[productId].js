import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
// import { getCookieParser } from 'next/dist/server/api-utils';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getSingleProduct } from '../../util/database';

const addButtonStyle = css`
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

const singleProductStyle = css`
  display: inline-block;
  align-items: center;
  justify-content: space-evenly;
`;

const singleProductTextStyle = css`
  text-decoration: none;
  color: #fed2ff;
  font-weight: bold;
  font-size: 1.5rem;
`;

export default function SingleProduct(props) {
  const [productAddedToCart, setProductAddedToCart] = useState(props.cart);
  const [quantity, setQuantity] = useState(1);

  function addProductToCart(id, quantities) {
    console.log('', id, quantities);
    // GET THE VALUE OF THE COOKIE

    const value = {
      productId: id,
      quantity: quantities,
    };
    const cookieValue = getParsedCookie('cart') || [];

    console.log('current value', cookieValue);
    // UPDATE THE COOKIE
    // const productIdOnArray = cookieValue.some((cookieObject) => {
    //   return cookieObject.id === id;
    // });

    let newCookie;
    if (props.cart !== '[]') {
      // (productIdOnArray)
      // newCookie = cookieValue.filter((cookieObject) => {
      //   return cookieObject.id !== id;
      // });

      // CHECKS IF THE PRODUCT WAS ALREADY ADDED TO THE CART
      const productIsAdded = props.cart.some(
        (addedObject) => addedObject.productId === props.product.id,
      );
      if (productIsAdded) {
        const newCookieAdded = props.cart.map((cookieObject) => {
          if (cookieObject.productId === props.product.id) {
            cookieObject.quantity = cookieObject.quantity + quantities;
          }
          return cookieObject;
        });

        newCookie = [...newCookieAdded];
      } else {
        newCookie = [...props.cart, { id: id, quantity: quantities }];
      }
    } else {
      newCookie = value;
    }
    // SET THE NEW VALUE OF THE COOKIE
    setProductAddedToCart(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function changeAmount(event) {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(value);
  }
  // CHECKS IF THE PRODUCT WAS ALREADY ADDED TO THE CART
  // const productIsAdded = productAddedToCart.some((addedObject) =>
  //   addedObject.id === props.product.id,
  // );

  // const currentProduct = productAddedToCart.find(
  //   (cookieObject) => cookieObject.id === props.product.id,
  // );

  // FUNCTIONS FOR THE COUNT BUTTON
  // function quantityCountUp() {
  //   const cookieValue = getParsedCookie('cart') || [];
  //   // const newCookie = cookieValue.map((cookieObject) => {
  //   //   if (cookieObject.id === props.product.id) {
  //   //     return { ...cookieObject, quantity: cookieObject.quantity + 1 };
  //     } else {
  //       return cookieObject;
  //     }
  //   });
  //   setProductAddedToCart(newCookie);
  //   setParsedCookie('cart', newCookie);
  // }

  // function quantityCountDown() {
  //   const cookieValue = getParsedCookie('cart') || [];
  //   const newCookie = cookieValue.map((cookieObject) => {
  //     if (cookieObject.id === props.product.id) {
  //       return { ...cookieObject, quantity: cookieObject.quantity - 1 };
  //     } else {
  //       return cookieObject;
  //     }
  //   });
  //   setProductAddedToCart(newCookie);
  //   setParsedCookie('cart', newCookie);
  // }

  return (
    <Layout>
      <Head>
        <title>N.F.T. Marketplace</title>
        <meta description="Bored Ape NFTs collection" />
      </Head>
      <h1>{props.product.name}</h1>
      <div css={singleProductStyle}>
        <Image
          src={`/images/${props.product.id}.png`}
          width="300"
          height="300"
        />
        <div css={singleProductTextStyle}>
          <div>Ref: {props.product.name}</div>
          <div data-test-id="product-price">Price: {props.product.price}</div>
        </div>
        <div>
          {/* {currentProduct && (
            <div data-test-id="product-quantity">
              <button onClick={() => quantityCountDown()}>- </button>
              {currentProduct.quantity}
              <button onClick={() => quantityCountUp()}>+ </button>
            </div>
          )} */}
          <label>
            {' '}
            Select quantity
            <input
              data-test-id="product-quantity"
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={(event) => changeAmount(event)}
            />
          </label>
          <button
            data-test-id="product-add-to-cart"
            css={addButtonStyle}
            onClick={() => addProductToCart(props.product.id, quantity)}
          >
            {/* {productIsAdded ? 'Remove from cart' : 'Add to cart'} */}
            Add to cart
          </button>
        </div>

        <p>
          <strong>{props.product.name}</strong> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const productId = context.query.productId;
  // const matchingProduct = products.find((product) => product.id === productId);
  const productId = context.query.productId;

  const product = await getSingleProduct(Number(productId));

  console.log(productId);

  const productWithCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(productWithCookies);

  return {
    props: {
      product: product,
      cart: cart,
      productId: productId,
    },
  };
}
