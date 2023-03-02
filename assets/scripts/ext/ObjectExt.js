
var $$uniqueid = 0;
if (!!Object.prototype.hasOwnProperty("$$uniqueId")) {
    Object.defineProperty(Object.prototype, "$$uniqueId", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function () {
            return ++$$uniqueid;
        }
    })
}