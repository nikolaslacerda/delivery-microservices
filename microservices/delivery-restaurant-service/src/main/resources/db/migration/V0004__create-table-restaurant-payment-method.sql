CREATE TABLE restaurant_payment_method (
  restaurant_id bigint(20) NOT NULL,
  payment_method_id bigint(20) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_method(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
