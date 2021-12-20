-- Chinês Long Fu
INSERT INTO restaurant (id, approved, cnpj, name, description, cep, address, delivery_price, max_delivery_time, min_delivery_time, cuisine_type_id)
values (1, true, '98444252000104', 'Long Fu', 'O melhor da China aqui do seu lado.', '70238500', 'ShC/SUL COMERCIO LOCAL QD 404-BL D LJ 17-ASA SUL' , 6, 25, 40, 1);

INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 1);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 2);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 3);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 4);
INSERT INTO restaurant_payment_method (restaurant_id, payment_method_id) values (1, 5);

INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('SUNDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('MONDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('TUESDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('WEDNESDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('THURSDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('FRIDAY', '11:00:00', '23:00:00', 1);
INSERT INTO business_hours (day_of_week, opening_time, closing_time, restaurant_id) values ('SATURDAY', '11:00:00', '23:00:00', 1);

INSERT INTO menu (id, restaurant_id) values (1, 1);

INSERT INTO menu_category (id, name, menu_id) values (1, 'FIRST COURSE', 1);
INSERT INTO menu_category (id, name, menu_id) values (2, 'MAIN COURSE', 1);
INSERT INTO menu_category (id, name, menu_id) values (3, 'DRINKS', 1);

-- FIRST COURSE
INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Gyoza Bovino - 6 unidades', 'Massa fina cozida a vapor recheada com carne temperada com gengibre', 23.5, null, 1);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Pão Chinês - 3 unidades', 'Pão macio e fofinho recheado de frango e legumes', 11.9, 9.9, 1);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Rolinho Primavera - 2 unidades', 'Massa fina recheada com carne, repolho e cenoura. Acompanha molho agridoce', 9.9, null, 1);

-- MAIN COURSE
INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Yakissoba Clássico', 'Yakissoba de carne e frango acompanhado por legumes frescos e champignons', 40.9, 39.9, 2);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Macarrão Xian', 'Macarrão com molho à base de shoyu, cubos de frango e legumes', 17.9, null, 2);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Yakimeshi', 'Arroz soltinho refogado com flocos de ovos, pedacinhos de cenoura, apresuntado e cebolinha', 21.9, null, 2);

-- DRINKS
INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Coca-Cola Lata 310 ML', null, 5.9, null, 3);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Coca-Cola Zero Lata 310 ML', null, 5.9, null, 3);

INSERT INTO menu_item (
  name,
  description,
  price,
  promotional_price,
  category_id
) values ('Cerveja Heineken Lata 350 ML', null, 6.9, null, 3);

