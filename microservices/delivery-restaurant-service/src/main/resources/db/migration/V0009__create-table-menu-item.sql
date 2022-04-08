CREATE TABLE menu_item (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(150) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  image_url varchar(255) DEFAULT NULL,
  price decimal(19,2) NOT NULL,
  promotional_price decimal(19,2) DEFAULT NULL,
  category_id bigint(20) NOT NULL,
  active bit(1) DEFAULT false,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES menu_category(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
