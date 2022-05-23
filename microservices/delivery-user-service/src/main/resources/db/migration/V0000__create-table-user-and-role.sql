CREATE TABLE user (
  id varchar(36) NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  email varchar(255) NOT NULL,
  phone_number varchar(15) NOT NULL,
  cpf varchar(11) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE role (
  authority varchar(255) NOT NULL,
  PRIMARY KEY (authority)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE user_roles (
  user_id varchar(36) NOT NULL,
  roles_authority varchar(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (roles_authority) REFERENCES role(authority)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
