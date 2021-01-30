var data_forweb = JSON.parse(sessionStorage.getItem('webCreation'));
//console.log('data from verify:', data_forweb);
var description = document.getElementById('description');
description.innerHTML += 'Manufacturer: ' + data_forweb.data_verify.verified[5] + '</br>'
description.innerHTML += 'Model: ' + data_forweb.data_verify.verified[6] + '</br>';
description.innerHTML += 'S/N: ' + data_forweb.data_verify.verified[7] + '</br>';
description.innerHTML += 'Vintage: ' + data_forweb.data_verify.verified[8] + '</br>';
description.innerHTML += 'Wafer Size: ' + data_forweb.data_verify.verified[9] + '</br>';
description.innerHTML += 'Conditions: ' + data_forweb.data_verify.verified[10] + '</br>';
description.innerHTML += 'Availability: ' + data_forweb.data_verify.verified[11] + '</br>';
description.innerHTML += 'Other details: ' + data_forweb.data_verify.verified[12];

if (data_forweb.data_verify.passData.length == 0) {
    var foto = './img/NoPicture.jpg';
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('foto').src = URL.createObjectURL(blob);
    };
};

if (data_forweb.data_verify.passData.length != 0) {
    var foto = './img/' + data_forweb.data_verify.passData[0];
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('foto').src = URL.createObjectURL(blob);
    };
};

if (data_forweb.data_verify.passData[1] != undefined) {
    var foto = './img/' + data_forweb.data_verify.passData[1];
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('pic1').src = URL.createObjectURL(blob);
    };
};

if (data_forweb.data_verify.passData[2] != undefined) {
    var foto = './img/' + data_forweb.data_verify.passData[2];
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('pic2').src = URL.createObjectURL(blob);
    };
};

if (data_forweb.data_verify.passData[3] != undefined) {
    var foto = './img/' + data_forweb.data_verify.passData[1];
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('pic3').src = URL.createObjectURL(blob);
    };
};

if (data_forweb.data_verify.passData[4] != undefined) {
    var foto = './img/' + data_forweb.data_verify.passData[1];
    getFoto();
    async function getFoto() {
        const havefoto = await fetch(foto);
        const blob = await havefoto.blob();
        document.getElementById('pic4').src = URL.createObjectURL(blob);
    };
};

function Confirm() {
    var r = confirm("Confirm to post the equipment?");
    if (r == true) {
        document.location.href = 'index.html'
    } else {
        document.location.href = 'sell.html'
    }
}