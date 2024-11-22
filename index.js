const buttons = document.querySelectorAll("nav button");

buttons.forEach((button) => {
    button.onclick = function () {
        buttons.forEach((btn) => {
            btn.className = ''
        })
        document.getElementsByTagName("iframe")[0].src =
            button.getAttribute("--data-link");
        button.className = 'selected'
    };
});
