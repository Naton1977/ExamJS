window.addEventListener('load', () => {
        let amountTask;
        let restoreContent = JSON.parse(localStorage.getItem('saveContent'));
        let restorePushElem = JSON.parse(localStorage.getItem('savePushElem'));
        if (restoreContent !== null) {
            amountTask = restoreContent.length;
        } else {
            amountTask = 0;
        }

        let contentToDo = [];
        let addNewTask = false;


        let addRestoreContent = function () {
            if (restoreContent !== null) {
                for (let i = 0; i < restoreContent.length; i++) {
                    contentToDo[i] = restoreContent[i];
                    let li = document.createElement("li");
                    li.id = "li" + i;
                    li.className = "count";
                    let divView = document.createElement("div");
                    divView.className = "view";
                    let inputToggle = document.createElement("input");
                    inputToggle.className = "toggle";
                    inputToggle.type = "checkbox";
                    inputToggle.id = "checkBox" + i;
                    if (restorePushElem[i] === true) {
                        inputToggle.checked = "true";
                    }
                    let labelToDo = document.createElement("label");
                    labelToDo.id = "label" + i;
                    let txt = restoreContent[i];
                    contentToDo[i] = txt;
                    let span = document.createElement('span');
                    span.id = "span" + i;
                    span.className = "itemSpan";
                    span.innerText = txt;
                    labelToDo.append(span);
                    let buttonDestroy = document.createElement("button");
                    buttonDestroy.className = "destroy";
                    buttonDestroy.id = "button" + i;
                    divView.append(inputToggle, labelToDo, buttonDestroy);
                    let inputEdit = document.createElement("input");
                    inputEdit.className = "edit";
                    inputEdit.value = txt;
                    li.append(divView, inputEdit);
                    let ul = document.querySelector('[class="todo-list"]');
                    ul.append(li);
                }
                if (restoreContent.length > 0) {
                    if (restoreContent.length > 1) {
                        let item = document.querySelector('[class="todo-count"]').childNodes[2];
                        item.innerText = "";
                        item.innerText = "items";
                    }
                    if (restoreContent.length < 2) {
                        let item = document.querySelector('[class="todo-count"]').childNodes[2];
                        item.innerText = "";
                        item.innerText = "item";
                    }
                    let footer = document.querySelector('[class="footer"]')
                    footer.style.display = "block";

                    let numbers = document.querySelector("strong");
                    numbers.innerText = "";
                    numbers.innerText = (restoreContent.length);

                }
            }
        }
        addRestoreContent();


        let addNewTodo = function (e) {
            if (e.target.className === "new-todo") {
                if (e.key === "Enter") {
                    addNewTask = true;
                    let li = document.createElement("li");
                    li.id = "li" + amountTask;
                    li.className = "count";
                    let divView = document.createElement("div");
                    divView.className = "view";
                    let inputToggle = document.createElement("input");
                    inputToggle.className = "toggle";
                    inputToggle.type = "checkbox";
                    inputToggle.id = "checkBox" + amountTask;
                    let labelToDo = document.createElement("label");
                    labelToDo.id = "label" + amountTask;
                    let txt = document.querySelector('[class="new-todo"]').value;
                    contentToDo[amountTask] = txt;
                    let span = document.createElement('span');
                    span.id = "span" + amountTask;
                    span.className = "itemSpan";
                    span.innerText = txt;
                    labelToDo.append(span);
                    let buttonDestroy = document.createElement("button");
                    buttonDestroy.className = "destroy";
                    buttonDestroy.id = "button" + amountTask;
                    divView.append(inputToggle, labelToDo, buttonDestroy);
                    let inputEdit = document.createElement("input");
                    inputEdit.className = "edit";
                    inputEdit.value = txt;
                    li.append(divView, inputEdit);
                    let ul = document.querySelector('[class="todo-list"]');
                    ul.append(li);
                    document.querySelector('[class="new-todo"]').value = null;
                    amountTask++;
                    numberOfTasks();
                    visualizationNumberOfTasks();
                    item();
                    footerVisualization();
                }
            }
        }

        let item = function () {
            if (addNewTask) {
                if (contentToDo.length > 1) {
                    let item = document.querySelector('[class="todo-count"]').childNodes[2];
                    item.innerText = "";
                    item.innerText = "items";
                }
                if (contentToDo.length < 2) {
                    let item = document.querySelector('[class="todo-count"]').childNodes[2];
                    item.innerText = "";
                    item.innerText = "item";
                }
            }
        }


        let numberOfTasks = function () {
            return document.getElementsByClassName("count").length;
        }
        let checkedCount = 0
        let visualizationNumberOfTasks = function () {
            for (let i = 0; i < amountTask; i++) {
                let elem = document.getElementById("checkBox" + i);
                if (elem !== null) {
                    if (elem.checked) {
                        checkedCount++;
                    }
                }
            }
            let numbers = document.querySelector("strong");
            numbers.innerText = "";
            numbers.innerText = (numberOfTasks() - checkedCount);
            checkedCount = 0;
        }


        let footerVisualization = function () {
            let countLiElem = document.getElementsByClassName("count").length;
            if (countLiElem === 0) {
                let footer = document.querySelector('[class="footer"]')
                footer.style.display = "none";
            }
            if (countLiElem > 0) {
                let footer = document.querySelector('[class="footer"]')
                footer.style.display = "block";
            }
        }
        footerVisualization();


        let count = 0;
        let functionPushCheckBox = function (e) {
            for (let i = 0; i <= amountTask; i++) {
                if (e.target.id === "checkBox" + i) {
                    if (e.target.checked) {
                        count++;
                        let spanId = "span" + i;
                        let span = document.getElementById(spanId);
                        span.style.textDecoration = "line-through"
                        span.style.opacity = "0.3";
                        let input = document.getElementById("checkBox" + i);
                        input.checked = "true";
                        numberOfTasks();
                        visualizationNumberOfTasks();
                        clearCompletedBlock();

                    } else {
                        let spanId = "span" + i;
                        let span = document.getElementById(spanId);
                        span.style.textDecoration = "none"
                        span.style.opacity = "1";
                        numberOfTasks();
                        visualizationNumberOfTasks();
                        if (count === 0) {
                            clearCompletedNone();
                        }
                        count = 0;
                    }
                }
            }
            item();
        }

        let deleteTask = function (e) {
            for (let i = 0; i <= amountTask; i++) {
                if (e.target.id === "button" + i) {
                    let ul = document.querySelector('[class="todo-list"]');
                    ul.removeChild(document.getElementById("li" + i));
                    contentToDo.splice(i, 1);
                    item();
                    footerVisualization();
                    numberOfTasks();
                    visualizationNumberOfTasks();
                }
            }
        }

        let chooseAll = function (e) {
            if (e.target.id === "toggle-all") {
                if (e.target.checked) {
                    for (let i = 0; i <= amountTask; i++) {
                        let spanId = "span" + i;
                        let span = document.getElementById(spanId);
                        if (span !== null) {
                            span.style.textDecoration = "line-through"
                            span.style.opacity = "0.3";
                            let input = document.getElementById("checkBox" + i);
                            input.checked = "true";
                            let numbers = document.querySelector("strong");
                            numbers.innerText = "";
                            numbers.innerText = ("0");
                            clearCompletedBlock();
                        }
                    }
                } else {
                    for (let i = 0; i <= amountTask; i++) {
                        let spanId = "span" + i;
                        let span = document.getElementById(spanId);
                        if (span !== null) {
                            span.style.textDecoration = "none"
                            span.style.opacity = "1";
                            let input = document.getElementById("checkBox" + i);
                            input.checked = "";
                            numberOfTasks();
                            visualizationNumberOfTasks();
                            clearCompletedNone();
                        }
                    }
                }
            }
        }

        let clearCompletedNone = function () {
            let elem = document.getElementById("item2");
            elem.style.opacity = 0;
        }

        let clearCompletedBlock = function () {
            let elem = document.getElementById("item2");
            elem.style.opacity = "1";
        }

        let deleteClearCompleted = function (e) {
            if (e.target.id === "item2a") {
                for (let i = 0; i <= amountTask; i++) {
                    let checkBox = "checkBox" + i;
                    let elem = document.getElementById(checkBox);
                    if (elem !== null) {
                        if (elem.checked) {
                            let ul = document.querySelector('[class="todo-list"]');
                            ul.removeChild(document.getElementById("li" + i));
                            contentToDo.splice(i, 1);
                            item();
                            footerVisualization();
                            numberOfTasks();
                            visualizationNumberOfTasks();
                            clearCompletedNone();
                        }
                    }
                }
            }
        }


        let pushButtonCompleted = function (e) {
            let count = 0
            if (e.target.id === "completed") {
                for (let i = 0; i <= amountTask; i++) {
                    let checkBox = "checkBox" + i;
                    let elem = document.getElementById(checkBox);
                    if (elem !== null) {
                        if (elem.checked) {
                            count++;
                        }
                    }
                }

                for (let i = 0; i <= amountTask; i++) {
                    let checkBox = "checkBox" + i;
                    let elem = document.getElementById(checkBox);
                    if (elem !== null) {
                        if (!elem.checked) {
                            let liElem = document.getElementById("li" + i);
                            if (liElem !== null) {
                                if (count > 0) {
                                    liElem.style.display = "none";
                                }
                            }
                        }
                        if (elem.checked) {
                            let liElem = document.getElementById("li" + i);
                            if (liElem !== null) {
                                if (count > 0) {
                                    liElem.style.display = "block";
                                }
                            }
                        }
                    }
                }
                let elem = document.getElementsByClassName("selected");
                for (let i = 0; i < elem.length; i++) {
                    elem[i].className = "";
                }
                e.target.className = "selected";
            }
        }


        let pushButtonAll = function (e) {
            if (e.target.id === "all") {
                for (let i = 0; i <= amountTask; i++) {
                    let liElem = document.getElementById("li" + i);
                    if (liElem !== null) {
                        liElem.style.display = "block";
                    }
                }
                let elem = document.getElementsByClassName("selected");
                for (let i = 0; i < elem.length; i++) {
                    elem[i].className = "";
                }
                e.target.className = "selected";
            }
        }


        let pushButtonActive = function (e) {
            if (e.target.id === "active") {
                for (let i = 0; i <= amountTask; i++) {
                    let checkBox = "checkBox" + i;
                    let elem = document.getElementById(checkBox);
                    if (elem !== null) {
                        if (elem.checked) {
                            let liElem = document.getElementById("li" + i);
                            if (liElem !== null) {
                                liElem.style.display = "none";
                            }
                        }
                        if (!elem.checked) {
                            let liElem = document.getElementById("li" + i);
                            if (liElem !== null) {
                                liElem.style.display = "block";
                            }
                        }
                    }
                }
                let elem = document.getElementsByClassName("selected");
                for (let i = 0; i < elem.length; i++) {
                    elem[i].className = "";
                }
                e.target.className = "selected";
            }
        }

        let saveContent = [];
        let savePushElem = [];
        let numSaveContent = 0;
        window.onbeforeunload = function (e) {
            for (let i = 0; i <= amountTask; i++) {
                let li = document.getElementById("li" + i);
                if (li !== null) {
                    let span = "span" + i;
                    saveContent[numSaveContent] = document.getElementById(span).textContent;
                    if (document.getElementById("checkBox" + i).checked) {
                        savePushElem[numSaveContent] = true;
                    } else {
                        savePushElem[numSaveContent] = false;
                    }
                    numSaveContent++;
                }
            }
            localStorage.clear();
            localStorage.setItem('saveContent', JSON.stringify(saveContent));
            localStorage.setItem('savePushElem', JSON.stringify(savePushElem));
        }

        document.body.addEventListener("click", pushButtonActive);
        document.body.addEventListener("click", pushButtonAll);
        document.body.addEventListener("click", pushButtonCompleted);
        document.body.addEventListener("click", deleteClearCompleted);
        document.body.addEventListener("click", chooseAll);
        document.body.addEventListener("click", deleteTask);
        document.body.addEventListener("click", functionPushCheckBox);
        document.body.addEventListener("keydown", addNewTodo);
    }
);