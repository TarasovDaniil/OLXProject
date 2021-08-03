function showPassword1() {
    const x = document.getElementById("pass_1");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPassword2() {
    const x = document.getElementById("pass_2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPassword3() {
    const x = document.getElementById("pass_3");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPassword4() {
    const x = document.getElementById("pass_4");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPassword5() {
    const x = document.getElementById("pass_5");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPassword6() {
    const x = document.getElementById("pass_6");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function getFile() {
    document.getElementById("upfile").click();
}

function change_height() {

    document.getElementById('height_params').style.cssText = 'height: 147vh; padding-top: 3rem;';
    document.getElementById('parameter').setAttribute("class", "parameter");

    document.getElementById('param_box_visible').style.cssText = "display: block; transition: .3s easy"
}

function dropBtn() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function dropBtn1() {
    document.getElementById("myDropdown1").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn1')) {

        let dropdowns = document.getElementsByClassName("dropdown-content1");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function dropBtn2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn2')) {

        let dropdowns = document.getElementsByClassName("dropdown-content2");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function dropBtn3() {
    document.getElementById("myDropdown3").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn3')) {

        let dropdowns = document.getElementsByClassName("dropdown-content3");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function dropBtn4() {
    document.getElementById("myDropdown4").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn4')) {

        let dropdowns = document.getElementsByClassName("dropdown-content4");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

