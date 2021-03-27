var tableData = sessionStorage.getItem("verified");
tableData = JSON.parse(tableData);
document.getElementById("namet").innerHTML = tableData.Name;
document.getElementById("emailt").innerHTML = tableData.Email;
document.getElementById("companyt").innerText = tableData.Company;
document.getElementById("rolet").innerText = tableData.Role;
document.getElementById("oemt").innerText = tableData.OEM;
document.getElementById("modelt").innerText = tableData.Model;
document.getElementById("detailst").innerText = tableData.Description;
document.getElementById("pricet").innerText = tableData.Price;
document.getElementById("locationt").innerText = tableData.Location;
document.getElementById("sizet").innerText = tableData.Size;
document.getElementById("vintaget").innerText = tableData.Vintage;
document.getElementById("snt").innerText = tableData.SN;
document.getElementById("conditiont").innerText = tableData.Conditions;


Catch();
async function Catch() {
    document.getElementById('btnSend').style.display = 'block';
    const prendifile = await fetch('/filename');
    var vabene = await prendifile.json();
    //console.log("response", vabene);
    if (vabene.length === 1) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        tableData.Pic1 = vabene[0];
    };
    if (vabene.length === 2) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        document.getElementById('image1').src = '/uploads/' + vabene[1];
        tableData.Pic1 = vabene[0];
        tableData.Pic2 = vabene[1];
    };

    if (vabene.length === 3) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        document.getElementById('image1').src = '/uploads/' + vabene[1];
        document.getElementById('image2').src = '/uploads/' + vabene[2];
        tableData.Pic1 = vabene[0];
        tableData.Pic2 = vabene[1];
        tableData.Pic3 = vabene[2];
    };
    if (vabene.length === 4) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        document.getElementById('image1').src = '/uploads/' + vabene[1];
        document.getElementById('image2').src = '/uploads/' + vabene[2];
        document.getElementById('image3').src = '/uploads/' + vabene[3];
        tableData.Pic1 = vabene[0];
        tableData.Pic2 = vabene[1];
        tableData.Pic3 = vabene[2];
        tableData.Pic4 = vabene[3];
    };
    if (vabene.length === 5) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        document.getElementById('image1').src = '/uploads/' + vabene[1];
        document.getElementById('image2').src = '/uploads/' + vabene[2];
        document.getElementById('image3').src = '/uploads/' + vabene[3];
        document.getElementById('image4').src = '/uploads/' + vabene[4];
        tableData.Pic1 = vabene[0];
        tableData.Pic2 = vabene[1];
        tableData.Pic3 = vabene[2];
        tableData.Pic4 = vabene[3];
        tableData.Pic5 = vabene[4];
    };
    if (vabene.length > 5) {
        document.getElementById('image').src = '/uploads/' + vabene[0];
        document.getElementById('image1').src = '/uploads/' + vabene[1];
        document.getElementById('image2').src = '/uploads/' + vabene[2];
        document.getElementById('image3').src = '/uploads/' + vabene[3];
        document.getElementById('image4').src = '/uploads/' + vabene[4];
        tableData.Pic1 = vabene[0];
        tableData.Pic2 = vabene[1];
        tableData.Pic3 = vabene[2];
        tableData.Pic4 = vabene[3];
        tableData.Pic5 = vabene[4];
        alert("Max files loading = 5");
    };
};
// apre il Modal
function postWebUpload() {
    document.getElementById('btnSellUpload').click();
};
// va su post.html con i dati
function Preview() {
    document.getElementById('btnPost').click();
    sessionStorage.setItem("toBePosted", JSON.stringify(tableData));
    //document.location = 'post.html';
};

function postData() {
    //var posted = sessionStorage.getItem("toBePosted");
    //posted = JSON.parse(posted);
    //console.log('posted', posted);
    datapost();
    async function datapost() {
        const makePage = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tableData)
        };
        const resp = await fetch('/postfile', makePage);
        const json_post = await resp.json();
        //console.log("response from makePage post", json_post);
    };
    document.location = 'index1.html';
}