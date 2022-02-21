import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

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
  cursor: pointer;
`;

// position: fixed
// padding: 10px 10px 0px 10px;
// bottom: 0;
// width: 100%;

// height: 40px;

const footerTextStyle = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-decoration: none;
  color: #fed2ff;
  font-weight: bold;
  font-size: 1.3rem;
  transition: box-shadow 0.3s, background-color 0.3s;
  :hover {
    color: #bfc500;
  }
`;

const footerLogoStyle = css`
  position: relative;
  /* height: 1em;
  margin-left: 0.5rem; */
`;

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <Link href="https://opensea.io/collection/boredapeyachtclub">
        <a
          css={footerTextStyle}
          href="https://opensea.io/collection/boredapeyachtclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Sourced from </span>

          <div css={footerLogoStyle}>
            <Image
              src="/opensea-white-footer.svg"
              alt="opensea Logo"
              width={50}
              height={50}
            />
          </div>
        </a>
      </Link>
    </footer>
  );
}
