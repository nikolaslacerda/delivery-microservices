insert into role(authority) values ('ROLE_ADMIN');
insert into role(authority) values ('ROLE_CUSTOMER');
insert into role(authority) values ('ROLE_PARTNER');

-- password: 123456
insert into user (id, first_name, last_name, email, phone_number, cpf, password) values ('e97a91b6-ca63-11ec-9d64-0242ac120002', 'User', 'Test', 'test@email.com', '999999999', '00000000000', '{bcrypt}$2a$10$3Qrx0rv8qSmZ8s3RlD5qE.upleP7.Qzbg5EoIAm62evEkY4c023TK');

insert into user_roles (user_id, roles_authority) values ('e97a91b6-ca63-11ec-9d64-0242ac120002', 'ROLE_CUSTOMER');
