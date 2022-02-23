exports.up = async (sql) => {
  // <insert magic here>
  console.log('Creating table nfts...');
  await sql`
	CREATE TABLE nfts (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(10) NOT NULL,
		price varchar(10) NOT NULL
		);`;
};

exports.down = async (sql) => {
  // just in case...
  console.log('Dropping table nfts...');
  await sql`
	DROP TABLE nfts`;
};
