import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import blockChainLogo from '../public/blockchain-logo.png';
import { getParsedCookie } from '../util/cookies';

// import products from '../util/database';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const logoStyle = css`
  display: flex;
  cursor: pointer;
`;

const logoTextStyle = css`
  color: #fed2ff;
  font-size: 1.3rem;
  line-height: 30%;
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: #bfc500;
  }
`;

const menuNavStyle = css`
  margin-right: 20px;
  margin-top: 20px;
`;

const navigationStyle = css`
  /* position: relative; */
  /* position: -webkit-sticky;
  position: sticky;
  top: 20px;
  background-color: none;
  color: white;
  padding: 10px 10px;
  border-radius: 10px;
  margin: 8px 8px 50px; */
  display: flex;

  align-content: stretch;
  justify-content: flex-end;
  cursor: pointer;
  float: right;

  a {
    /* margin-left: 50px; */
    margin-right: 20px;
    text-decoration: none;
    color: #fed2ff;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bold;
    font-size: 1.5rem;
    transition: box-shadow 0.3s, background-color 0.3s;

    :hover {
      color: #bfc500;
    }
  }
`;

export default function Header() {
  const [cartAmount, setCartAmount] = useState(0);

  const currentCookies = getParsedCookie('cart');

  console.log('currentCookies', currentCookies);

  useEffect(() => {
    if (currentCookies !== undefined) {
      const amount = currentCookies.map((event) => event.quantity);
      const reduceAmount = amount.reduce((a, b) => a + b, 0);
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      setCartAmount(amount.reduce(reducer));
      setCartAmount(reduceAmount);
    } else {
      setCartAmount(0);
    }
  }, [currentCookies]);
  // const amountAddedToCart = cookieValue.reduce(
  //   (previousValue, currentValue) => {
  //     return previousValue + currentValue.quantity;
  //   },
  //   0,
  // );

  return (
    <header css={headerStyle}>
      <Link href="/">
        <a css={logoStyle}>
          <div>
            <Image
              src={blockChainLogo}
              width={80}
              height={80}
              margin-left={50}
            />
          </div>
          <span css={logoTextStyle}>
            <p>NFT</p>
            <p>MARKET</p>
          </span>
        </a>
      </Link>
      <nav css={navigationStyle}>
        <div css={menuNavStyle}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/collection" data-test-id="products-link">
            <a>Collection</a>
          </Link>
          <Link href="/checkout">
            <a>Checkout</a>
          </Link>
          <Link href="/cart" data-test-id="cart-link">
            <a data-test-id="cart-count">
              cart({cartAmount})
              {/* {JSON.stringify(props.cart) ? '0' : props.cart} */}
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
