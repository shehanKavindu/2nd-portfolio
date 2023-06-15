var regExItemID = /^(I00-)[0-9]{3,4}$/;
var regExItemName = /^[A-z\s+]{3,50}$/;
var regExItemQty = /^[1-9][0-9]*([.][0-9]{2})?$/;
var regExItemPrice = /^[1-9][0-9]*([.][0-9]{2})?$/;



function checkNewItemValidation() {
    let inputItemId = $("#txtItemId").val();
    let inputItemName = $("#txtItemName").val();
    let inputItemQty = $("#txtItemQty").val();
    let inputItemPrice = $("#txtItemPrice").val();

    if (regExItemID.test(inputItemId)) {
        if (regExItemName.test(inputItemName)) {
            if (regExItemQty.test(inputItemQty)) {
                if (regExItemPrice.test(inputItemPrice)) {
                    $("#btnItemSave").prop('disabled', false);
                }
            }
        }
    }
}

$("#txtItemId").keyup(function () {
    let inputItemId = $("#txtItemId").val();
    if (regExItemID.test(inputItemId)) {
        $("#txtItemId").css('border', '2px solid blue');
        $("#lblItemId").text("");

        checkNewItemValidation();
        $("#txtItemId").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtItemName").focus();
            }
        });
    } else {
        $("#txtItemId").css('border', '2px solid red');
        $("#lblItemId").text("Item ID is a required I00-000");
        $("#btnItemSave").prop('disabled', true);

    }
});

$("#txtItemName").keyup(function () {
    let inputItemName = $("#txtItemName").val();
    if (regExItemName.test(inputItemName)) {
        $("#txtItemName").css('border', '2px solid blue');
        $("#lblItemName").text("");

        checkNewItemValidation();
        $("#txtItemName").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtItemPrice").focus();
            }
        });

    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#lblItemName").text("Item Name is a required Minimum 5, Max 20");

        $("#btnItemSave").prop('disabled', true);

    }
});

$("#txtItemPrice").keyup(function () {
    let inputItemPrice = $("#txtItemPrice").val();
    if (regExItemPrice.test(inputItemPrice)) {
        $("#txtItemPrice").css('border', '2px solid blue');
        $("#lblItemPrice").text("");

        checkNewItemValidation();
        $("#txtItemPrice").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtItemQty").focus();
            }
        });

    } else {
        $("#txtItemPrice").css('border', '2px solid red');
        $("#lblItemPrice").text("Item Price is a required 100.00 or 100");

        $("#btnItemSave").prop('disabled', true);

    }
});

$("#txtItemQty").keyup(function () {
    let inputItemQty = $("#txtItemQty").val();
    if (regExItemQty.test(inputItemQty)) {
        $("#txtItemQty").css('border', '2px solid blue');
        $("#lblItemQty").text("");

        checkNewItemValidation()
        $("#txtItemQty").keydown(function (event) {
            if (event.key == "Enter") {
                $("#btnItemSave").focus();
            }
        });
    } else {
        $("#txtItemQty").css('border', '2px solid red');
        $("#lblItemQty").text("Item Qty is a required Minimum 1");

        $("#btnItemSave").prop('disabled', true);
    }
});


function checkUpdateItemValidation() {
    let inputItemName = $("#itemName").val();
    let inputItemPrice = $("#itemPrice").val();
    let inputItemQty = $("#itemQtyOnHand").val();

    if (regExItemName.test(inputItemName)) {
        if (regExItemQty.test(inputItemQty)) {
            if (regExItemPrice.test(inputItemPrice)) {
                $("#btnItemUpdate").prop('disabled', false);
            }
        }
    }
}

$("#itemName").keyup(function () {
    let inputItemName = $("#itemName").val();
    if (regExItemName.test(inputItemName)) {
        $("#itemName").css('border', '2px solid blue');
        checkUpdateItemValidation()
        $("#itemName").keydown(function (event) {
            if (event.key == "Enter") {
                $("#itemQtyOnHand").focus();
            }
        });

    } else {
        $("#itemName").css('border', '2px solid red');
        $("#btnItemUpdate").prop('disabled', true);

    }
});

