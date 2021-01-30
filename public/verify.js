let paragraph, paragraph1;
let passData = [];
var verified = sessionStorage.getItem("verified");
verified = verified.split(',');

for (let j = 0; j < verified.length - 1; j++) {
    paragraph = document.createElement("P");
    paragraph.id = 'demo';
    switch (j) {
        case 0:
            var text0 = document.createTextNode("First Name: ");
            var text = document.createTextNode(verified[0]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;
        case 1:
            var text0 = document.createTextNode("Last Name: ");
            var text = document.createTextNode(verified[1]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;
        case 2:
            var text0 = document.createTextNode("Company: ");
            var text = document.createTextNode(verified[2]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;
        case 3:
            var text0 = document.createTextNode("Role: ");
            var text = document.createTextNode(verified[3]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 4:
            var text0 = document.createTextNode("E mail: ");
            var text = document.createTextNode(verified[4]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 5:
            var text0 = document.createTextNode("OEM: ");
            var text = document.createTextNode(verified[5]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 6:
            var text0 = document.createTextNode("Model: ");
            var text = document.createTextNode(verified[6]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 7:
            var text0 = document.createTextNode("S/N: ");
            var text = document.createTextNode(verified[7]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 8:
            var text0 = document.createTextNode("Vintage: ");
            var text = document.createTextNode(verified[8]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 9:
            var text0 = document.createTextNode("Wafer size: ");
            var text = document.createTextNode(verified[9]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 10:
            var text0 = document.createTextNode("Conditions: ");
            var text = document.createTextNode(verified[10]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 11:
            var text0 = document.createTextNode("Availability: ");
            var text = document.createTextNode(verified[11]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;

        case 12:
            var text0 = document.createTextNode("Other details: ");
            var text = document.createTextNode(verified[12]);
            paragraph.appendChild(text0);
            paragraph.appendChild(text);
            break;
        default:
            break;

    };
    var space = document.createElement("br");
    paragraph.appendChild(space);
    var hr = document.createElement("hr");
    paragraph.appendChild(hr);
    divID.appendChild(paragraph);
    paragraph.style.color = "darkblue";
};
getFile();
addButton();

async function getFile() {
    const res = await fetch('/filename');
    const risposta = await res.json();
    Promise.resolve(risposta).then(value => {
        data = value;
        for (let i = 0; i < data.length; i++) {
            var element = data[i];
            passData.push(element);
        };
        if (data.length == 0) {
            var text0 = document.createTextNode("File(s) Name: no files uploaded");
        } else {
            text0 = document.createTextNode("File(s) Name: ");
        };
        /* if (data.length > 5) {
            alert('Number of pictures > 5');
            window.open('sell.html');
        }; */
        var text = document.createTextNode(passData);
        paragraph.appendChild(text0);
        paragraph.appendChild(text);
        var space = document.createElement("br");
        paragraph.appendChild(space);
        var hr = document.createElement("hr");
        paragraph.appendChild(hr);
        paragraph.style.color = "darkblue";
    });
};
document.body.appendChild(divID);

function addButton() {
    var button = document.createElement("Button");
    var textForButton = document.createTextNode("Send");
    button.appendChild(textForButton);
    button.className += "btn btn-primary";
    paragraph1 = document.createElement("P")
    paragraph1.appendChild(button);
    divID.appendChild(paragraph1);
    button.addEventListener('click', async() => {
        const postVerify = { verified, passData, };
        const optionsVerify = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postVerify)
        };
        const resp_verify = await fetch('/verify', optionsVerify);
        const json_verify = await resp_verify.json();
        console.log(json_verify);
        sessionStorage.setItem('webCreation', JSON.stringify(json_verify));
        if (typeof(json_verify) === 'object') {
            document.location.href = 'writetext.html';
        } else {
            alert('error in your request. Try again');
        }

    });
};