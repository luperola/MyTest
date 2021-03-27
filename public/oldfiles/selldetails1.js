let page = [];

function verify() {
    const verifyName = document.getElementById("first_name").value;
    const verifyLastName = document.getElementById("last_name").value;
    const verifyEmail = document.getElementById("email").value;
    const verifyCompany = document.getElementById("company").value;
    const verifyRole = document.getElementById("role").value;
    const verifyOEM = document.getElementById("oem").value;
    const verifyModel = document.getElementById("model").value;
    const verifyDetails = document.getElementById("details").value;
    const verifyPrice = document.getElementById("price").value;
    const verifyLocation = document.getElementById("location").value;
    const verifySize = document.getElementById("size").value;
    const verifyVintage = document.getElementById("vintage").value;
    const verifySN = document.getElementById("sn").value;
    const verifyCondition = document.getElementById("condition").value;
    page.push(verifyName, verifyLastName, verifyEmail, verifyCompany, verifyRole, verifyOEM, verifyModel,
        verifyDetails, verifyPrice, verifyLocation, verifySize, verifyVintage, verifySN, verifyCondition)

    for (let index = 0; index < page.length; index++) {
        page[index] = page[index].replace(",", "");
        console.log("list", page[index]);
    };
};

function Option1() {
    verify();
    //console.log(page);
    sessionStorage.setItem("verified", page);
    document.location = "selldetailsupload.html";
};

function Option2() {
    document.getElementById("btnSend").style.display = "block";
}
/* Catch();
async function Catch() {
    const prendifile = await fetch('/myname');
    console.log("prendifile", prendifile.body);
    var vabene = await prendifile.json();
    console.log("response", vabene); };*/

/* if (vabene.length === 1) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
};
if (vabene.length === 2) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
    document.getElementById('image1').src = '/uploads/' + vabene[1];
};

if (vabene.length === 3) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
    document.getElementById('image1').src = '/uploads/' + vabene[1];
    document.getElementById('image2').src = '/uploads/' + vabene[2];
};
if (vabene.length === 4) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
    document.getElementById('image1').src = '/uploads/' + vabene[1];
    document.getElementById('image2').src = '/uploads/' + vabene[2];
    document.getElementById('image3').src = '/uploads/' + vabene[3];
};
if (vabene.length === 5) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
    document.getElementById('image1').src = '/uploads/' + vabene[1];
    document.getElementById('image2').src = '/uploads/' + vabene[2];
    document.getElementById('image3').src = '/uploads/' + vabene[3];
    document.getElementById('image4').src = '/uploads/' + vabene[4];
};
if (vabene.length > 5) {
    document.getElementById('image').src = '/uploads/' + vabene[0];
    document.getElementById('image1').src = '/uploads/' + vabene[1];
    document.getElementById('image2').src = '/uploads/' + vabene[2];
    document.getElementById('image3').src = '/uploads/' + vabene[3];
    document.getElementById('image4').src = '/uploads/' + vabene[4];
    alert("Max files loading = 5");
}; */
//};

/* getFile();
async function getFile() {
    const res = await fetch('/myname');
    const risposta = res.json();
    var data = ''
    Promise.resolve(risposta).then(value => {
        console.log('value:', value[0], value[1])
        data = value;
        console.log('array', data);
        for (let ij = 0; ij < data.length; ij++) {
            console.log(data[ij]);
        };
    })
}; */

//console.log("array.page", page);
//console.log('filedata', data);
//sessionStorage.setItem("verified", page);
//sessionStorage.setItem('filenames', data);