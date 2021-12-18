CREATE TABLE menu_item (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  description varchar(255) DEFAULT NULL,
  name varchar(150) DEFAULT NULL,
  price decimal(19,2) NOT NULL,
  promotional_price decimal(19,2) DEFAULT NULL,
  category_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES menu_category(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
