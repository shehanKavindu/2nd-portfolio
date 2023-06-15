function ItemDTO(code,name,price,qty,discount){
    var __code=code;
    var __name=name;
    var __price=price;
    var __qty=qty;

    this.getItemCode = function () {
        return __code;
    }

    this.setItemCode = function (v) {
        __code = v;
    }

    this.getItemName = function () {
        return __name;
    }

    this.setItemName = function (v) {
        __name = v;
    }

    this.getItemPrice = function () {
        return __price;
    }

    this.setItemPrice = function (v) {
        __price = v;
    }

    this.getItemQty = function () {
        return __qty;
    }

    this.setItemQty = function (v) {
        __qty = v;
    }



}