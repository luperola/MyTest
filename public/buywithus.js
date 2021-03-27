async function verify() {
    document.getElementById('fillformbuy').style.display = 'none';
    document.getElementById('tablebuy').style.display = 'block';
    const verifyName = document.getElementById("first_name").value;
    const verifyLastName = document.getElementById("last_name").value;
    const verifyEmail = document.getElementById("email").value;
    const verifyCompany = document.getElementById("company").value;
    const verifyRole = document.getElementById("role").value;
    const verifyOEM = document.getElementById("oem").value;
    const verifyModel = document.getElementById("model").value;
    const verifyDetails = document.getElementById("details").value;
    const verifyPriceFrom = document.getElementById("priceFrom").value;
    const verifyPriceTo = document.getElementById("priceTo").value;
    const verifySize = document.getElementById("size").value;
    const verifyCondition = document.getElementById("condition").value;

    const page = {
        Name: verifyName + " " + verifyLastName,
        Email: verifyEmail,
        Company: verifyCompany,
        Role: verifyRole,
        OEM: verifyOEM,
        Model: verifyModel,
        Description: verifyDetails,
        Price: 'from:' + verifyPriceFrom + ' to:' + verifyPriceTo,
        Size: verifySize,
        Conditions: verifyCondition
    };

    document.getElementById('nameb').innerHTML = page.Name;
    document.getElementById('emailb').innerHTML = page.Email;
    document.getElementById('companyb').innerHTML = page.Company;
    document.getElementById('roleb').innerHTML = page.Role;
    document.getElementById('oemb').innerHTML = page.OEM;
    document.getElementById('modelb').innerHTML = page.Model;
    document.getElementById('detailsb').innerHTML = page.Description;
    document.getElementById('priceb').innerHTML = page.Price;
    document.getElementById('sizeb').innerHTML = page.Size;
    document.getElementById('conditionb').innerHTML = page.Conditions;

    const buy = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page)
    };

    const resp = await fetch('/buywus', buy);
    const json_buy = await resp.json();
    //console.log("resp ", json_buy.Email);
    if (json_buy.Email != '' && json_buy.Name != '' && json_buy.OEM != '' && json_buy.Model != '') {
        //document.getElementById('btnDownload').click();
    } else {
        alert('you didn\'t fill all mandatory fields');
    };
};

function postWebUpload() {
    document.getElementById('btnDownload').click();
};