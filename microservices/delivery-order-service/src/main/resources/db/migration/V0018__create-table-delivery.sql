CREATE TABLE delivery (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  cpf varchar(14) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(16) NOT NULL,
  cep varchar(9) NOT NULL,
  address varchar(255) NOT NULL,
  complement varchar(255) DEFAULT NULL,
  order_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES `order`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
