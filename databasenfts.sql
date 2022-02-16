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
  ('#142', '15000 euro'),
  ('#314', '15000 euro'),
  ('#959', '15000 euro'),
  ('#1157', '15000 euro'),
  ('#2052', '15000 euro'),
  ('#2064', '15000 euro'),
  ('#2171', '15000 euro'),
  ('#2638', '15000 euro'),
  ('#7271', '15000 euro');

-- READ SOME NFTS
  SELECT * FROM nfts;