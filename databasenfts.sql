-- CREATE NFTS TABLE

CREATE TABLE nfts (
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name varchar(10) NOT NULL,
	price varchar(10) NOT NULL
	);

-- INSERTING NFTS TO THE TABLE
INSERT INTO nfts
  (name, price)
VALUES
  ('#142', 15000),
  ('#314', 15000),
  ('#959', 15000),
  ('#1157', 15000),
  ('#2052', 15000),
  ('#2064', 15000),
  ('#2171', 15000),
  ('#2638', 15000),
  ('#7271', 15000);

-- READ SOME NFTS
  SELECT * FROM nfts;