'use strict'
let map = 9;

class tableGenerator {
    constructor(container) {
        this.x = '';
        this.y = '';
        this.cNTr = '';
        this.cNTd = '';
        this.trId = '';
        this.tdId = '';
        this.text = '';
        this.table = undefined;
        this.tableCss = undefined;
        this.container = document.querySelector(container);
        this.sX = 0;
        this.sY = 0;
        this.fX = 0;
        this.fY = 0;
        this.delX = undefined;
        this.delY = undefined;

        this.mapTable = [0][0] = {
            rowSpan: undefined,
            colSpan: undefined,
            noRendering: false,
        };
    }

    mapTableGenerate() {
        if (!this.x || !this.y) return;
        this.mapTable = new Array(y);
        let element = {
            rowSpan: undefined,
            colSpan: undefined,
            noRendering: undefined,
        }
        for (let y = 0; y < this.y; y++) {
            this.mapTable[y] = new Array(this.x);
            for (let x = 0; x < this.x; x++) {
                this.mapTable[y][x] = element;
            }
        }
        console.log(this.mapTable)
    }

    tableGenerate() {
        const content = document.createElement('tbody');
        const css = {div: document.createElement('div'), css: ''}
        for (let y = 0; y < this.mapTable.length; y++) {
            const tr = document.createElement('tr');
            let key = false;
            for (let x = 0; x < this.mapTable[y].length; x++) {
                if (this.mapTable[y][x].noRendering === undefined ||
                    x === this.mapTable[y][x].noRendering.x &&
                    y === this.mapTable[y][x].noRendering.y
                ) {
                    key = false;
                    break;
                }
                key = true;
            }
            if (key) {
                content.appendChild(tr);
                continue;
            }
            this.trId && tr.setAttribute('id', this.trId + y);
            this.cNTr && tr.setAttribute('class', this.cNTr);

            for (let x = 0; x < this.mapTable[y].length; x++) {
                const td = document.createElement('td');
                this.tdId && td.setAttribute('id', this.tdId + y + '_' + x);
                this.cNTd && td.setAttribute('class', this.cNTd);
                if (this.mapTable[y][x].noRendering) {
                    continue;
                }
                (this.mapTable[y][x].colSpan || this.mapTable[y][x].colSpan !== 1) && td.setAttribute('colSpan', this.mapTable[y][x].colSpan);
                (this.mapTable[y][x].rowSpan || this.mapTable[y][x].rowSpan !== 1) && td.setAttribute('rowSpan', this.mapTable[y][x].rowSpan);
                td.innerHTML = this.text && this.text + x + ' ' + y;
                let [sX, sY, fX, fY] = [0, 0, 0, 0];
                td.onmousedown = e => {
                    this.sX = x;
                    this.sY = y;
                }
                td.onmouseup = e => {
                    this.fX = x;
                    this.fY = y;
                    if (this.sX > this.fX && this.sY <= this.fY) {
                        let temp = this.sX;
                        this.sX = this.fX;
                        this.fX = temp;
                    }
                    if (this.sX <= this.fX && this.sY > this.fY) {
                        let temp = this.sY;
                        this.sY = this.fY;
                        this.fY = temp;
                    }
                    if (this.sX > this.fX && this.sY > this.fY) {
                        let temp = this.sX;
                        this.sX = this.fX;
                        this.fX = temp;

                        temp = this.sY;
                        this.sY = this.fY;
                        this.fY = temp;
                    }
                    if (this.sX <= this.fX && this.sY <= this.fY) {
                        this.select(this.sX, this.sY, this.fX + 1, this.fY + 1);
                        this.tableGenerate();
                    }
                }
                td.onmouseover = (e) => {
                    this.delX = x;
                    this.delY = y;
                }
                td.oncontextmenu = (e) => {
                    this.del(this.delX, this.delY);
                    this.tableGenerate();
                }
                tr.appendChild(td);
            }
            tr.children.length > 0 && content.appendChild(tr);
        }
        this.container.innerHTML = '';
        this.container.appendChild(content);
        this.table = this.container;
    }

    select(sX, sY, fX, fY) {
        if (sX >= fX && sY >= fY) return;
        for (let y = sY; y < fY; y++) {
            for (let x = sX; x < fX; x++) {
                if (this.mapTable[y][x].noRendering !== undefined) return;
            }
        }
        let temp = {x: sX, y: sY}
        this.mapTable[sY][sX] = {
            rowSpan: (fY - sY > 0 && (fX - sX) < this.x) ? fY - sY : undefined,
            colSpan: (fX - sX > 0) ? fX - sX : undefined,
            noRendering: undefined,
        }
        for (let y = sY; y < fY; y++) {
            for (let x = sX; x < fX; x++) {
                if (y === sY && x === sX) continue;
                this.mapTable[y][x] = {
                    rowSpan: undefined,
                    colSpan: undefined,
                    noRendering: temp,
                }
            }
        }
    }

    del(X, Y) {
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                if (this.mapTable[y][x].noRendering &&
                    this.mapTable[y][x].noRendering.x === X &&
                    this.mapTable[y][x].noRendering.y === Y ||
                    (x === X && y === Y)) {
                    this.mapTable[y][x].noRendering = undefined;
                }
            }
        }
    }
}

let t = new tableGenerator('#container');
let panel = document.querySelector('#panel');
panel.oninput = e => {
    var value = e.target.value;
    var errors = text => {
        document.querySelector('#errors').innerHTML = text;
    }
    switch (e.target.getAttribute('id')) {
        case 'x': {
            if (isNaN(value)) {
                errors('X должен быть числом.');
                break;
            } else {
                t.x = value;
                errors('|');
                break;
            }
        }
        case 'y': {
            if (isNaN(value)) {
                errors('Y должен быть числом.');
                break;
            } else {
                t.y = value;
                errors('|');
                break;
            }
        }
        case 'text': {
            t.text = value;
            break;
        }
        case 'cNTr': {
            t.cNTr = value;
            break;
        }
        case 'cNTd': {
            t.cNTd = value;
            break;
        }
        case 'idNTr': {
            t.trId = value;
            break;
        }
        case 'idNTd': {
            t.tdId = value;
            break;
        }
        case 'clearEdit': {
            t.clearEdit = value;
            return;
        }
    }
    t.mapTableGenerate();
    t.tableGenerate();
}
let copy = document.querySelector('#copy');
copy.onclick = e => {
    navigator.clipboard.writeText(t.table.outerHTML);
}
window.addEventListener('contextmenu', (e) => e.preventDefault());