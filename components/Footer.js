import { css } from '@emotion/react';
import Image from 'next/image';

const footerStyle = css`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`;

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
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
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
