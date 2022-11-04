const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const LISTA_TAREFAS = "lista_tarefas";
var listaTarefas = [{ id: 1, title: 'Cacetar', description: 'cacetar o roxo' }]

$(document).ready(() => {
  console.log("Dashboard");

  listarTarefas();

  if (localStorage.getItem(LOGADO) == 'false') {
    window.location.href = "index.html";
  }

});

const listarTarefas = () => {
  var listaHTML = $("#lista-tarefas");
  listaHTML.html("");
  listaTarefas = getJsonItem(LISTA_TAREFAS);

  if (listaTarefas == null || listaTarefas.length <= 0) {
    listaTarefas = [];
    return;
  };

  listaTarefas.forEach((c) => {
    const title = document.createElement("h3");
    const description = document.createElement("p");
    if (c.stats ==true) {
      title.style.textDecoration = "line-through";
      title.style.color = "gray";
      description.style.color = "gray";
    }
    else if (c.stats ==false) {
      title.style.textDecoration = "none";
    }

    const dataContainer = document.createElement("div");
    dataContainer.classList.add("container-inf");
    const inf = document.createElement("div");
    const checkbox = document.createElement("div");
    checkbox.classList.add("container-check");
    criarCheckbox(c, checkbox);
    const container = document.createElement("div");
    container.classList.add("container-task");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("container-botao");
    criarBotao(c, buttonContainer)

    $(title).html(c.title);
    $(description).html(c.description);
    inf.append(title);
    inf.append(description);
    dataContainer.append(checkbox);
    dataContainer.append(inf);
    container.append(dataContainer);
    container.append(buttonContainer);
    listaHTML.append(container);
  });

};

const salvarTarefa = (title, description) => {
  let stats = false;
  const id = !!listaTarefas.length ? Math.max(...listaTarefas.map((t) => t.id)) + 1 : 1
  const newTask = {
    id,
    title,
    description,
    stats
  }
  listaTarefas.push(newTask);
  setJsonItem(LISTA_TAREFAS, listaTarefas);
  listarTarefas();
}

const handleSalvarTarefa = (e) => {
  console.log()
}
const criarCheckbox = (task, container) => {
  if (task.stats ==true) {
    return $(container).html(`
        <input checked class="checkbox" type="checkbox" onclick="checkAction(${task.id})"></input>`);
  }
  else if (task.stats ==false) {
    return $(container).html(`
        <input class="checkbox" type="checkbox" onclick="checkAction(${task.id})"></input>`);
  }
}
const criarBotao = (task, container) => {
  return $(container).html(`
        <button data-bs-toggle="modal" data-bs-target="#editModal" 
        onclick="handleOpenEditTarefa(${task.id});"
        class="botao"><img src="_img/edit.png" alt="Editar tarefa"></button> 
        <button onclick="removeItemList(${task.id});" 
        class="botao"><img src="_img/delete.png" alt="Apagar tarefa"></button> `
  );
}

const checkAction = (id) => {
  var taskToCheck = listaTarefas.find((t) => t.id === Number(id));
  taskToCheck.stats = !taskToCheck.stats;
  var i = listaTarefas.findIndex((t) => t.id === Number(id));
  listaTarefas.splice(i, 1, taskToCheck);

  setJsonItem(LISTA_TAREFAS, listaTarefas);
  listarTarefas();

}

const removeItemList = (id) => {
  var i = listaTarefas.findIndex((tarefa) => tarefa.id === id);
  listaTarefas.splice(i, 1);

  setJsonItem(LISTA_TAREFAS, listaTarefas);
  listarTarefas();
};

const handleOpenEditTarefa = (id) => {
  $("#id").html(id);
  const foundTask = listaTarefas.find((t) => t.id === id)
  $("#edit-recipient-name").val(foundTask.title);
  $("#edit-message-text").val(foundTask.description);

}

const editTarefa = (id, title, description) => {
  let taskToEdit = listaTarefas.find((t) => t.id === Number(id));
  taskToEdit.title = title;
  taskToEdit.description = description;

  console.log(taskToEdit);
  var i = listaTarefas.findIndex((t) => t.id === Number(id));
  console.log(i);
  listaTarefas.splice(i, 1, taskToEdit);

  setJsonItem(LISTA_TAREFAS, listaTarefas);
  listarTarefas();
}

const limparCampos = () => {
  $("#recipient-name").val("");
  $("#message-text").val("");
  $("#edit-recipient-name").val("");
  $("#edit-message-text").val("");
  $("#id").html("");
}

$('#save').click((e) => {
  let title = document.getElementById("recipient-name").value;
  let description = document.getElementById("message-text").value;
  salvarTarefa(title, description);
  limparCampos();
});

$('#edit').click((e) => {
  let id = document.getElementById("id").textContent;
  let title = document.getElementById("edit-recipient-name").value;
  let description = document.getElementById("edit-message-text").value;
  editTarefa(id, title, description);
  limparCampos();
});
