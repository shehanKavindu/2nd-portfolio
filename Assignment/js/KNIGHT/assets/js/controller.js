let value="";
$("#btnClear").click(function () {
    $("#txtInput").val("");
    value = "";
});
$("#num0").click(function () {
    $("#txtInput").val($("#txtInput").val() + 0);
});

$("#num1").click(function () {
    $("#txtInput").val($("#txtInput").val() + 1);
});

$("#num2").click(function () {
    $("#txtInput").val($("#txtInput").val() + 2);
});

$("#num3").click(function () {
    $("#txtInput").val($("#txtInput").val() + 3);
});

$("#num4").click(function () {
    $("#txtInput").val($("#txtInput").val() + 4);
});

$("#num5").click(function () {
    $("#txtInput").val($("#txtInput").val() + 5);
});

$("#num6").click(function () {
    $("#txtInput").val($("#txtInput").val() + 6);
});

$("#num7").click(function () {
    $("#txtInput").val($("#txtInput").val() + 7);
});

$("#num8").click(function () {
    $("#txtInput").val($("#txtInput").val() + 8);
});

$("#num9").click(function () {
    $("#txtInput").val($("#txtInput").val() + 9);
});

$("#numMin").click(function () {
    value += $("#txtInput").val() + "-";
    $("#txtInput").val("");
});

$("#numPlus").click(function () {
    value += $("#txtInput").val() + "+";
    $("#txtInput").val("");
});

$("#numMul").click(function () {
    value += $("#txtInput").val() + "*";
    $("#txtInput").val("");
});

$("#numDiv").click(function () {
    value += $("#txtInput").val() + "/";
    $("#txtInput").val("");
});

$("#numDot").click(function () {
    $("#txtInput").val($("#txtInput").val() + ".");
});

$("#numEq").click(function () {
    value += ($("#txtInput").val());
    $("#txtInput").val(eval(value));
    console.log(value)
    value="";
});