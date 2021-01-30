function Toggle() {
    var temp = document.getElementById("Password");
    if (temp.type === "password") {
        temp.type = "text";
    } else {
        temp.type = "password";
    }
}

let data = {};
let json = [];

async function getEmail() {
    const Email = document.getElementById("Email").value;
    const Password = document.getElementById("Password").value;
    console.log(Email, "--", Password);
    data = { Email, Password };
    //console.log(data);

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/validation', options);
    const json = await response.json();
    console.log("dati dal post da login", json);
    //console.log("1° elemento di array", json[0]);
    //console.log("test", JSON.stringify(json));
    if (json[0] != undefined) {
        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            const test = JSON.stringify(json[0]);
            String[0] = test.split(",");
            if (test.includes(`${data.Email}`) && test.includes(`${data.Password}`)) {
                console.log("Evviva!!!!", data.Email, data.Password);
                //document.location = "index.html";
            } else { alert("Something went wrong in login!, ID or password are wrong") };
        }
    } else {
        alert("Email and password are not valid");
        document.location = "register.html";
    }
};