"use strict";
exports.__esModule = true;
exports.partners = exports.users = exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, email, name, password, role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
    }
    User.prototype.matches = function (user) {
        return user !== undefined && user.email === this.email && user.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'nikolas@email.com': new User('1', 'nikolas@email.com', 'Nikolas', '1234', 'PARTNER'),
    'john@email.com': new User('2', 'john@email.com', 'John', '1234', 'PARTNER')
};
exports.partners = {
    'nikolas@email.com': new User('1', 'nikolas@email.com', 'Nikolas', '1234', 'PARTNER'),
    'john@email.com': new User('2', 'john@email.com', 'John', '1234', 'PARTNER')
};
