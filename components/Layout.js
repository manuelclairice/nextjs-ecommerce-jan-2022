import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/blockchain-favicon.ico" />
      </Head>
      <Header nft={props.nft} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
