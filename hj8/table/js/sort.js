'use strict';

const tableVar = document.querySelector(`table`);

tableVar.addEventListener(`click`, handleTableClick);

function handleTableClick(e) {
  const tableData = e.currentTarget.dataset;
  const thData = e.target.dataset;
  
  if (thData.propName)
    if (thData.dir === '1')
      thData.dir = '-1';
    else
      thData.dir = '1';
  tableData.sortBy = thData.propName;
  
  sortTable(thData.propName, thData.dir);
}
