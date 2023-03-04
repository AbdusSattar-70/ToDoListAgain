let data =[];

const setInLocal = () => {
  localStorage.setItem('list', JSON.stringify(data));
};

const retrieveFromLocal = () => {
  const storedData = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')):[];
  data = storedData;
};

/* display on UI  */

const displayOnUI = () =>{
  let items = '';
  data.forEach((toDoList) =>{
    items +=` <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr> `;
  });
  document.querySelector('.displayListCont').innerHTML = items;
}

/* generate Index for every toDoList */
const generateIndex = ()=>{
  return data.length;
}
/* push data from the input field in the data array  */
const pushData = () => {
  const form = document.querySelector('.form');
  const { inputField } = form.elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = inputField.value;
    const index = generateIndex();
    const completed = false;
    /* create object for every toDoList */
    const info = {task:task,index:index,completed:completed}
    data.push(info);
    /* set data in localStorage */
    setInLocal();
    form.reset();
    /* show update data on UI without reloading */
    displayOnUI();
  });
};

retrieveFromLocal();
pushData();
displayOnUI();

