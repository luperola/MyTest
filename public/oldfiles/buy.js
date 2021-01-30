var input = document.getElementById("search-category");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnSearch").click();
    }
});

async function SearchNew() {
    // post index.js for search in dbProducts.db
    count += 1;
    console.log('conta', count)
    var webString = document.getElementById("search-category").value
    webString = webString.toLowerCase();
    const data = { webString };

    if (count >= 2) {
        console.log('sono in count >1');
        sessionStorage.setItem('transfer', webString);
        document.location.href = 'newsearch1.html';
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
    console.log("risposta dal server", json_web);

    if (json_web == "alert") {
        alert("Not a valid search or too many search words (max 5). Try again");
        Refresh();
    };

    // ALERT 
    if (json_web.length > 50) {
        alert('Search resulted in more of ' + `${json_web.length}` + ' items. Better you refine your search');
    };



    // make the array from search POST w/o ripetitive names in the list
    let arrayCheck = [];
    let arrayListings = [];
    let out = [];
    let outlist = [];
    let webList1 = [];
    let unisci = [];

    for (let i = 0; i < json_web.length; i++) {
        unisci[i] = json_web[i].equipment + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + json_web[i].repeat + ' offers';
        arrayCheck.push(unisci[i]);
        //arrayCheck.push(json_web[i].equipment);
        arrayListings.push(json_web[i].button);
    };
    sessionStorage.setItem('test', arrayCheck);

    // eliminate duplicates of list and buttons
    eliminateDuplicates(arrayCheck);
    eliminateListings(arrayListings);

    function eliminateDuplicates() {
        var i,
            len = arrayCheck.length,
            obj = {};
        for (i = 0; i < len; i++) {
            obj[arrayCheck[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        console.log('list out', out);
    };

    function eliminateListings() {
        var i,
            len = arrayListings.length,
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arrayListings[i]] = 0;
        }
        for (i in obj) {
            outlist.push(i);
        }
        console.log("outlist", outlist);
    };


    // create the screen view 
    /* for (let j = 0; j < out.length; j++) {
        // Adding a paragraph to divID class
        var paragraph = document.createElement("P");
        paragraph.id = "textArea";
        var text = document.createTextNode(out[j].toUpperCase());
        //var text = document.createTextNode(out[j].toUpperCase() + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(caeonline)");
        paragraph.appendChild(text);

        // Adding horizontal tag
        var hr = document.createElement("hr");

        // Adding a button
        var button = document.createElement("Button");
        var textForButton = document.createTextNode("More details");
        button.appendChild(textForButton);

        button.style = "position: absolute; right: 100px;";
        button.className += "btn btn-primary";
        // assign button the id
        button.id = outlist[j];

        paragraph.appendChild(button);
        divID.appendChild(paragraph);
        divID.appendChild(hr);
        paragraph.style.color = "darkblue";

        // Appending the div element to body
        document.body.appendChild(divID);
        var passList = JSON.stringify(json_web);
        sessionStorage.setItem("json", passList);
        sessionStorage.setItem("searchstring", webString);

        // sent of multiple web addresses (if any) from this page to 'buy2.html'
        document.getElementById(`${outlist[j]}`).addEventListener("click", () => {
            webList1.splice(0, webList1.length);
            for (let kk = 0; kk < arrayCheck.length; kk++) {
                if (json_web[kk].button == outlist[j]) {
                    webList1.push(json_web[kk].website);
                };
            };
            // the 'for' cycle makes the list for a given btn as id
            sessionStorage.setItem("item", out[j]);
            var webList2 = webList1;

            webList2 = JSON.stringify(webList2);
            sessionStorage.setItem("shortlist", webList2);
            // webList2 è una stringa;
            console.log("new webList2 =", webList2);
            // webList2 è un oggetto;
            window.open("buy2.html");

        });
    }; */

    // create the NEW screen view 
    for (let j = 0; j < out.length; j++) {
        // Adding a paragraph to divID class
        var paragraph = document.createElement("P");
        paragraph.id = "textArea";
        var text = document.createTextNode(json_web[j].equipment.toUpperCase());
        //var text = document.createTextNode(out[j].toUpperCase() + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(caeonline)");
        paragraph.appendChild(text);

        // Adding horizontal tag
        var hr = document.createElement("hr");

        // Adding a button
        var button = document.createElement("a");
        var textForButton = document.createTextNode("More details");
        button.appendChild(textForButton);

        button.style = "position: absolute; right: 100px;";
        button.className += "btn btn-primary";
        button.setAttribute("href", json_web[j].website);
        // assign button the id
        paragraph.appendChild(button);

        divID.appendChild(paragraph);
        divID.appendChild(hr);
        paragraph.style.color = "darkblue";

        // Appending the div element to body
        document.body.appendChild(divID);
        var passList = JSON.stringify(json_web);
        sessionStorage.setItem("json", passList);
        sessionStorage.setItem("searchstring", webString);

        // sent of multiple web addresses (if any) from this page to 'buy2.html'
        /* document.getElementById(`${outlist[j]}`).addEventListener("click", () => {
            webList1.splice(0, webList1.length);
            for (let kk = 0; kk < arrayCheck.length; kk++) {
                if (json_web[kk].button == outlist[j]) {
                    webList1.push(json_web[kk].website);
                };
            };
            // the 'for' cycle makes the list for a given btn as id
            sessionStorage.setItem("item", out[j]);
            var webList2 = webList1;

            webList2 = JSON.stringify(webList2);
            sessionStorage.setItem("shortlist", webList2);
            // webList2 è una stringa;
            console.log("new webList2 =", webList2);
            // webList2 è un oggetto;
            window.open("buy2.html");

        }); */
    };

    // Post the ebay search on index.js and manage the reply under obejct json_ebay
    const options_ebay = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const resp_ebay = await fetch('/ebaysearch', options_ebay);
    const json_ebay = await resp_ebay.json();
    console.log("from ebay:", json_ebay);
    // end ebay Post 

    // adding ebay results to screen
    for (let j = 0; j < json_ebay.length; j += 2) {
        // Adding a paragraph to divID class
        var paragraph = document.createElement("P");
        paragraph.id = "textArea";
        var text = document.createTextNode(json_ebay[(j + 1)].toString().toUpperCase() + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + "(ebay)");
        paragraph.appendChild(text);

        // Adding horizontal tag
        var hr = document.createElement("hr");

        // Adding a button
        var button = document.createElement("Button");

        var textForButton = document.createTextNode("More details");
        button.appendChild(textForButton);

        button.style = "position: absolute; right: 100px;";
        button.className += "btn btn-primary";
        // assign button the id
        button.id = "btn" + (j + 1000).toString();
        paragraph.appendChild(button);
        divID.appendChild(paragraph);
        divID.appendChild(hr);
        paragraph.style.color = "darkblue";

        // Appending the div element to body
        document.body.appendChild(divID);

        // go to ebay corresponding page
        document.getElementById("btn" + (j + 1000).toString()).addEventListener("click", () => {
            window.open(json_ebay[j]);
        });
    };

    if (json_web[0] != undefined && json_ebay[0] != undefined) {
        console.log("OK!!!");
    };
};

function Refresh() {
    location.reload();
};