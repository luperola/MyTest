const express = require('express');
const fetch = require('node-fetch');
const Datastore = require('nedb');
const fs = require('fs-extra');
const app = express();
const send = require('gmail-send');
var bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
var ncp = require('ncp').ncp;
ncp.limit = 0;
const path = require("path");
const ejs = require('ejs');

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening server at ${port}`); });
app.use(express.static('public'));
app.use(express.json({ limit: "10mb" }));
app.use('/', express.static(__dirname + 'Images'));
const database = new Datastore('database.db');
database.loadDatabase();

const dbProducts = new Datastore('dbProducts.db');
dbProducts.loadDatabase();

// Parse csv and fulfill database

// Attenzione! l'item 'equipment' deve essere tutto minuscolo, altrimenti db.find non lo trova

/* var parse = require('csv-parse');

//var inputFile = 'new_collection.csv';
var inputFile = 'classoneequipment.csv';
console.log("Processing test file");

var parser = parse({ delimiter: ';' }, function(err, data) {
    //var parser = parse(function(err, data) {

    data.forEach(function(line) {

        var db_line = {
            "website": line[0],
            "equipment": line[1],
            "repeat": line[2],
            "supplier": line[3]
        };
        //console.log(JSON.stringify(country));
        dbProducts.insert(db_line);

    });
});
// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser); */

// end of parsing

// npm to surf on webpages
//const axios = require('axios');
//const cheerio = require('cheerio');
//end

// Prende dati da login e da login.js e controlla se sono già nel database

app.post('/validation', (request, response) => {
    console.log("Checking if login is OK!");
    const data = request.body;
    const email = data.Email;
    const pw = data.Password;
    //console.log("my email:", email, "my password:", pw);

    database.find({ Email: `${email}`, Password1: `${pw}` }, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        //console.log("found from database", data);
        response.json(data);
    });
});

app.post('/register', (request, response) => {
    console.log("I got the login & the password");
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    //response.json(data);
    response.json({
        my_email: data.Email,
        my_password: data.Password1
    });
});

app.post('/search', (request, response) => {
    console.log("Checking if Search is OK!");
    const data_search = request.body;
    const category = data_search.webString;
    const categorySearch = category.split(" ") || category.split("-");
    if (categorySearch.length == 1) {
        dbProducts.find({ equipment: new RegExp(`${categorySearch[0]}`) }, (err, data) => {
            if (err) {
                response.end();
                return;
            };
            response.json(data);
        });
    };
    if (categorySearch.length == 2) {
        dbProducts.find({
            $and: [{ equipment: new RegExp(`${categorySearch[0]}`) },
                { equipment: new RegExp(`${categorySearch[1]}`) }
            ]
        }, (err, data) => {
            if (err) {
                response.end();
                return;
            };
            response.json(data);
        });
    };

    if (categorySearch.length == 3) {
        dbProducts.find({
            $and: [{ equipment: new RegExp(`${categorySearch[0]}`) },
                { equipment: new RegExp(`${categorySearch[1]}`) },
                { equipment: new RegExp(`${categorySearch[2]}`) }
            ]
        }, (err, data) => {
            if (err) {
                response.end();
                return;
            };
            response.json(data);
        });

    };

    if (categorySearch.length == 4) {
        dbProducts.find({
            $and: [{ equipment: new RegExp(`${categorySearch[0]}`) },
                { equipment: new RegExp(`${categorySearch[1]}`) },
                { equipment: new RegExp(`${categorySearch[2]}`) },
                { equipment: new RegExp(`${categorySearch[3]}`) }
            ]
        }, (err, data) => {
            if (err) {
                response.end();
                return;
            };
            response.json(data);
        });

    };

    if (categorySearch.length == 5) {
        dbProducts.find({
            $and: [{ equipment: new RegExp(`${categorySearch[0]}`) },
                { equipment: new RegExp(`${categorySearch[1]}`) },
                { equipment: new RegExp(`${categorySearch[2]}`) },
                { equipment: new RegExp(`${categorySearch[3]}`) },
                { equipment: new RegExp(`${categorySearch[4]}`) }
            ]
        }, (err, data) => {
            if (err) {
                response.end();
                return;
            };

            response.json(data);
        });

    };

    if (categorySearch.length > 5) {
        response.json("alert");
    };
});

// Post makes an ebay search 

app.post('/ebaysearch', (request, res) => {
    //console.log("Checking if Search is OK!");
    const ebay_search = request.body;
    var ebay_web = ebay_search.webString;
    ebay_web = ebay_web.trim();
    ebay_web = ebay_web.replace(" ", "%20");

    var search_word = "&keywords=" + ebay_web.toString();

    var url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=LuigiPer-API-PRD-dd2ce5828-c4254849";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    //url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += search_word;
    url += "&paginationInput.entriesPerPage=10";

    getWeb();
    async function getWeb() {
        const promise = await fetch(url);
        const response = await promise.json();
        var items = response.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        var html = [];
        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            var title = item.title;
            //var pic = item.galleryURL;
            var viewitem = item.viewItemURL;
            var htmlebay = { viewitem, title }
            if (title != null && viewitem != null) {
                html.push(htmlebay);
            };
        };
        res.json(html);
    };
});


/* //Multer DiskStorage Config
const diskStorage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, call_back) => {
        const m = Date.now();
        call_back(null, m + '_' + file.originalname);
    }
});
//Create Multer Instance
const upload = multer({
    storage: diskStorage,
    //fileFilter: function(req, file, cb) {
    //checkFileType(file, cb);} 
}).array("myImage", 10);

// Check File Type
/* function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
} */

//File upload old
//Upload route
//app.post('/newupload', upload.single('image'), (req, res, next) => {

/* app.post('/upload', upload, (req, res) => {
    console.log("res.json is: ", req.file);
    res.json(req.file);
    //res.redirect("verify.html");
}); */
// END MULTER PCKG UPLOAD */

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



// Send uploaded file names to client
/* app.get('/filename', (req, resp) => {
    const testFolder = './public/uploads';
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {});
        resp.json(files);
    });
}); */


// end

// post for publishing the on sale and make its website
app.post('/verify', (request, response) => {
    const data_verify = request.body;
    // record the json file with data 
    const giorno = Date.now()
    var nextdir = data_verify.verified[5] + data_verify.verified[6] + giorno + '.json';
    nextdir = './public/posted/' + nextdir;

    // stringify JSON Object
    var newHtml_data = JSON.stringify(data_verify);
    console.log(newHtml_data);

    fs.writeFile(nextdir, newHtml_data, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });

    response.json({ data_verify, nextdir });

    // move files from /public/upload to Images and to /public/img
    var thePath = "./";
    var folder = "public/uploads";
    var newFolder = "Images";

    ncp(path.join(thePath, folder), path.join(thePath, newFolder), async function(err) {
        if (err) {
            return console.error('errore in copy folder', err);
        }

    });
    var thePath1 = "./";
    var folder1 = "public/uploads";
    var newFolder1 = "public/img";
    ncp(path.join(thePath1, folder1), path.join(thePath1, newFolder1), async function(err) {
        if (err) {
            return console.error('errore in copy folder', err);
        }
        fs.emptyDir('./public/uploads');
    });

});

// Code for scraping websites with axios and cheerio
/* app.post('/surplus', (request, res) => {
    console.log("Checking if Search is OK!");
    const data_search = request.body;
    var data_web = data_search.webString;
    data_web = data_web.trim();
    data_web = data_web.replace(" ", "+");
    console.log(data_web);
    var web_search = "https://www.surplusglobal.com/Common/Search?schKey=S2&schWord=" + `${data_web}` + "&schRef=Marketplace"

    axios.get(web_search)
        .then(response => {
            const html = response.data;
            let arrayRank = [];
            let arrayAddress = [];
            var findings;
            const $ = cheerio.load(html);
            //li.search-list-view:nth-child(1) > div.text-holder > h3.name > a
            function function1() {
                // stuff you want to happen right away
                for (let index = 0; index < 10; index++) {
                    const node_scrap = "li.search-list-view:nth-child(" + index.toString() + ")";
                    const statsTable = $(node_scrap);

                    statsTable.each(function() {
                        var rank = $(this).find('div.text-holder > h3.name > a').text();
                        var webAddress = $(this).find('div.text-holder > h3.name > a').attr('href');
                        //model = $(this).find('div.h2:nth-child(3) > span.text-uppercase > a').text();
                        //details = $(this).find('div.config_box').text();
                        webAddress = "https://caeonline.com" + webAddress;
                        //console.log(rank, webAddress);
                        arrayRank.push(rank.toString());
                        arrayAddress.push(webAddress.toString());
                    });
                };
                //const findings = $(this).find("div.search-results > p").text();
                //console.log("here the #", findings);
            }

            function function2() {
                // all the stuff you want to happen after that pause
                //console.log('aspetto', i);
            }

            function1();
            setTimeout(function2, 3000);
            setTimeout(function3, 2000);

            //data_web = { rank };
            //arrayRank.push(data_web.rank.toString());

            function function3() {
                // all the stuff you want to happen after that pause
                res.json({ arrayRank, arrayAddress });

                //return;

            }
        })
        .catch(console.error);
}); */

// download files
app.get('/download', function(req, res) {
    const file = `Used Equipment buyers.docx`;
    res.download(file);
    //res.sendFile(file); // Set disposition and send it.
});