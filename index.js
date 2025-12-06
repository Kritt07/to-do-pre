let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem("items")) {
		return JSON.parse(localStorage.getItem("items"));
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener("click", (event) => {
		clone.remove();
		let items = getTasksFromDOM();
		saveTasks(items);
	})

	duplicateButton.addEventListener("click", (event) => {
		let newItem = createItem(item)

		listElement.prepend(newItem)
		let items = getTasksFromDOM();
		saveTasks(items);
	})

	textElement.textContent = item;
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text')
	let tasks = [];
	itemsNamesElements.forEach(element => {
		tasks.push(element.textContent);
	})
	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem("items", JSON.stringify(tasks));
}


items = loadTasks();

items.forEach(item => {
	const element = createItem(item);
	listElement.append(element);
});

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const value = inputElement.value;
	const element = createItem(value);
	listElement.prepend(element);
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})

