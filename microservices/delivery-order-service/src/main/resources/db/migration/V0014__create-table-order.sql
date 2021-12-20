CREATE TABLE `order` (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  date_time datetime NOT NULL,
  status varchar(255) NOT NULL,
  restaurant_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