$("#itemQtyOnHand").keyup(function () {
    let inputItemQty = $("#itemQtyOnHand").val();
    if (regExItemQty.test(inputItemQty)) {
        $("#itemQtyOnHand").css('border', '2px solid blue');
        checkUpdateItemValidation()
        $("#itemQtyOnHand").keydown(function (event) {
            if (event.key == "Enter") {
                $("#itemPrice").focus();
            }
        });

    } else {
        $("#itemQtyOnHand").css('border', '2px solid red');
        $("#btnItemUpdate").prop('disabled', true);

    }
});

$("#itemPrice").keyup(function () {
    let inputItemPrice = $("#itemPrice").val();
    if (regExItemPrice.test(inputItemPrice)) {
        $("#itemPrice").css('border', '2px solid blue');
        checkUpdateItemValidation()
        $("#itemPrice").keydown(function (event) {
            if (event.key == "Enter") {
                $("#btnItemUpdate").focus();
            }
        });
    } else {
        $("#itemPrice").css('border', '2px solid red');
        $("#btnCustomerUpdate").prop('disabled', true);
    }
});




$("#btnItemSave").click(function () {
    saveItem();
    clearAllItemDetails();
    loadAllItem();
    loadAllItemIds();


    $("#itemTable>tr").off("click");

    $("#itemTable>tr").click(function () {

        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemUnitPrice = $(this).children(":eq(3)").text();

        $("#itemId").val(itemId)
        $("#itemName").val(itemName)
        $("#itemQtyOnHand").val(itemQty)
        $("#itemPrice").val(itemUnitPrice)
    });
});

$("#btnItemUpdate").click(function () {
    updateItem();
});

$("#btnItemDelete").click(function () {
    var itemId = $("#itemId").val();
    var response = searchItem(itemId);

    let index = itemDB.indexOf(response);
    let res = confirm("Do you really need to delete this item ?");
    if (res) {
        deleteItem(index);
    }
});

$("#btnItemSearch").click(function () {
    var searchID = $("#txtItemSearch").val();

    var response = searchItem(searchID);
    if (response) {
        $("#itemId").val(response.getItemCode());
        $("#itemName").val(response.getItemName());
        $("#itemQtyOnHand").val(response.getItemQty());
        $("#itemPrice").val(response.getItemPrice());

        $('#itemName,#itemPrice,#itemQtyOnHand').prop('disabled', false);
        $("#btnItemDelete").prop('disabled', false);

    } else {
        clearAllItemDetails();
        alert("No such a Customer")
    }
});




function saveItem() {

    //get item details from user inputs
    let itemID = $("#txtItemId").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    //create customer object
    var item=new ItemDTO(itemID,itemName,itemPrice,itemQty);

    itemDB.push(item);


}

function clearAllItemDetails() {
    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice,#txtItemSearch').val("");
    $('#itemId,#itemName,#itemQtyOnHand,#itemPrice').val("");

    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').css('border', '2px solid #ced4da');
    $('#itemId,#itemName,#itemQtyOnHand,#itemPrice').css('border', '2px solid #ced4da');

    $('#txtItemId').focus();

    $('#btnItemSave,#btnItemUpdate,#btnItemDelete').prop('disabled', true);
    $('#itemName,#itemPrice,#itemQtyOnHand').prop('disabled', true);

}

function loadAllItem() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function searchItem(id) {
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == id) {
            return itemDB[i];
        }
    }
}

function updateItem() {
    let itemName = $("#itemName").val();
    let itemQty = $("#itemQtyOnHand").val();
    let itemPrice = $("#itemPrice").val();

    var itemId = $("#itemId").val();
    var response = searchItem(itemId);
    let index = itemDB.indexOf(response);

    itemDB[index].setItemName(itemName);
    itemDB[index].setItemQty(itemQty);
    itemDB[index].setItemPrice(itemPrice);

    clearAllItemDetails();
    loadAllItem();
}

function deleteItem(index) {
    itemDB.pop(index);

    clearAllItemDetails();
    loadAllItem();

    $("#txtItemCount").text(itemDB.length);


}