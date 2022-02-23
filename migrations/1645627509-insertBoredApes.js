const products = [
  { name: '#142', price: 15000 },
  { name: '#314', price: 15000 },
  { name: '#959', price: 15000 },
  { name: '#1157', price: 15000 },
  { name: '#2052', price: 15000 },
  { name: '#2064', price: 15000 },
  { name: '#2171', price: 15000 },
  { name: '#2638', price: 15000 },
  { name: '#7271', price: 15000 },
];

exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	INSERT INTO nfts ${sql(products, 'name', 'price')}
	`;
};

exports.down = async (sql) => {
  // just in case...
  for (const product of products) {
    await sql`
		DELETE FROM
		nfts
		WHERE
		name = ${product.name} AND
		price = ${product.price}
		`;
  }
};
