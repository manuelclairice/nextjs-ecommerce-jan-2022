import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import products from '../../util/database';
import Layout from '../components/Layout';
import { deleteCookie } from '../util/cookies';

Export default function ShoppingCArt(props){


  const [sumProductPrice, setSumProductPrice] = useState([]);
  const currentCookies = getParsedCookie('cart');
  const [productAddedToCart, setProductAddedToCart] = useState(props.currentCookies,);

  let amountOfProductAddedToCart = 0;
  let sum = [];

  function eventHandler(id, amount) {
    console.log('id:', id, 'amount:', amount);

    const newCartAmount = productAddedToCart.filter((event) => event.productId !== id,);

    if (newCartAmount.length) {
      newCartAmount.forEach((cookie) => {
        setParsedCookie('cart', [cookie])
      });
      setProductAddedToCart(newCartAmount)
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
            <meta name="description" content= "A look of what you have added to the cart" />
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
          <meta name="description" content= "A look of what you have added to the cart" />
        </Head>
        <section>
          <h1>A look of what you have added to the cart</h1>
        </section>

        <section>
          <article>
            {props.products.map((element) => {
              return (
                productAddedToCart.map((cookie) => {
                  return (element.id === cookie.productId && (
                    <div key={`productInCart_${props.products.id}`} data-test-id="cart-product-<product id>">
                      <div>
                        <Image
                        src={`/images/${products.id}.png`}
                        width="300"
                        height="300"
                         />
                         <div>Ref: {element.name}</div>


                      </div>
                      <div>Price: {element.price}</div>
                      <div>Quantity: {cookie.quantity}</div>
                      <div data-test-id="cart-total">
                        Total:{' '}
                        {(amountOfProductAddedToCart = ( element.price * cookie.quantity).toFixed(2))}
                        {sum.push(amountOfProductAddedToCart)}
                      </div>
                      <button onClick={() => eventHandler(cookie.productId, cookie.quantity)} data-test-id="cart-product-remove-<product id>">
                        x
                      </button>
                    </div>
                  ))
                })
              )
            })}
          </article>

          <article>
            <div>
              <h2>What you are about to add to you NFTs collection</h2>
              <div>
                <p>
                  <span>
                    Total:
                  </span>
                </p>
                <p>{sum.reduce((a, b) => a + b)}</p>
                <Link href="/checkout">
                  <button data-test-id="cart-checkout">Checkout</button>
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

  const products = await getProducts();

  return {
    props: {
      products: products,
      currentCookies: cartWithCookie,
      // productId: productId,
    },
  };
}
