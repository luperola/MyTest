var passList = JSON.parse(sessionStorage.getItem("json"));
console.log(passList);

let published = [];
let btnFinal = [];
const searchstring = sessionStorage.getItem("searchstring");
//console.log("searchstring", searchstring);
document.title = "Page searching " + searchstring.toString();

window.addEventListener('load', () => {

    var equip = sessionStorage.getItem('item');
    const web_link = JSON.parse(sessionStorage.getItem("shortlist"));
    for (let index = 0; index < passList.length; index++) {
        console.log("web=", web_link[index]);
    }

    for (let i = 0; i < passList.length; i++) {
        if (equip == passList[i].argument) {
            published.push(passList[i].argument);
        };
    };
    for (let ij = 0; ij < web_link.length; ij++) {
        btnFinal.push("btn" + ij);
    };
    //console.log(btnFinal);

    for (let ii = 0; ii < web_link.length; ii++) {
        // Adding a paragraph to divID class
        var paragraph = document.createElement("P");
        paragraph.id = "textArea";
        equip = equip.toUpperCase();
        var text = equip.replace(/[0-9]{1,3} offers/, "");
        //text = document.createTextNode(equip.toUpperCase());
        text = document.createTextNode(text);

        console.log('text', text);
        paragraph.appendChild(text);

        // Adding horizontal tag
        var hr = document.createElement("hr");

        // Adding a button
        var button = document.createElement("Button");
        var textForButton = document.createTextNode("More details");
        button.appendChild(textForButton);

        button.style = "position: absolute; right: 0px;";
        button.className += "btn btn-primary";
        // assign button the id
        button.id = btnFinal[ii];

        paragraph.appendChild(button);
        divID2.appendChild(paragraph);
        divID2.appendChild(hr);
        paragraph.style.color = "darkblue";

        // Appending the div element to body
        document.body.appendChild(divID2);

        document.getElementById(`${btnFinal[ii]}`).addEventListener("click", () => {
            window.open(web_link[ii]);
        });

    };

});