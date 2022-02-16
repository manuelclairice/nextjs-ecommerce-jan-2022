// import { config } from 'dotenv-safe';
// import postgres from 'postgres';

// config();

// const sql = postgres();

// export async function readProducts() {
//   const products = await sql`
//   SELECT * FROM nfts;`;
//   return products;
// }

const products = [
  { id: '1', name: '#142', price: '15000 euro' },
  { id: '2', name: '#314', price: '15000 euro' },
  { id: '3', name: '#959', price: '15000 euro' },
  { id: '4', name: '#1157', price: '15000 euro' },
  { id: '5', name: '#2052', price: '15000 euro' },
  { id: '6', name: '#2064', price: '15000 euro' },
  { id: '7', name: '#2171', price: '15000 euro' },
  { id: '8', name: '#2638', price: '15000 euro' },
  { id: '9', name: '#7271', price: '15000 euro' },
];

export default products;
