INSERT INTO payment_method (id, name, type) values (1, 'CREDIT_CARD', 'CREDIT_CARD');
INSERT INTO payment_method (id, name, type) values (2, 'MEAL_TICKET', 'MEAL_TICKET');
INSERT INTO payment_method (id, name, type) values (3, 'DEBIT_CARD', 'DEBIT_CARD');
INSERT INTO payment_method (id, name, type) values (4, 'CASH', 'CASH');
INSERT INTO payment_method (id, name, type) values (5, 'MOBILE_WALLET', 'MOBILE_WALLET');

INSERT INTO address (id, street_address, street_number, neighborhood, city, state, country, complement, reference, postal_code) values (1, 'Av. João Wallig', 1800, 'Passo dAreia', 'Porto Alegre', 'Rio Grande do Sul', 'BR', '', '', '91340000');
INSERT INTO address (id, street_address, street_number, neighborhood, city, state, country, complement, reference, postal_code) values (2, 'Av. Ipiranga', 5200, 'Azenha', 'Porto Alegre', 'Rio Grande do Sul', 'BR', '', '', '90610000');
INSERT INTO address (id, street_address, street_number, neighborhood, city, state, country, complement, reference, postal_code) values (3, 'Av. Assis Brasil', 2611, 'Passo dAreia', 'Porto Alegre', 'Rio Grande do Sul', 'BR', '', '', '91010004');

INSERT INTO cuisine_type (id, name) values (1, 'Chinese');
INSERT INTO cuisine_type (id, name) values (2, 'Japanese');
INSERT INTO cuisine_type (id, name) values (3, 'Mexican');
INSERT INTO cuisine_type (id, name) values (4, 'Spanish');
INSERT INTO cuisine_type (id, name) values (5, 'Thai');
INSERT INTO cuisine_type (id, name) values (6, 'Brazilian');
INSERT INTO cuisine_type (id, name) values (7, 'Hamburger');
INSERT INTO cuisine_type (id, name) values (8, 'Middle Eastern');
INSERT INTO cuisine_type (id, name) values (9, 'Italian');
INSERT INTO cuisine_type (id, name) values (10, 'Other');

INSERT INTO restaurant (id, cnpj, name, description, image_url, delivery_price, max_delivery_time, min_delivery_time, cuisine_type_id, menu_id, partner_id, address_id, created_at, updated_at, active) VALUES (1, '17261661013070', 'Outback', 'Sejam bem-vindos a uma viagem de descobertas pela Austrália e seus sabores marcantes. Consulte os alergênicos no nosso site. O Outback Steakhouse pertence ao grupo Bloomin’ Brands que também conta com as marcas Abbraccio Restaurante e Aussie Grill no Brasil.', '1_image_48353175.png', 16.99, 70, 60, 1, null, 1, 1, '2022-03-27', null, true);
INSERT INTO restaurant (id, cnpj, name, description, image_url, delivery_price, max_delivery_time, min_delivery_time, cuisine_type_id, menu_id, partner_id, address_id, created_at, updated_at, active) VALUES (2, '42591651059890', 'MC Donalds', 'Líder no segmento de serviço rápido de alimentação, o McDonalds se destaca pela qualidade dos produtos e do atendimento. Sempre temos uma Mc Oferta especial (promoção) de Hamburguer, lanches, sanduíche, batata e sorvete. Aproveite!', 'mcdonalds_32aslAnfgI228Sh.png', 4.99, 36, 26, 1, null, 1, 2, '2022-03-30', null, true);
INSERT INTO restaurant (id, cnpj, name, description, image_url, delivery_price, max_delivery_time, min_delivery_time, cuisine_type_id, menu_id, partner_id, address_id, created_at, updated_at, active) VALUES (3, '09060964017680', 'KFC', 'O KFC (Kentucky Fried Chicken) é uma rede de restaurantes americana fundada em 1952 pelo Coronel Sanders, criador da receita mundialmente famosa à base de 11 ingredientes secretos. Tags: frango crocante, frango frito, frango empanado, frango marinado, frango milanesa, tirinha, frango com osso, franguinho, peito de frango, galeto, frango assado, chicken, balde, lanche, hambúrguer, burger, burguer, sanduíche, sanduba, sandwich, batata frita, barbecue, bbq, catupiry, bacon, cheddar, molho, kentucky, fast food', 'kfc_Ahd6320ADSAd364.png', 7.99, 57, 47, 1, null, 1, 3, '2022-03-30', null, true);

INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 1);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 2);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 3);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 4);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 5);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (2, 1);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (2, 2);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (2, 3);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (2, 4);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (2, 5);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (3, 1);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (3, 2);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (3, 3);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (3, 4);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (3, 5);

INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (1, 'SUNDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (2, 'MONDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (3, 'TUESDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (4, 'WEDNESDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (5, 'THURSDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (6, 'FRIDAY', '11:30:00', '22:00:00', 3, true);
INSERT INTO business_hours (id, day_of_week, opening_time, closing_time, restaurant_id, active) VALUES (7, 'SATURDAY', '11:30:00', '22:00:00', 3, true);

INSERT INTO menu (id, restaurant_id) VALUES (1, 1);
INSERT INTO menu (id, restaurant_id) VALUES (2, 2);
INSERT INTO menu (id, restaurant_id) VALUES (3, 3);

INSERT INTO menu_category (id, name, menu_id, active) VALUES (1, 'Favorites', 1, true);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (2, 'Combos', 2, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (3, 'Hamburgers', 2, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (4, 'Drinks', 2, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (5, 'Promotions', 3, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (6, 'Chicken', 3, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (7, 'Fries', 3, false);
INSERT INTO menu_category (id, name, menu_id, active) VALUES (14, 'Drinks', 3, false);

INSERT INTO menu_item (id, name, description, image_url, price, promotional_price, category_id, active) VALUES (2, 'JUNIOR RIBS FOR TWO', 'Duas junior ribs, nossa meia costela suína, servidas com dois acompanhamentos.', '201911051405_RSTQ_j.png', 8.70, 7.70, 1, true);
INSERT INTO menu_item (id, name, description, image_url, price, promotional_price, category_id, active) VALUES (3, 'RIBS ON THE BARBIE', 'Nossa costela suína preparada em chama aberta como manda a tradição australiana, vem com as saborosas cinnamon apples.', '201911191742_qCKt_r.jpg', 15.90, 15.90, 1, true);
INSERT INTO menu_item (id, name, description, image_url, price, promotional_price, category_id, active) VALUES (4, 'ALICE SPRINGS CHICKEN', 'Um suculento peito de frango grelhado, temperado com o molho honey mustard e coberto de bacon, champignons e queijos gratinados.', '202006261543_0PWa_a.jpg', 11.90, 11.90, 1, true);

INSERT INTO review (id, name, comment, user_rating, created_at, order_id, restaurant_id) VALUES (5, 'John Doe', 'Very Good!', 4, '2022-03-29', 3, 1);