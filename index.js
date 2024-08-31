document.addEventListener("DOMContentLoaded", () => {
  displayTodos();

  const form = document.querySelector("#form");
  form.addEventListener("submit", handlerSubmit);
});

function handlerSubmit(event) {
  event.preventDefault();

  // Mengambil value dari form submit
  const inputTodo = document.querySelector("#input-todo").value;
  const timeStamp = new Date().toLocaleDateString();
  const priority = document.querySelector("#prioritas").value;

  const newTodo = { inputTodo, timeStamp, priority, completed: false };

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  displayTodos();

  document.querySelector("#input-todo").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#prioritas").value = "low";
}

function displayTodos() {
  const activeContainer = document.querySelector("#active-todos");
  const completedContainer = document.querySelector("#completed-todos");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  activeContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  todos.forEach((todo, index) => {
    const trElement = document.createElement("tr");
    trElement.classList.add("todos-row");

    const tdElement = document.createElement("td");
    tdElement.classList.add("todos");

    const divElement = document.createElement("div");
    divElement.classList.add("todos-info");

    const InputEl = document.createElement("input");
    InputEl.setAttribute("type", "checkbox");
    InputEl.setAttribute("name", "checklist");
    InputEl.setAttribute("id", `checklist-${index}`);
    InputEl.checked = todo.completed;

    const pElement = document.createElement("p");
    pElement.classList.add("todos-text");
    pElement.textContent = todo.inputTodo;
    pElement.style.textDecoration = todo.completed ? "line-through" : "none";

    const divDetail = document.createElement("div");
    divDetail.classList.add("todos-detail");

    const divPriority = document.createElement("div");
    divPriority.classList.add("todos-priority");
    divPriority.textContent = todo.priority;

    const divDate = document.createElement("div");
    divDate.classList.add("todos-date");
    divDate.textContent = todo.timeStamp;

    divDetail.append(divPriority, divDate);
    divElement.append(pElement, divDetail);
    tdElement.append(divElement, InputEl);
    trElement.append(tdElement);

    if (todo.completed) {
      completedContainer.append(trElement);
    } else {
      activeContainer.append(trElement);
    }
  });

  setCheckbox();
}

function setCheckbox() {
  const checkboxes = document.querySelectorAll("input[name='checklist']");
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      const row = checkbox.closest("tr");
      const textElement = row.querySelector(".todos-text");
      const todos = JSON.parse(localStorage.getItem("todos")) || [];

      todos[index].completed = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      textElement.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";

      displayTodos();
    });
  });
}

const clearBtn = document.querySelector("#clear-data");
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  displayTodos();
});
