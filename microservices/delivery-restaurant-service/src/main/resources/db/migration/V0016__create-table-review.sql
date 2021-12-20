CREATE TABLE review (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  comment varchar(255) DEFAULT NULL,
  score int(11) NOT NULL,
  order_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES `order`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
