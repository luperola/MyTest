var tableData = sessionStorage.getItem("verified");
tableData = tableData.split(',');
document.getElementById("name").innerText = tableData[0] + " " + tableData[1];
document.getElementById("email").innerText = tableData[2];
document.getElementById("company").innerText = tableData[3];
document.getElementById("role").innerText = tableData[4];
document.getElementById("oem").innerText = tableData[5];
document.getElementById("details").innerText = tableData[6];
document.getElementById("price").innerText = 'From $ ' + tableData[7] + 'To $ ' + tableData[8];
document.getElementById("size").innerText = tableData[9];
document.getElementById("condition").innerText = tableData[10];