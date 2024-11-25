const list = document.getElementById('lista-tarefas');

function selectorValidator(clickOnTask, taskNumber, liLoop) {
  clickOnTask[liLoop].addEventListener('click', () => {
    for (let liLoop2 = 0; liLoop2 < taskNumber; liLoop2 += 1) {
      if (clickOnTask[liLoop2].classList.contains('selected')) {
        clickOnTask[liLoop2].classList.remove('selected');
      }
    }
    clickOnTask[liLoop].classList.add('selected');
  });
}

function taskSelector() {
  const clickOnTask = document.querySelectorAll('.task');
  for (let taskNumber = clickOnTask.length, liLoop = 0; liLoop < taskNumber; liLoop += 1) {
    selectorValidator(clickOnTask, taskNumber, liLoop);
  }
}

function setCompletedTasks(listItem) {
  listItem.addEventListener('dblclick', () => {
    if (listItem.classList.contains('completed')) {
      listItem.classList.remove('completed');
    } else {
      listItem.classList.add('completed');
    }
  });
}

function createSavedList() {
  const stored = localStorage.length;
  for (let listLoop = 1, taskNumber = stored; listLoop <= taskNumber; listLoop += 1) {
    const savedList = localStorage.getItem(`savedList-${listLoop}`);
    const savedClass = localStorage.getItem(`savedClass-${listLoop}`);
    const listItem = document.createElement('li');
    listItem.innerHTML = savedList;
    listItem.className = 'task';
    if (savedClass !== undefined) {
      listItem.classList.add(savedClass);
    }
    if (listItem.innerHTML !== '') {
      list.appendChild(listItem);
    }
    setCompletedTasks(listItem);
    taskSelector();
  }
}

createSavedList();

function createTaskList() {
  const input = document.getElementById('texto-tarefa');
  const inputValue = input.value;
  const listItem = document.createElement('li');
  if (inputValue !== '') {
    listItem.innerText = inputValue;
    list.appendChild(listItem);
    listItem.className = 'task';
    setCompletedTasks(listItem);
    taskSelector();
    input.value = '';
  }
}

function deleteAllListItems() {
  const allListItems = document.querySelectorAll('.task');
  for (let listLoop = 0, taskNumber = allListItems.length; listLoop < taskNumber; listLoop += 1) {
    list.removeChild(allListItems[listLoop]);
  }
}

function deleteCompletedItems() {
  const CompletedItems = document.querySelectorAll('.completed');
  for (let listLoop = 0, taskNumber = CompletedItems.length; listLoop < taskNumber; listLoop += 1) {
    list.removeChild(CompletedItems[listLoop]);
  }
}

function saveList() {
  const toBeSaved = list.childNodes;
  let saved = '';
  for (let listLoop = 0, taskNumber = toBeSaved.length; listLoop < taskNumber; listLoop += 1) {
    saved = toBeSaved[listLoop].innerHTML;
    localStorage.setItem(`savedList-${listLoop + 1}`, saved);
    if (toBeSaved[listLoop].classList.contains('completed')) {
      localStorage.setItem(`savedClass-${listLoop + 1}`, 'completed');
    }
  }
}

function moveTaskUp() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem !== null) {
    const prevItemSibling = selectedItem.previousElementSibling;
    const selectedItemCln = selectedItem.cloneNode(true);
    if (prevItemSibling !== null) {
      list.removeChild(selectedItem);
      list.insertBefore(selectedItemCln, prevItemSibling);
      setCompletedTasks(selectedItemCln);
      taskSelector();
    }
  }
}

function moveTaskDown() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem !== null) {
    const nextItemSibling = selectedItem.nextElementSibling;
    if (nextItemSibling !== null) {
      const nextItemSiblingCln = nextItemSibling.cloneNode(true);
      list.removeChild(nextItemSibling);
      list.insertBefore(nextItemSiblingCln, selectedItem);
      setCompletedTasks(nextItemSiblingCln);
      taskSelector();
    }
  }
}

function deleteSelectedItem() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem !== null) {
    list.removeChild(selectedItem);
  }
}

const creationButton = document.getElementById('criar-tarefa');
creationButton.addEventListener('click', createTaskList);

const deletionButton = document.getElementById('apaga-tudo');
deletionButton.addEventListener('click', deleteAllListItems);

const deleteCompletedButton = document.getElementById('remover-finalizados');
deleteCompletedButton.addEventListener('click', deleteCompletedItems);

const saveListButton = document.getElementById('salvar-tarefas');
saveListButton.addEventListener('click', saveList);

const moveUpButton = document.getElementById('mover-cima');
moveUpButton.addEventListener('click', moveTaskUp);

const moveDownButton = document.getElementById('mover-baixo');
moveDownButton.addEventListener('click', moveTaskDown);

const deleteSelected = document.getElementById('remover-selecionado');
deleteSelected.addEventListener('click', deleteSelectedItem);
