var pageNew;

async function verify() {
    document.getElementById('fill').style.display = 'none'
    document.getElementById('table').style.display = 'block';
    document.getElementById('fileUpload').style.display = 'none';
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

    const pageSell = {
        Name: verifyName + " " + verifyLastName,
        Email: document.getElementById("email").value,
        Company: verifyCompany,
        Role: verifyRole,
        OEM: verifyOEM,
        Model: verifyModel,
        Description: verifyDetails,
        Price: '$ ' + verifyPrice,
        Location: verifyLocation,
        Size: verifySize,
        Vintage: verifyVintage,
        SN: verifySN,
        Conditions: verifyCondition
    };
    document.getElementById("namet").innerHTML = pageSell.Name;
    document.getElementById("emailt").innerHTML = pageSell.Email;
    document.getElementById("companyt").innerText = pageSell.Company;
    document.getElementById("rolet").innerText = pageSell.Role;
    document.getElementById("oemt").innerText = pageSell.OEM;
    document.getElementById("modelt").innerText = pageSell.Model;
    document.getElementById("detailst").innerText = pageSell.Description;
    document.getElementById("pricet").innerText = pageSell.Price;
    document.getElementById("locationt").innerText = pageSell.Location;
    document.getElementById("sizet").innerText = pageSell.Size;
    document.getElementById("vintaget").innerText = pageSell.Vintage;
    document.getElementById("snt").innerText = pageSell.SN;
    document.getElementById("conditiont").innerText = pageSell.Conditions;
    document.getElementById('table').style.left = '20px';
    document.getElementById('btnSend').style.display = 'block';
    pageNew = pageSell;
};

function Option1() {
    verify();
    sessionStorage.setItem("verified", JSON.stringify(pageNew));
    document.location = "selldetailsupload.html";

};

function Option2() {
    document.getElementById("btnSend").style.display = "block";
};

function postWeb() {
    document.getElementById('table').style.display = 'none';
    document.getElementById('btnPost').click();
    //console.log('pagePost', pageNew.Name);
};

function fileDownload() {
    document.getElementById('btnDownload').click();
};