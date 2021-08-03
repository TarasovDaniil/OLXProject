class Paginator {
    constructor(current, all, parentElement, onChange) {
        this.current = current;
        this.all = all;
        this.onChange = onChange;
        this.parentElement = parentElement;

        if(this.current < 1 || this.current > this.all) {
            throw `Ошибка пагинатора: (текущая страница ${this.current}, всего страниц ${this.all})`
        }
    }

    render() {
        this.parentElement.innerHTML = '';
        if(this.all === 1) {
            return;
        }

        const links = [1, this.all];

        for(let i = this.current - 2; i <= this.current + 2; i++) {

            if(i < 1 || i > this.all) {
                continue
            }

            links.push(i);
        }

        const uniqLinks = [...new Set(links)];

        uniqLinks.sort((a, b) => a-b);

        for(let i = 0; i < uniqLinks.length; i++) {
            this._renderLink(uniqLinks[i]);

            if( (i+1) < uniqLinks.length && (uniqLinks[i] + 1 !== uniqLinks[i+1]) ) {
                this.__renderDots()
            }
        }
    }

    _renderLink(pageNum) {
        const a = document.createElement('button');
        //a.href = `/?page=${pageNum}`;
        a.className = 'btn';
        let _a = this;
        a.addEventListener('click', function(){
            _a.current = pageNum;
            _a.onChange(pageNum);
            _a.render();
        });
        a.append(pageNum)

        if(pageNum == this.current) {
            a.classList.add('active')
        }

        this.parentElement.appendChild(a)
    }

    __renderDots() {
        const span = document.createElement('button');
        span.innerHTML = '...';
        span.disabled = true;
        span.className = 'btn';
        this.parentElement.appendChild(span)
    }
}
//Класс пагинатора