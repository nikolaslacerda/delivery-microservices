CREATE TABLE restaurant (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  cnpj varchar(18) NOT NULL,
  name varchar(255) NOT NULL,
  description varchar(1000),
  image_url varchar(1000),
  delivery_price decimal(19,2),
  max_delivery_time int(11),
  min_delivery_time int(11),
  cuisine_type_id bigint(20) NOT NULL,
  partner_id bigint(20) NOT NULL,
  address_id bigint(20) NOT NULL,
  created_at date NOT NULL,
  updated_at date,
  active bit(1) DEFAULT false,
  PRIMARY KEY (id),
  FOREIGN KEY (address_id) REFERENCES address(id),
  FOREIGN KEY (cuisine_type_id) REFERENCES cuisine_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
