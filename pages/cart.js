import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import products from '../../util/database';
import Layout from '../components/Layout';

Export default function ShoppingCArt(props){

  const [productAddedToCart, setProductAddedToCart] = useState(props.cart);

  const cookieValue = getParsedCookie('cart') || [];

  const newCookie = cookieValue.map((cookieObject) => {

  }
}