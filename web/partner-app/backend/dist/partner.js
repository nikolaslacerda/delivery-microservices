"use strict";
exports.__esModule = true;
exports.partners = exports.Partner = void 0;
var Partner = /** @class */ (function () {
    function Partner(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    Partner.prototype.matches = function (partner) {
        return partner !== undefined && partner.email === this.email && partner.password === this.password;
    };
    return Partner;
}());
exports.Partner = Partner;
exports.partners = {
    'nikolas@email.com': new Partner(1, 'nikolas@email.com', '1234'),
    'john@email.com': new Partner(2, 'john@email.com', '1234')
};
