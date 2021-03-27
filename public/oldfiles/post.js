var posted = sessionStorage.getItem("toBePosted");
posted = JSON.parse(posted);
console.log('posted', posted);
datapost();
async function datapost() {
    const makePage = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(posted)
    };

    const resp = await fetch('/postfile', makePage);
    const json_post = await resp.json();
    console.log("response from makePage post", json_post);
};