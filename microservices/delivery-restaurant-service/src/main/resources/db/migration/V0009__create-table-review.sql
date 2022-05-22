CREATE TABLE review (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  comment varchar(255) DEFAULT NULL,
  user_rating int(5) NOT NULL,
  created_at date NOT NULL,
  order_id varchar(36) NOT NULL,
  restaurant_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
