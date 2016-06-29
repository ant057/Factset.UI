"use strict";
var Industries = (function () {
    function Industries() {
    }
    Object.defineProperty(Industries.prototype, "industries", {
        get: function () {
            return [
                { "id": 1, "name": 'Industrial' },
                { "id": 2, "name": 'Utility' },
                { "id": 3, "name": 'Transportation' },
                { "id": 4, "name": 'Bank' },
                { "id": 4, "name": 'Insurance' },
                { "id": 4, "name": 'Other Financial' }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return Industries;
}());
exports.Industries = Industries;
//# sourceMappingURL=industries.data.js.map