function verify() {
    document.getElementById('filename').disabled = false;
    document.getElementById('upload').disabled = false;
    document.getElementById('submit').disabled = false;
    let page = [];
    const verifyName = document.getElementById("first_name").value;
    const verifyLastName = document.getElementById("last_name").value;
    const verifyCompany = document.getElementById("company").value;
    const verifyRole = document.getElementById("role").value;
    const verifyEmail = document.getElementById("email").value;
    const verifyOEM = document.getElementById("oem").value;
    const verifyModel = document.getElementById("model").value;
    const verifySN = document.getElementById("sn").value;
    const verifyVintage = document.getElementById("vintage").value;
    const verifySize = document.getElementById("size").value;
    const verifyConditions = document.getElementById("conditions").value;
    const verifyAvailability = document.getElementById("availability").value;
    const verifyDetails = document.getElementById("details").value;
    const verifyUpload = document.getElementById("upload").value;
    page.push(verifyName, verifyLastName, verifyCompany, verifyRole, verifyEmail, verifyOEM, verifyModel,
        verifySN, verifyVintage, verifySize, verifyConditions, verifyAvailability, verifyDetails, verifyUpload)

    getFile();
    async function getFile() {
        const res = await fetch('/filename');
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
    };

    //console.log("array.page", page);
    //console.log('filedata', data);
    sessionStorage.setItem("verified", page);
    //sessionStorage.setItem('filenames', data);
};