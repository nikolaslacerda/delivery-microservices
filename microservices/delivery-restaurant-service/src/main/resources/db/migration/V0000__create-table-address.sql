CREATE TABLE address (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  street_name varchar(100) NOT NULL,
  street_number INTEGER(14) NOT NULL,
  neighborhood varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  state varchar(255) NOT NULL,
  country varchar(2) NOT NULL,
  complement varchar(255) DEFAULT NULL,
  reference varchar(255) DEFAULT NULL,
  postal_code varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
