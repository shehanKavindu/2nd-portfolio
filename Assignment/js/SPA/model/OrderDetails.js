function OrderDetailDTO(orderId, itemCode, qty, cost) {
    var __orderId = orderId;
    var __itemCode = itemCode;
    var __qty = qty;
    var __cost = cost;

    this.getItemCode = function () {
        return __itemCode;
    }

    this.setItemCode = function (v) {
        __itemCode = v;
    }

    this.getOrderId = function () {
        return __orderId;
    }

    this.setOrderId = function (v) {
        __orderId = v;
    }

    this.getQuantity = function () {
        return __qty;
    }

    this.setQuantity = function (v) {
        __qty = v;
    }

    this.getCost = function () {
        return __cost;
    }

    this.setCost = function (v) {
        __cost = v;
    }
}