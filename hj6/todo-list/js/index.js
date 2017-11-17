'use strcit';

const listBlock = document.querySelector(`.list-block`);
const tasks = listBlock.querySelectorAll(`input`);
const output = listBlock.querySelector(`output`);

tasks.forEach(task => {
  task.addEventListener(`click`, (e) => {
    inspectForm(tasks, output, listBlock);
  });
});

inspectForm(tasks, output, listBlock);



function calculateChecked(list) {
  let checked = 0;
  list.forEach(item => {
    if (item[`checked`]) 
      checked++;
  });
  return checked;
}

function changeComplete(current, total, wrapper) {
  if (current === total)
    wrapper.classList.add(`complete`);
  else
    wrapper.classList.remove(`complete`);
}

function inspectForm(tasks, out, wrapper) {
  const numberOfTasks = tasks.length;
  const numberOfCheckedTasks = calculateChecked(tasks);
  
  changeComplete(numberOfCheckedTasks, numberOfTasks, wrapper);
  out.value = `Выполнено ${numberOfCheckedTasks} из ${numberOfTasks}`;
}