CREATE TABLE menu (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  restaurant_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
