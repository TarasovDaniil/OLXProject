function showPassword() {
    const x = document.getElementById('password');
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function setNewInputProxy() {
    let container = document.querySelector('#inputs_proxy');

    let inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'field array-item-input';
    inp.name = 'Proxies';
    inp.value = '';
    container.append(inp);
    proxies++;
}


if (proxies == 0) {
    setNewInputProxy();
}

document.querySelector('#proxy_btn').addEventListener('click', setNewInputProxy);
document.querySelector('#show_password').addEventListener('click', showPassword);