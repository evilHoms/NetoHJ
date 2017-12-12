'use strict';
//const node = {
//  name: 'h1',
//  props: {
//    class: 'main-title'
//  },
//  childs: [
//    'Заголовок'
//  ]
//};
//Arg[0]: структурированный объект
//return: готовый HTMLElement на основе входных данных
function createElement(obj) {
  if (typeof obj !== `object`)
    throw new Error(`createElement arrgument must be Object`);
  if (obj.name === undefined)
    throw new Error(`Tag name is required`);

  const element = document.createElement(obj.name);
  if (obj.props && obj.props.class) {
    element.className = obj.props.class;
  }
  
  for (let i in obj.props) {
    if (obj.props.hasOwnProperty(i) && i !== `class`) {
      element.setAttribute(i, obj.props[i]);
    }
  }
  obj.childs.forEach(addContent);

  return element;


  function addContent(content) {
    if (typeof content === `string`) {
      element.textContent += content;
    }
    else if (typeof content === `object`) {
      element.appendChild(createElement(content));
    }
  }
}