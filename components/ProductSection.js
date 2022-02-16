import { css } from '@emotion/react';
import Link from 'next/link';

const productSectionStyle = css``;

export default function ProductSection() {
  return (
    <div css={productSectionStyle}>
      <Link href="/collection">
        <a>
          <img src="/BoredApe142.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe314.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe959.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe1157.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe2052.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe2064.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe2171.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe2638.png" alt="Bored Ape" />
        </a>
      </Link>
      <Link href="/collection">
        <a>
          <img src="/BoredApe7271.png" alt="Bored Ape" />
        </a>
      </Link>
    </div>
  );
}
