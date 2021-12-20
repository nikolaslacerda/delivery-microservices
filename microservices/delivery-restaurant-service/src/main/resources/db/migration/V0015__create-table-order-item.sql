CREATE TABLE order_item (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  observation varchar(255) DEFAULT NULL,
  quantity int(11) NOT NULL,
  menu_item_id bigint(20) NOT NULL,
  order_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_item(id),
  FOREIGN KEY (order_id) REFERENCES `order`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
