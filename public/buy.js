/* var input = document.getElementById("search-category");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnSearch").click();
    }
}); */

async function SearchNew() {
    document.getElementById('title').style.display = 'none';
    count += 1;
    var webString = document.getElementById("search-category").value
    webString = webString.toLowerCase();
    const data = { webString };

    let paragraph = [];
    let hr = [];
    let secondpara = [];
    let secondhr = [];
    let thirdpara = [];
    let thirdhr = [];
    let fourthpara = [];
    let fourthhr = [];
    let fifthpara = [];
    let fifthhr = [];
    let sixthpara = [];
    let sixthhr = [];

    let paraEbay = [];
    let hrEbay = [];
    let secondparaEbay = [];
    let secondhrEbay = [];
    let thirdparaEbay = [];
    let thirdhrEbay = [];
    let fourthparaEbay = [];
    let fourthhrEbay = [];
    let fifthparaEbay = [];
    let fifthhrEbay = [];
    let sixthparaEbay = [];
    let sixthhrEbay = [];

    if (count === 1) {
        // post index.js for search in dbProducts.db with first research term
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch('/search', options);
        const json_web = await resp.json();
        //console.log("risposta dal server", json_web);

        // post on ebay
        const options_ebay = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp_ebay = await fetch('/ebaysearch', options_ebay);
        const json_ebay = await resp_ebay.json();
        //console.log("risposta da ebay", json_ebay);
        // end ebay Post 

        if (json_web.length === 0 & json_ebay.length === 0) {
            alert("Nothing found. Refine your search");
        };

        sessionStorage.setItem("transfer", json_web.length);
        sessionStorage.setItem("transferEbay", json_ebay.length);
        // ALERT 
        if (json_web.length > 50) {
            alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
        };
        for (let j = 0; j < json_web.length; j++) {
            // Adding a paragraph to divID class
            paragraph[j] = document.createElement("P");
            paragraph[j].id = "textArea" + j.toString();
            if (json_web[j].supplier.includes('@')) {
                var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString() + ")");
                paragraph[j].appendChild(text);
            } else {
                var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString().slice(8) + ")");
                paragraph[j].appendChild(text);
            };

            // Adding horizontal tag
            hr[j] = document.createElement("hr");
            hr[j].id = "horizontal" + j.toString();
            // Adding a button
            var button = document.createElement("a");
            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_web[j].website.toString());
            button.setAttribute("target", '_blank');

            paragraph[j].appendChild(button);
            paragraph[j].style.color = "darkblue";
            divID.appendChild(paragraph[j]);
            divID.appendChild(hr[j]);
            document.body.appendChild(divID);
        };

        // adding ebay results to screen

        for (let j = 0; j < json_ebay.length; j++) {
            // Adding a paragraph to divID class
            paraEbay[j] = document.createElement("P");
            paraEbay[j].id = "textAreaEbay" + j.toString();;
            var text = document.createTextNode(json_ebay[(j)].title + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
            paraEbay[j].appendChild(text);

            // Adding horizontal tag
            hrEbay[j] = document.createElement("hr");
            hrEbay[j].id = "horizontalEbay" + j.toString();

            // Adding a button & set attribute
            var button = document.createElement("a");

            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_ebay[(j)].viewitem.toString());
            button.setAttribute("target", '_blank');
            paraEbay[j].appendChild(button);
            paraEbay[j].style.color = "darkblue";
            divID.appendChild(paraEbay[j]);
            divID.appendChild(hrEbay[j]);
            document.body.appendChild(divID);
        };
    };

    if (count === 2) {
        //elimino il display della prima ricerca 
        var transfer = sessionStorage.getItem("transfer");
        transfer = parseInt(transfer);
        var transferEbay = sessionStorage.getItem("transferEbay");
        transferEbay = parseInt(transferEbay);
        for (let j = 0; j < transfer; j++) {
            document.getElementById("textArea" + j.toString()).style.display = "none";
            document.getElementById("horizontal" + j.toString()).style.display = "none";
        };
        for (let j = 0; j < transferEbay; j++) {
            document.getElementById("textAreaEbay" + j.toString()).style.display = "none";
            document.getElementById("horizontalEbay" + j.toString()).style.display = "none";
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch('/search', options);
        const json_web = await resp.json();
        //console.log("risposta dal server", json_web);

        if (json_web === "alert") {
            alert("Nothing found. Try again or reduce search string words");
            Refresh();
        };

        if (json_web.length > 50) {
            alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
        };
        // post on ebay

        const options_ebay = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp_ebay = await fetch('/ebaysearch', options_ebay);
        const json_ebay = await resp_ebay.json();
        //console.log("risposta da ebay", json_ebay);
        // end ebay Post 
        if (json_web.length === 0 & json_ebay.length === 0) {
            alert("Nothing found. Refine your search");
        };

        sessionStorage.setItem("transfer1", json_web.length);
        sessionStorage.setItem("transfertwoEbay", json_ebay.length);

        for (let j = 0; j < json_web.length; j++) {
            // Adding dynamically paragraph, buttons and hr to divID class
            secondpara[j] = document.createElement("P");
            secondpara[j].id = "secondtextArea" + j.toString();
            //var text = document.createTextNode(json_web[j].equipment.toUpperCase());
            var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString().slice(8) + ")");
            secondpara[j].appendChild(text);

            // Adding horizontal tag
            secondhr[j] = document.createElement("hr");
            secondhr[j].id = "secondhorizontal" + j.toString();
            // Adding a button
            var button = document.createElement("a");
            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_web[j].website.toString());
            button.setAttribute("target", '_blank');

            secondpara[j].appendChild(button);
            secondpara[j].style.color = "darkblue";
            page2.appendChild(secondpara[j]);
            page2.appendChild(secondhr[j]);
            document.body.appendChild(page2);
        };

        // adding ebay results to screen

        for (let j = 0; j < json_ebay.length; j++) {
            // Adding a paragraph to divID class
            secondparaEbay[j] = document.createElement("P");
            secondparaEbay[j].id = "textAreatwoEbay" + j.toString();;
            var text = document.createTextNode(json_ebay[(j)].title + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
            secondparaEbay[j].appendChild(text);

            // Adding horizontal tag
            secondhrEbay[j] = document.createElement("hr");
            secondhrEbay[j].id = "horizontaltwoEbay" + j.toString();

            // Adding a button & set attribute
            var button = document.createElement("a");

            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_ebay[(j)].viewitem.toString());
            button.setAttribute("target", '_blank');
            secondparaEbay[j].appendChild(button);
            secondparaEbay[j].style.color = "darkblue";
            page2.appendChild(secondparaEbay[j]);
            page2.appendChild(secondhrEbay[j]);
            document.body.appendChild(page2);
        };
    };

    if (count === 3) {
        var again = sessionStorage.getItem("transfer1");
        again = parseInt(again);
        var transfertwoEbay = sessionStorage.getItem("transfertwoEbay");
        transfertwoEbay = parseInt(transfertwoEbay);

        for (let j = 0; j < again; j++) {
            document.getElementById("secondtextArea" + j.toString()).style.display = "none";
            document.getElementById("secondhorizontal" + j.toString()).style.display = "none";
        };

        for (let j = 0; j < transfertwoEbay; j++) {
            document.getElementById("textAreatwoEbay" + j.toString()).style.display = "none";
            document.getElementById("horizontaltwoEbay" + j.toString()).style.display = "none";
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch('/search', options);
        const json_web = await resp.json();
        //console.log("risposta dal server", json_web);

        // post on ebay
        const options_ebay = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp_ebay = await fetch('/ebaysearch', options_ebay);
        const json_ebay = await resp_ebay.json();
        //console.log("risposta da ebay", json_ebay);
        // end ebay Post 

        if (json_web.length === 0 & json_ebay.length === 0) {
            alert("Nothing found. Refine your search");
        };

        sessionStorage.setItem("transferthird", json_web.length);
        sessionStorage.setItem("transferthirdEbay", json_ebay.length);

        if (json_web == "alert") {
            alert("Not a valid search or too many search words (max 5). Try again");
            Refresh();
        };
        // ALERT 
        if (json_web.length > 50) {
            alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
        };
        for (let j = 0; j < json_web.length; j++) {
            // Adding a paragraph to divID class
            thirdpara[j] = document.createElement("P");
            thirdpara[j].id = "thirdtextArea" + j.toString();
            //var text = document.createTextNode(json_web[j].equipment.toUpperCase());
            var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString().slice(8) + ")");
            thirdpara[j].appendChild(text);

            // Adding horizontal tag
            thirdhr[j] = document.createElement("hr");
            thirdhr[j].id = "thirdhorizontal" + j.toString();
            // Adding a button
            var button = document.createElement("a");
            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_web[j].website.toString());
            button.setAttribute("target", '_blank');

            thirdpara[j].appendChild(button);
            thirdpara[j].style.color = "darkblue";
            page3.appendChild(thirdpara[j]);
            page3.appendChild(thirdhr[j]);
            document.body.appendChild(page3);
        };

        // adding ebay results to screen

        for (let j = 0; j < json_ebay.length; j++) {
            // Adding a paragraph to divID class
            thirdparaEbay[j] = document.createElement("P");
            thirdparaEbay[j].id = "textAreathreeEbay" + j.toString();;
            var text = document.createTextNode(json_ebay[(j)].title + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
            thirdparaEbay[j].appendChild(text);

            // Adding horizontal tag
            thirdhrEbay[j] = document.createElement("hr");
            thirdhrEbay[j].id = "horizontalthreeEbay" + j.toString();

            // Adding a button & set attribute
            var button = document.createElement("a");

            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_ebay[(j)].viewitem.toString());
            button.setAttribute("target", '_blank');
            thirdparaEbay[j].appendChild(button);
            thirdparaEbay[j].style.color = "darkblue";
            page3.appendChild(thirdparaEbay[j]);
            page3.appendChild(thirdhrEbay[j]);
            document.body.appendChild(page3);
        };
    };

    if (count === 4) {
        var againthird = sessionStorage.getItem("transferthird");
        againthird = parseInt(againthird);

        var transferthreeEbay = sessionStorage.getItem("transferthirdEbay");
        transferthreeEbay = parseInt(transferthreeEbay);

        for (let j = 0; j < againthird; j++) {
            document.getElementById("thirdtextArea" + j.toString()).style.display = "none";
            document.getElementById("thirdhorizontal" + j.toString()).style.display = "none";
        };

        for (let j = 0; j < transferthreeEbay; j++) {
            document.getElementById("textAreathreeEbay" + j.toString()).style.display = "none";
            document.getElementById("horizontalthreeEbay" + j.toString()).style.display = "none";
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch('/search', options);
        const json_web = await resp.json();
        //console.log("risposta dal server", json_web);

        // post on ebay
        const options_ebay = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp_ebay = await fetch('/ebaysearch', options_ebay);
        const json_ebay = await resp_ebay.json();
        //console.log("risposta da ebay", json_ebay);
        // end ebay Post 

        if (json_web.length === 0 & json_ebay.length === 0) {
            alert("Nothing found. Refine your search");
        };
        sessionStorage.setItem("transferfourth", json_web.length);
        sessionStorage.setItem("transferfourthEbay", json_ebay.length);

        if (json_web == "alert") {
            alert("Not a valid search or too many search words (max 5). Try again");
            Refresh();
        };
        // ALERT 
        if (json_web.length > 50) {
            alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
        };
        for (let j = 0; j < json_web.length; j++) {
            // Adding a paragraph to divID class
            fourthpara[j] = document.createElement("P");
            fourthpara[j].id = "fourthtextArea" + j.toString();
            //var text = document.createTextNode(json_web[j].equipment.toUpperCase());
            var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString().slice(8) + ")");
            fourthpara[j].appendChild(text);

            // Adding horizontal tag
            fourthhr[j] = document.createElement("hr");
            fourthhr[j].id = "fourthhorizontal" + j.toString();
            // Adding a button
            var button = document.createElement("a");
            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_web[j].website.toString());
            button.setAttribute("target", '_blank');

            fourthpara[j].appendChild(button);
            fourthpara[j].style.color = "darkblue";
            page4.appendChild(fourthpara[j]);
            page4.appendChild(fourthhr[j]);
            document.body.appendChild(page4);
        };
        // adding ebay results to screen

        for (let j = 0; j < json_ebay.length; j++) {
            // Adding a paragraph to divID class
            fourthparaEbay[j] = document.createElement("P");
            fourthparaEbay[j].id = "textArea4Ebay" + j.toString();;
            var text = document.createTextNode(json_ebay[(j)].title + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
            fourthparaEbay[j].appendChild(text);

            // Adding horizontal tag
            fourthhrEbay[j] = document.createElement("hr");
            fourthhrEbay[j].id = "horizontal4Ebay" + j.toString();

            // Adding a button & set attribute
            var button = document.createElement("a");

            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_ebay[(j)].viewitem.toString());
            button.setAttribute("target", '_blank');
            fourthparaEbay[j].appendChild(button);
            fourthparaEbay[j].style.color = "darkblue";
            page4.appendChild(fourthparaEbay[j]);
            page4.appendChild(fourthhrEbay[j]);
            document.body.appendChild(page4);
        };
    };

    if (count === 5) {
        var againfourth = sessionStorage.getItem("transferfourth");
        againfourth = parseInt(againfourth);

        var transferfourthEbay = sessionStorage.getItem("transferfourthEbay");
        transferfourthEbay = parseInt(transferfourthEbay);

        for (let j = 0; j < againfourth; j++) {
            document.getElementById("fourthtextArea" + j.toString()).style.display = "none";
            document.getElementById("fourthhorizontal" + j.toString()).style.display = "none";
        };

        for (let j = 0; j < transferfourthEbay; j++) {
            document.getElementById("textArea4Ebay" + j.toString()).style.display = "none";
            document.getElementById("horizontal4Ebay" + j.toString()).style.display = "none";
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch('/search', options);
        const json_web = await resp.json();
        //console.log("risposta dal server", json_web);

        // post on ebay
        const options_ebay = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const resp_ebay = await fetch('/ebaysearch', options_ebay);
        const json_ebay = await resp_ebay.json();
        //console.log("risposta da ebay", json_ebay);
        // end ebay Post 

        if (json_web.length === 0 & json_ebay.length === 0) {
            alert("Nothing found. Refine your search");
        };

        sessionStorage.setItem("transferfifth", json_web.length);
        sessionStorage.setItem("transferfifth", json_ebay.length);

        if (json_web == "alert") {
            alert("Not a valid search or too many search words (max 5). Try again");
            Refresh();
        };
        // ALERT 
        if (json_web.length > 50) {
            alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
        };
        for (let j = 0; j < json_web.length; j++) {
            // Adding a paragraph to divID class
            fifthpara[j] = document.createElement("P");
            fifthpara[j].id = "fourthtextArea" + j.toString();
            //var text = document.createTextNode(json_web[j].equipment.toUpperCase());
            var text = document.createTextNode(json_web[j].equipment.toUpperCase() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "(" + json_web[j].supplier.toString().slice(8) + ")");
            fifthpara[j].appendChild(text);

            // Adding horizontal tag
            fifthhr[j] = document.createElement("hr");
            fifthhr[j].id = "fourthhorizontal" + j.toString();
            // Adding a button
            var button = document.createElement("a");
            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_web[j].website.toString());
            button.setAttribute("target", '_blank');

            fifthpara[j].appendChild(button);
            fifthpara[j].style.color = "darkblue";
            page5.appendChild(fifthpara[j]);
            page5.appendChild(fifthhr[j]);
            document.body.appendChild(page5);
        };

        // adding ebay results to screen

        for (let j = 0; j < json_ebay.length; j++) {
            // Adding a paragraph to divID class
            fifthparaEbay[j] = document.createElement("P");
            fifthparaEbay[j].id = "textAreathreeEbay" + j.toString();;
            var text = document.createTextNode(json_ebay[(j)].title + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
            fifthparaEbay[j].appendChild(text);

            // Adding horizontal tag
            fifthhrEbay[j] = document.createElement("hr");
            fifthhrEbay[j].id = "horizontalthreeEbay" + j.toString();

            // Adding a button & set attribute
            var button = document.createElement("a");

            var textForButton = document.createTextNode("More details");
            button.appendChild(textForButton);

            button.style = "position: absolute; right: 100px;";
            button.className += "btn btn-primary";
            button.setAttribute("href", json_ebay[(j)].viewitem.toString());
            button.setAttribute("target", '_blank');
            fifthparaEbay[j].appendChild(button);
            fifthparaEbay[j].style.color = "darkblue";
            page5.appendChild(fifthparaEbay[j]);
            page5.appendChild(fifthhrEbay[j]);
            document.body.appendChild(page5);
        };

    };

};
async function Refresh() {
    location.reload();
};