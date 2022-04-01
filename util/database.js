// import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// function connectOneTimeToDatabase() {
//   let sql;

//   if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
//     sql = postgres();
//     // Heroku needs SSL connections but
//     // has an "unauthorized" certificate
//     // https://devcenter.heroku.com/changelog-items/852
//     sql = postgres({ ssl: { rejectUnauthorized: false } });
//   } else {
//     if (!globalThis.postgresSqlClient) {
//       globalThis.postgresSqlClient = postgres();
//     }
//     sql = globalThis.postgresSqlClient;
//   }
//   return sql;
// }

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase();

export async function getProducts() {
  const products = await sql`
  SELECT * FROM nfts;`;
  console.log(products);
  return products;
  // return products.map((product) => camelcaseKeys(product));
}

export async function getSingleProduct(id) {
  const [product] = await sql`
  SELECT * FROM nfts WHERE id = ${id};`;
  return product;
}
