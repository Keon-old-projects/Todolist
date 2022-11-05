let section = document.querySelector('section');
let add = document.querySelector('form button');
add.addEventListener("click", e => {

    e.preventDefault();
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMon = form.children[1].value;
    let todoDate = form.children[2].value;
    // console.log(todoText+"  "+todoMon+"/"+todoDate);

    //設定未輸入的彈跳視窗
    if (todoText == "") {
        alert("請輸入文字");
        return
    }
    //todo清單
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add('todo-time');
    time.innerText = todoMon + ' / ' + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);


    //todo右側選項按鈕
    // 勾選
    let checkButton = document.createElement("button");
    checkButton.classList.add('check');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })
    // 垃圾
    let trashButton = document.createElement('button');
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.addEventListener('click', e => {
        let todoItem = e.target.parentElement;
        todoItem.style.animation = "scaleDown 0.2s forwards";
        trashButton.addEventListener('click', e => {
            let todoItem = e.target.parentElement;
            todoItem.style.animation = "scaleDown 0.2s forwards";
            todoItem.addEventListener("animationend", () => {
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem('list'));
                myListArray.forEach((item, index) => {
                    if (item.todoText == text) {
                        myListArray.splice(index, 1);
                        localStorage.setItem('list', JSON.stringify(myListArray));
                    }
                })
                todoItem.remove();
            })
        })
    })

    // 新增icons
    todo.appendChild(checkButton);
    todo.appendChild(trashButton);

    //動畫效果
    // todo.style.animation="scaleUP 0.5s forwards"

    //新增資料庫
    let myTodo = {
        todoText: todoText,
        todoMon: todoMon,
        todoDate: todoDate
    };
    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    // 新增清單
    form.children[0].value = "";
    section.appendChild(todo);
})
loadData();
function loadData() {

    let myList = localStorage.getItem('list');
    if (myList != null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add('todo-text');
            text.innerText = item.todoText;
            let time = document.createElement('p');
            time.classList.add('todo-time');
            time.innerText = item.todoMon + ' / ' + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            //勾選
            let checkButton = document.createElement("button");
            checkButton.classList.add('check');
            checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'

            checkButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle("done");
            })
            // 垃圾
            let trashButton = document.createElement('button');
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

            trashButton.addEventListener('click', e => {
                let todoItem = e.target.parentElement;
                todoItem.style.animation = "scaleDown 0.2s forwards";
                todoItem.addEventListener("animationend", () => {
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem('list'));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {
                            myListArray.splice(index, 1);
                            localStorage.setItem('list', JSON.stringify(myListArray));
                        }
                    })
                    todoItem.remove();
                })
            })

            // 新增icons
            todo.appendChild(checkButton);
            todo.appendChild(trashButton);
            // 新增清單

            section.appendChild(todo);
        });
    }
}

function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoMon) > Number(arr2[j].todoMon)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoMon) < Number(arr2[j].todoMon)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todoMon) == Number(arr2[j].todoMon)) {
            if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let rigth = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(rigth), mergeSort(left));
    }
}


let sortButton = document.querySelector(".btn");
sortButton.addEventListener('click', () => {
    //sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem('list', JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }
    loadData();
})