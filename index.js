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
   checkBox()

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

pushData();
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

/* for deleting each item from data array */

const deleteListener = ()=>{
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((deleteBtn,i) =>{
  deleteBtn.addEventListener('click',()=>{
    /* After applying the filter method  get a filtered array,
    in which no item remains that we want to delete. Then reassign the data array. */
    const filteredArr = data.filter((singleObj) => singleObj.index !== i);
    data = filteredArr;
    /* after deleting update the index of the each object */
    data.forEach((singleObj,i)=>{
      singleObj.index =i;
    })
    setInLocal();
    displayOnUI()
  })
})
}

const checkBox = () => {
  const checks = document.querySelectorAll('.checkbox');
  const inputs = document.querySelectorAll('textarea');
  checks.forEach((ck, i) => {
    const isCompleted = data[i].completed;
    if (isCompleted) {
      inputs[i].classList.add('completed');
      checks[i].setAttribute('checked', 'checked');
    }
    ck.addEventListener('change', () => {
      if (checks[i].checked) {
        inputs[i].classList.add('completed');
        data[i].completed = true;
        // updateCompletedStatus(i, true);
      } else {
        inputs[i].classList.remove('completed');
        data[i].completed = false;
        // updateCompletedStatus(i, false);
      }
      setInLocal();
    });
  });
};

const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('.checkbox');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  /* update data array when any item delete */
  data = updateList;
  localStorage.setItem('list', JSON.stringify(updateList));
  displayOnUI();

});

document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

retrieveFromLocal();
displayOnUI();

