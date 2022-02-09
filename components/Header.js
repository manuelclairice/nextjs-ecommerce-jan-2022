import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import blockChainLogo from '../public/blockchain-logo.png';

const navigationStyle = css`
  position: relative;
  background-color: none;
  color: white;
  padding: 10px 100px;
  /* border-radius: 10px; */
  margin: 8px 8px 20px;

  float: right;

  a {
    margin-left: 50px;
    transition: box-shadow 0.3s, background-color 0.3s;

    :hover {
      background-color: #bfc500;
    }
  }
`;

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>
          <Image src={blockChainLogo} width={80} height={80} margin-left={50} />
        </a>
      </Link>
      <nav css={navigationStyle}>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/collection">
            <a>Collection</a>
          </Link>
          <Link href="/checkout">
            <a>Checkout</a>
          </Link>
          <Link href="/cart">
            <a>cart</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
