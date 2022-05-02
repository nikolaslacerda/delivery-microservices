CREATE TABLE business_hours (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  day_of_week varchar(255) NOT NULL,
  opening_time time NOT NULL,
  closing_time time NOT NULL,
  restaurant_id bigint(20) DEFAULT NULL,
  active bit(1) DEFAULT false,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;