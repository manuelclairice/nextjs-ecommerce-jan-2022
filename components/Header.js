import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/collection">
        <a>Collection</a>
      </Link>
    </header>
  );
}
