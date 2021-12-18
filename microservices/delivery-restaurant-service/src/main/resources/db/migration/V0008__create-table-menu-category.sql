CREATE TABLE menu_category (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(100) DEFAULT NULL,
  menu_id bigint(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (menu_id) REFERENCES menu(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
