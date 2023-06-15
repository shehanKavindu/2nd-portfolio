
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$('#txtOrderDate').val(today);

$("#btnAddItem").click(function () {
    let orderId=$("#txtOrderId").val();
    let itemID=$("#cmbItemId").val();
    let name=$("#txtOrderItemName").val();
    var price=$("#txtOrderItemPrice").val();
    var qtyOnHand=$("#txtOrderQtyOnHand").val();
    var qty=$("#txtOrderQty").val();
    var itemTotal=price*qty;

    let previousItemTotal = $("#txtTotal").val();
    var total=(+itemTotal)+(+previousItemTotal);


    let item = checkItemExist(itemID);
    if (item) {
        if ((+item.qty)+(+qty)<=qtyOnHand){
            item.qty=(+item.qty)+(+qty);
            item.total=(+item.total)+(+itemTotal);

            $("#txtTotal").val(total.toFixed(2));
        }else {
            alert("Numbers of order quantity are limit");
        }

    }else {
        if (+qty <=qtyOnHand) {
            var tempObj = {
                itemId: itemID,
                name: name,
                price: price,
                qty: qty,
                total: itemTotal
            }
            tempDB.push(tempObj);
            $("#txtTotal").val(total.toFixed(2));
        } else {
            alert("Numbers of order quantity are limit");
        }
    }
    loadCart();
    $("#txtDiscount").prop('disabled',false);


});

$("#btnPlaceOrder").click(function () {
    saveOrderDetails();
    placeOrder();
    clearAllDetails();
    loadAllOrderTable();


});





function loadAllCustomerIds() {
    $("#cmbCustomerId").empty();
    for (var i of customerDB) {
        let id = `<option>${i.getCustomerId()}</option>`
        $("#cmbCustomerId").append(id);
    }
}

function loadAllItemIds() {
    $("#cmbItemId").empty();
    for (var i of itemDB) {
        let code = `<option>${i.getItemCode()}</option>`
        $("#cmbItemId").append(code);
    }
}

function generateOrderId() {
    if (orderDB.length == 0) {
        $("#txtOrderId").val("OID-001")
    } else {
        var tempId = orderDB.length;
        var id;

        if (tempId <= 9) {
            id = `OID-00${++tempId}`;
        } else if (tempId <= 99) {
            id = `OID-0${++tempId}`;
        } else {
            id = `OID-${++tempId}`;
        }

        $("#txtOrderId").val(id)

    }

}

function loadCart() {
    $("#addItemTable").empty();

    for (var i of tempDB){
        let row = `<tr><td>${i.itemId}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
        $("#addItemTable").append(row);
    }
}

function checkItemExist(id) {
    for (var i = 0; i < tempDB.length; i++) {
        if (tempDB[i].itemId == id) {
            return tempDB[i];
        }
    }
}

function placeOrder() {
    let orderId = $("#txtOrderId").val();
    let cusId = $("#cmbCustomerId").val();
    let date = $("#txtOrderDate").val();
    let total = $("#txtSubTotal").val();
    let discount = $("#txtDiscount").val();

    var order=new OrderDTO(orderId,cusId,date,total,discount);
    orderDB.push(order);
    alert("Order Placed Successfully")

    $("#txtOrderCount").text(orderDB.length);

}

function updateItemQty(id,qty) {
    for (var i=0;i< itemDB.length;i++){
        if (itemDB[i].getItemCode()==id){
            let itemQty = itemDB[i].getItemQty();
            itemDB[i].setItemQty((+itemQty)-(+qty))
        }
    }
}

function saveOrderDetails() {
    let orderId=$("#txtOrderId").val();
    for (var i of tempDB){
        var orderDetail=OrderDetailDTO(orderId,i.itemId,i.qty,i.total);
        orderDetailsDB.push(orderDetail);
        updateItemQty(i.itemId,i.qty);
    }
}

function clearAllDetails() {
    generateOrderId();
    $("#txtOrderCustomerName,#txtOrderSalary,#txtOrderAddress,#txtOrderItemName,#txtOrderItemPrice,#txtOrderQtyOnHand,#txtOrderQty,#txtTotal,#txtSubTotal,#txtCash,#txtDiscount,#txtBalance").val("");
    $("#btnAddItem,#btnPlaceOrder").prop('disabled',true);
    $("#txtDiscount,#txtCash").prop('disabled',true);
    tempDB.splice(0,tempDB.length);
    $("#addItemTable").empty()
}

function findCustomerName(id) {
    for (var i=0;i<customerDB.length;i++){
        if (customerDB[i].getCustomerId()==id){
            return customerDB[i].getCustomerName();
        }
    }
}









function activeAddItemBtn() {
    if ($("#txtOrderItemName").val().length!==0 && $("#txtOrderQty").val().length!==0) {
        $("#btnAddItem").prop('disabled', false);
    }
}

function activePurchaseBtn() {
    if ($("#txtOrderCustomerName").val().length!==0 && $("#txtBalance").val().length!==0 && tempDB.length!==0){
        $("#btnPlaceOrder").prop('disabled', false);
    }else {
        $("#btnPlaceOrder").prop('disabled', true);
    }
}

$("#txtOrderQty").keyup(function (){
    if ($("#txtOrderQty").val() >0){
        activeAddItemBtn();
    }else{
        $("#btnAddItem").prop('disabled', true);
    }
});

$("#txtOrderDate").keyup(function (){
    activePurchaseBtn();
});

$("#txtCash").keyup(function (event){
    if (event.key=="Enter"){
        if ($("#txtCash").val().length!==0){
            var cash=$("#txtCash").val();
            var subTotal=$("#txtSubTotal").val();

            var balance = (+cash)-(+subTotal);
            $("#txtBalance").val(balance.toFixed(2));

            activePurchaseBtn();
        }
    }
});

$("#txtDiscount").keyup(function (event){
    if (event.key=="Enter"){
        if ($("#txtDiscount").val().length!==0){
            var total=$("#txtTotal").val();
            var discount=$("#txtDiscount").val();

            var subTotal=total-(total*(discount/100));
            $("#txtSubTotal").val(subTotal.toFixed(2));
            $("#txtCash").prop('disabled',false);

        }
    }
});

$("#txtBalance").keyup(function (){
    activePurchaseBtn();
});

$("#cmbCustomerId").click(function () {
    var cusId = $("#cmbCustomerId").val();
    let customer = searchCustomer(cusId);

    $("#txtOrderCustomerName").val(customer.getCustomerName());
    $("#txtOrderAddress").val(customer.getCustomerAddress());
    $("#txtOrderSalary").val(customer.getCustomerSalary());

    activePurchaseBtn();
});

$("#cmbItemId").click(function () {
    var itemCode = $("#cmbItemId").val();
    let item = searchItem(itemCode);

    $("#txtOrderItemName").val(item.getItemName());
    $("#txtOrderQtyOnHand").val(item.getItemQty());
    $("#txtOrderItemPrice").val(item.getItemPrice());

    activeAddItemBtn();
});








