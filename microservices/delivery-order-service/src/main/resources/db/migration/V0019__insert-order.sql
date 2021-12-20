INSERT INTO `order` (id, date_time, status, restaurant_id) values (1, NOW(), 'DELIVERED', 1);

INSERT INTO order_item (id, quantity, menu_item_id, order_id) values (1, 1, 4, 1);
INSERT INTO order_item (id, quantity, menu_item_id, order_id) values (2, 1, 8, 1);
