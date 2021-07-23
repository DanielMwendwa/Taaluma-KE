const upload = () => {
    const fileUpload = document.getElementById("fileUpload");
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

    if (!regex.test(fileUpload.value.toLowerCase())) {
        alert("Please upload a valid CSV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        let jsonData = csvJSON(event.target.result);
        console.log(jsonData);

        let table = document.createElement("table");
        let lines = event.target.result.split("\n");
        let dvCSV = document.getElementById("dvCSV");

        lines.forEach((line) => {
            let values = line.split(",");
            if (values.length > 1) {
                let row = table.insertRow(-1);
                values.forEach((value) => {
                    let cell = row.insertCell(-1);
                    cell.innerHTML = value;
                });
            }
        });

        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
    };

    reader.readAsText(fileUpload.files[0]);
};

const csvJSON = (csv) => {
    let lines = csv.split("\n");

    let result = [];

    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return JSON.stringify(result);
};
