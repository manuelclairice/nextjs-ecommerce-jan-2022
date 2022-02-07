import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyle = css`
  background-color: grey;
  color: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 10px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <div>
          <span>
            <Image
              src="/blockchain-logo.png"
              alt="Logo"
              width={70}
              height={70}
            />
          </span>
          NFT
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/collection">
            <a>Collection</a>
          </Link>
        </div>
        <div>
          Checkout
          <button>cart</button>
        </div>
      </nav>
    </header>
  );
}
