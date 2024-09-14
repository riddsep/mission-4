let todos = [];

function addTodo() {
  const inputTodoEl = document.getElementById("input-todo");
  const dateEl = document.getElementById("date");
  const priorityEl = document.getElementById("prioritas");
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    const todo = inputTodoEl.value;
    const date = dateEl.value;
    const priority = priorityEl.value;

    if (!inputTodoEl.value) {
      return;
    }

    todos.push({
      id,
      todo,
      date,
      priority,
      isDone: false,
    });
    showTodos();
  });
}
addTodo();

function showTodos() {
  const activeTodosEl = document.getElementById("active-todos");
  const completedTodosEl = document.querySelector("#completed-todos");

  activeTodosEl.innerHTML = "";
  completedTodosEl.innerHTML = "";

  todos.forEach((todoItem) => {
    const createTr = document.createElement("tr");
    createTr.className = "todos-row";

    const componentTr = `
                <td class="todos">
                <div class="todos-info">
                    <p class="todos-text ${
                      todoItem.isDone ? "text-decoration" : ""
                    }">${todoItem.todo}</p>
                    <div class="todos-detail">
                    <div class="todos-priority">${todoItem.priority}</div>
                    <div class="todos-date">${todoItem.date}</div>
                    </div>
                </div>
                <div class="button-list">
                <input type="checkbox" onchange="todoCompleted(${
                  todoItem.id
                })" ${todoItem.isDone ? "checked" : ""}/>
                <button id="remove-btn" onclick="deleteTodo(${
                  todoItem.id
                })">Remove</button>
                </div>
                </td>`;
    createTr.innerHTML = componentTr;

    if (!todoItem.isDone) {
      activeTodosEl.append(createTr);
    } else {
      completedTodosEl.append(createTr);
    }
  });
}

function todoCompleted(id) {
  const tempTodo = todos.map((todo) => {
    return {
      ...todo,
      isDone: todo.id == id ? !todo.isDone : todo.isDone,
    };
  });
  todos = tempTodo;

  console.log(todos);
  showTodos();
}

function deleteTodo(id) {
  const deleteTodos = todos.filter((todo) => {
    return todo.id !== id;
  });
  todos = deleteTodos;
  showTodos();
}
