function CustomerDTO(id, name, address, salary) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __salary = salary;

    this.getCustomerId = function () {
        return __id;
    }

    this.setCustomerId = function (v) {
        __id = v;
    }

    this.getCustomerName = function () {
        return __name;
    }

    this.setCustomerName = function (v) {
        __name = v;
    }

    this.getCustomerAddress = function () {
        return __address;
    }

    this.setCustomerAddress = function (v) {
        __address = v;
    }

    this.getCustomerSalary = function () {
        return __salary;
    }

    this.setCustomerSalary = function (v) {
        __salary = v;
    }

}