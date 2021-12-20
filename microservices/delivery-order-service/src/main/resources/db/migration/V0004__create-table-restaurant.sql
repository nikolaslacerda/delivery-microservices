CREATE TABLE restaurant (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  approved bit(1) DEFAULT false,
  cnpj varchar(18) NOT NULL,
  description varchar(1000) DEFAULT NULL,
  cep varchar(9) NOT NULL,
  address varchar(300) NOT NULL,
  delivery_price decimal(19,2) DEFAULT NULL,
  max_delivery_time int(11) DEFAULT NULL,
  min_delivery_time int(11) DEFAULT NULL,
  cuisine_type_id bigint(20) NOT NULL,
  user_id  bigint(20) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cuisine_type_id) REFERENCES cuisine_type(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
