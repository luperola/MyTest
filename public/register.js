let data = {};

async function getEmail2() {
    const Email = document.getElementById("input2EmailForm").value;
    const Password1 = document.getElementById("input2PasswordForm").value;
    const Password2 = document.getElementById("input2Password2Form").value;
    console.log(Email, Password1, Password2);
    data = { Email, Password1, Password2 }
        //console.log(data);

    if (Password1 !== Password2) {
        alert("The passwords are different!");
        if (confirm("Write them again!")) document.location = 'register.html';
    } else {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/register', options);
        const json = await response.json();
        console.log(json);
    }
};