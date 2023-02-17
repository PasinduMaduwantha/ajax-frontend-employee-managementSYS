getAllEmployees();
function saveEmployee(){
    //take the values from the form
    let email = document.getElementById("exampleFormControlInput2").value;
    let name = document.getElementById("exampleFormControlInput3").value;
    let phone = document.getElementById("exampleFormControlInput4").value;
    let jobTitle = document.getElementById("exampleFormControlInput5").value;
    let address = document.getElementById("exampleFormControlInput6").value;

    //save data un backend
    $.ajax({
        method: "POST",
        contentType: "application/json",
        url:"http://localhost:8080/api/v1/employee/saveemployee",
        async: true,
        data: JSON.stringify({
            "id":"",
            "name":name,
            "email":email,
            "jobTitle":jobTitle,
            "phone":phone,
            "address":address
        }
    ),
    success: function (data) {
        alert("Employee saved successfully")
        getAllEmployees();

    },
    error: function (xhr, exception) {
        alert("Error saving employee")
    }

    })

}

function updateEmployee(){
    //take the values from the form
    let id = document.getElementById("exampleFormControlInput1").value;
    let email = document.getElementById("exampleFormControlInput2").value;
    let name = document.getElementById("exampleFormControlInput3").value;
    let phone = document.getElementById("exampleFormControlInput4").value;
    let jobTitle = document.getElementById("exampleFormControlInput5").value;
    let address = document.getElementById("exampleFormControlInput6").value;

    //save data un backend
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url:"http://localhost:8080/api/v1/employee/updateemployee",
        async: true,
        data: JSON.stringify({
                "id":id,
                "name":name,
                "email":email,
                "jobTitle":jobTitle,
                "phone":phone,
                "address":address
            }
        ),
        success: function (data) {
            alert("Employee Updated")
            getAllEmployees();

        },
        error: function (xhr, exception) {
            alert("Error")
        }

    })
}

function deleteEmployee(){
    let id = document.getElementById("exampleFormControlInput1").value;
    console.log(id)
    //save data un backend
    $.ajax({
        method: "DELETE",
        url:"http://localhost:8080/api/v1/employee/deleteemployee/"+id,
        async: true,
        success: function (data) {
            alert("Employee Deleted")
            getAllEmployees();
        },
        error: function (xhr, exception) {
            alert("Error")
        }

    })
}



function getAllEmployees(){
    //get all employees from backend and display in table
    $.ajax({
        method: "GET",
        url:"http://localhost:8080/api/v1/employee/getallemployee",
        async: true,
        success: function (data) {
            if(data){
                $('#empTable').empty();
                for (let emp of data.content){
                    let id= emp.id;
                    let name = emp.name;
                    let email = emp.email;
                    let jobTitle = emp.jobTitle;
                    let phone = emp.phone;
                    let address = emp.address;

                    let row = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                                <td>${email}</td>
                                <td>${jobTitle}</td>
                                <td>${phone}</td>
                                <td>${address}</td>
                              </tr>`;
                    $('#empTable').append(row);
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })

}

$(document).ready(function () {
    $(document).on('click', '#empTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();
        var col4 = $(this).find('td:eq(4)').text();
        var col5 = $(this).find('td:eq(5)').text();

        $('#exampleFormControlInput1').val(col0);
        $('#exampleFormControlInput2').val(col1);
        $('#exampleFormControlInput3').val(col2);
        $('#exampleFormControlInput4').val(col3);
        $('#exampleFormControlInput5').val(col4);
        $('#exampleFormControlInput6').val(col5);

    })
})