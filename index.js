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
   editListener();
   saveListener();
   deleteListener();

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

/* for the textarea  editable and show controllers(deleteBtn , saveBtn )*/
const editListener = ()=>{
  const textareas = document.querySelectorAll('textarea');
const editBtns = document.querySelectorAll('.editBtn');
const controllers = document.querySelectorAll('.controller');
editBtns.forEach((editBtn,i) =>{
  editBtn.addEventListener('click', ()=>{
    controllers[i].style.display = 'flex';
    editBtn.style.display = 'none';
    textareas[i].disabled = false;
  })
})
}

/* for saving the textarea after editing */
const saveListener = () =>{
  const textareas = document.querySelectorAll('textarea');
  const saveBtns = document.querySelectorAll('.saveBtn');
   saveBtns.forEach((saveBtn, i) =>{
    saveBtn.addEventListener('click',()=>{
      /* after editing reassign the selected textarea value/task in data array  */
     data[i].task = textareas[i].value;
     setInLocal();
     /* update UI and also disappear the controllers when call displayOnUI function */
     displayOnUI();
  })
})
}

/* for deleting each item / textarea */

const deleteListener = ()=>{
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((deleteBtn,i) =>{
  deleteBtn.addEventListener('click',()=>{
    /* After applying the filter method  get a filtered array,
    in which no item remains that we want to delete. Then reassign the data array. */
    data = data.filter((singleObj,index) => index !== i);
    /* after deleting update the index of the each object */
    data.forEach((singleObj,i)=>{
      singleObj.index =i;
    })
    setInLocal();
    displayOnUI()
  })
})
}

retrieveFromLocal();
pushData();
displayOnUI();

