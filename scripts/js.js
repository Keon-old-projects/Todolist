let section =document.querySelector('section');
let add=document.querySelector('form button');
add.addEventListener("click", e => {
    
    e.preventDefault();
    let form=e.target.parentElement;
    let todoText=form.children[0].value;
    let todoMon=form.children[1].value;
    let todoDate=form.children[2].value;
    // console.log(todoText+"  "+todoMon+"/"+todoDate);

    //新增todo清單
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerHTML=todoText;
    let time = document.createElement("p");
    time.classList.add('todo-time');
    time.innerHTML=todoMon+' / '+todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    section.appendChild(todo);
})