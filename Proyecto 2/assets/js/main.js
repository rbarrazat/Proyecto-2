function init() {
    let nombreimput = document.getElementById("nombre-tarea");
    let descripcionimput = document.getElementById("descripcion-tarea");
    let agregarbutton = document.getElementById("agrega-tarea");
    let tablatareas = document.getElementById("tabla-tareas");

    agregarbutton.addEventListener("click", function(){
        // Agregar la info de los imputs
        let nombretarea = nombreimput.value;
        let descripciontarea = descripcionimput.value;
        // Crea el objeto con la info de los imputs
        let tarea = {
            name: nombretarea,
            description: descripciontarea,
        };
        // Aplica local storage, guarda como texto con el Json
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        // Crea filas con los campos y los botones 
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nombretarea}</td>
            <td>${descripciontarea}</td>
            <td><button class="edit-button">Editar</button></td>
            <td><button class="delete-button">Eliminar</button></td>
        `;
        // Borra la info escrita en el imput para que pueda volver a escribir
        tablatareas.appendChild(newRow);
        nombreimput.value = "";
        descripcionimput.value = "";

        // Agregar el evento de eliminar al boton eliminar
        newRow.querySelector(".delete-button").addEventListener("click", function(){
            // Elimina el objeto del local storage
            let taskIndex = tareas.findIndex(task => task.name === nombretarea);
            tareas.splice(taskIndex, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            // Elimina la fila de la tabla
            tablatareas.removeChild(newRow);
        });

        // Agrega el evento de editar en el boton editar
        newRow.querySelector(".edit-button").addEventListener("click", function(){
            // Actualiza la info en el local storage
            let taskIndex = tareas.findIndex(task => task.name === nombretarea);
            tareas[taskIndex].name = nombreimput.value;
            tareas[taskIndex].description = descripcionimput.value;
            localStorage.setItem("tareas", JSON.stringify(tareas));
            // Actualiza la info en su respectiva fila 
            newRow.querySelector("td:first-child").textContent = nombreimput.value;
            newRow.querySelector("td:nth-child(2)").textContent = descripcionimput.value;
        });
    });

}

document.addEventListener("DOMContentLoaded", init);


