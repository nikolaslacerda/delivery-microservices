CREATE TABLE payment (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  total_value decimal(19,2) NOT NULL,
  name varchar(100) DEFAULT NULL,
  number varchar(19) DEFAULT NULL,
  expiration varchar(7) NOT NULL,
  code varchar(3) DEFAULT NULL,
  status varchar(255) NOT NULL,
  payment_method_id bigint(20) NOT NULL,
  order_id bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;