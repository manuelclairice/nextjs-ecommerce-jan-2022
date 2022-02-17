import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/blockchain-favicon.ico" />
      </Head>
      <Header {...props.children} />
      <main>{props.children}</main>
      <section>
        <Footer />
      </section>
    </>
  );
}
