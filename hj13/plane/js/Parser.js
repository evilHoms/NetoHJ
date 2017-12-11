'use strict';

class Parser {
  constructor() {

  }
  
  //Arg[0]: структурированный объект
  //return: готовый HTMLElement на основе входных данных
  createElement(obj) {
    if (typeof obj !== `object`)
      throw new Error(`createElement arrgument must be Object`);
    if (obj.tagName === undefined)
      throw new Error(`Tag name is required`);
    
    const element = document.createElement(obj.tagName);
    element.className = obj.className;
    if (obj.attrs) {
      obj.attrs.forEach(attr => {
        element.setAttribute(attr.key, attr.value);
      });
    }
    
    
    if (Array.isArray(obj.content)) {
      obj.content.forEach(el => {
        addContent(el, this);
      });
    }
    else {
      addContent(obj.content, this);
    }
    
   
    return element;
    
    
    function addContent(content, self) {
      if (typeof content === `string`) {
        element.textContent = content;
      }
      else if (typeof content === `object`) {
        element.appendChild(self.createElement(content));
      }
    }
  }
}