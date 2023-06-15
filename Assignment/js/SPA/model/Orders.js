function OrderDTO(orderId,cusId,date,total,discount){
    var __orderId=orderId;
    var __cusId=cusId;
    var __date=date;
    var __total=total;
    var __discount=discount

    this.getOrderId = function () {
        return __orderId;
    }

    this.setOrderId = function (v) {
        __orderId = v;
    }

    this.getOrderCusId = function () {
        return __cusId;
    }

    this.setOrderCusId = function (v) {
        __cusId = v;
    }

    this.getOrderDate = function () {
        return __date;
    }

    this.setOrderDate = function (v) {
        __date = v;
    }

    this.getOrderTotal = function () {
        return __total;
    }

    this.setItemCode = function (v) {
        __total = v;
    }

    this.getOrderDiscount = function () {
        return __discount;
    }

    this.setOrderDiscount = function (v) {
        __discount = v;
    }

}