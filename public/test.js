function save() {

    // File destination.txt will be created or overwritten by default.
    fs.copyFile('./test.html', './destination.html', (err) => {
        if (err) throw err;
        console.log('test.html was copied to destination.html');
    })
};