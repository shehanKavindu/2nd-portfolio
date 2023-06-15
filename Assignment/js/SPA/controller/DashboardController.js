$("#btnOrderSearch").click(function (){
    var searchID = $("#txtOrderSearch").val();

    var response = searchOrder(searchID);
    if (response) {
        $("#homeOrderId").val(response.getOrderId());
        $("#homeOrderDate").val(response.getOrderDate());
        $("#homeDiscount").val(response.getOrderDiscount());
        $("#homeCost").val(response.getOrderTotal());
        $("#homeCustomerName").val(findCustomerName(response.getOrderCusId()));

        $("#btnDeleteOrder").prop('disabled', false);
    } else {
        clearAllOrderDetails();
        alert("No such a Order")
    }
});

$("#btnDeleteOrder").click(function (){
    var orderId = $("#homeOrderId").val();
    var response = searchOrder(orderId);

    let index = orderId.indexOf(response);
    let res = confirm("Do you really need to delete this order ?");
    if (res) {
        deleteOrder(index);
    }
});


function searchOrder(searchID) {
    for (var i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getOrderId() == searchID) {
            return orderDB[i];
        }
    }
}

function deleteOrder(index) {
    orderDB.pop(index);
    clearAllOrderDetails();
    loadAllOrderTable();


}

function loadAllOrderTable() {
    $("#allOrderTable").empty();
    for (var i of orderDB){
        var orderId=i.getOrderId();
        var date =i.getOrderDate();
        var discount=i.getOrderDiscount();
        var cost=i.getOrderTotal();
        var cusId=i.getOrderCusId();

        let customerName = findCustomerName(cusId);
        let row = `<tr><td>${orderId}</td><td>${date}</td><td>${customerName}</td><td>${discount}</td><td>${cost}</td></tr>`;
        $("#allOrderTable").append(row);

    }
}

function clearAllOrderDetails() {
    $('#txtOrderSearch,#homeOrderId,#homeOrderDate,#homeCustomerName,#homeDiscount,#homeCost').val("");
    $("#btnDeleteOrder").prop('disabled', true);

}

