const form = document.getElementById("resultForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = "";


    const prn =
        document.getElementById("prn").value.trim();

    const studentName =
        document.getElementById("studentName").value.trim();


    // PRN validation
    if (!/^\d{8}$/.test(prn)) {

        errorMessage.textContent =
            "PRN must contain exactly 8 digits.";

        return;
    }


    const subjects = [

        {
            name: "Data Structures",
            mse: Number(document.getElementById("mse1").value),
            ese: Number(document.getElementById("ese1").value)
        },

        {
            name: "DBMS",
            mse: Number(document.getElementById("mse2").value),
            ese: Number(document.getElementById("ese2").value)
        },

        {
            name: "Computer Networks",
            mse: Number(document.getElementById("mse3").value),
            ese: Number(document.getElementById("ese3").value)
        },

        {
            name: "OOP",
            mse: Number(document.getElementById("mse4").value),
            ese: Number(document.getElementById("ese4").value)
        }

    ];


    // Validate marks
    for (const subject of subjects) {

        if (
            subject.mse < 0 ||
            subject.mse > 30 ||
            subject.ese < 0 ||
            subject.ese > 100
        ) {

            errorMessage.textContent =
                "Enter valid MSE and ESE marks.";

            return;
        }
    }


    const requestData = {

        prn: prn,

        studentName: studentName,

        subjects: subjects

    };


    try {

        const response = await fetch(
            "/api/results",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestData)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to calculate result."
            );
        }


        const result =
            await response.json();


        displayResult(result);

    }
    catch (error) {

        errorMessage.textContent =
            "Could not connect to the server.";

        console.error(error);
    }

});


function displayResult(result) {

    document.getElementById("resultSection")
        .style.display = "block";


    document.getElementById("resultPrn")
        .textContent = result.prn;


    document.getElementById("resultName")
        .textContent = result.studentName;


    const tableBody =
        document.getElementById("resultTableBody");


    tableBody.innerHTML = "";


    result.subjects.forEach(subject => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${subject.name}</td>

            <td>${subject.mse}</td>

            <td>${subject.ese}</td>

            <td>${subject.finalMarks}</td>

        `;


        tableBody.appendChild(row);

    });


    document.getElementById("percentage")
        .textContent = result.percentage;
}