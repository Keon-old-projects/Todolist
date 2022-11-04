let section =document.querySelector('section');
let add=document.querySelector('form button');
add.addEventListener("click", e => {
    
    e.preventDefault();
    let form=e.target.parentElement;
    let todoText=form.children[0].value;
    let todoMon=form.children[1].value;
    let todoDate=form.children[2].value;
    // console.log(todoText+"  "+todoMon+"/"+todoDate);

    //todo清單
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText=todoText;
    let time = document.createElement("p");
    time.classList.add('todo-time');
    time.innerText=todoMon+' / '+todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    

    //todo右側選項按鈕
    // 勾選
    let checkButton = document.createElement("button");
    checkButton.classList.add('check');
    checkButton.innerHTML='<i class="fa-solid fa-check"></i>'
    checkButton.addEventListener("click",e=>{
        let todoItem=e.target.parentElement;
        todoItem.classList.toggle("done");
    })
    // 垃圾
    let trashButton = document.createElement('button');
    trashButton.classList.add("trash");
    trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    trashButton.addEventListener('click',e=>{
        let todoItem=e.target.parentElement;
        todoItem.style.animation="scaleDown 0.2s forwards";
        todoItem.addEventListener("animationend",()=>{
            todoItem.remove();
        })
    })
    
    // 新增icons
    todo.appendChild(checkButton);
    todo.appendChild(trashButton);

    //動畫效果
    // todo.style.animation="scaleUP 0.5s forwards"
    // 新增清單
    section.appendChild(todo);
})