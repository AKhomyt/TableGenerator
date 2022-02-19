'use strict'
class Element {
    constructor(type) {
        this.element = document.createElement(type);
    }
    pastIn(container){
        container.appendChild(this.element);
    }
    content(content){
        this.element.innerHTML = content;
    }
}
let cteateElement = (type)=>{
    let result = new Element(type);
    return result;
};
export {cteateElement}