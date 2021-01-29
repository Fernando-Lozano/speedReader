axios.get("/GrimmFairyTales/000.txt")
    .then((res) => {
        data = res.data;
        console.log(res.headers);
        console.log(data.toString());
        const newer = document.createElement("pre");
        newer.textContent = data.toString();
        document.body.appendChild(newer);
    });