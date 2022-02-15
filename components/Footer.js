import { css } from '@emotion/react';
import Image from 'next/image';

const footerStyle = css`
  position: relative;
  /* display: flex; */
  flex: 1;
  padding: 10px 10px 0px 10px;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

// position: fixed
// padding: 10px 10px 0px 10px;
// bottom: 0;
// width: 100%;

// height: 40px;

const footerAStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const footerStyleLogo = css`
  position: relative;
  height: 1em;
  margin-left: 0.5rem;
`;

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <a
        css={footerAStyle}
        href="https://opensea.io/collection/boredapeyachtclub"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inspired by{' '}
        <span css={footerStyleLogo}>
          <Image
            src="/bayc-footer.png"
            alt="BAYC Logo"
            width={50}
            height={50}
          />
        </span>
      </a>
    </footer>
  );
}
