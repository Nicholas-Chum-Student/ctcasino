function typeWrite(dom,text) {
    let i = 0
    function write() {
        if (i < text.length) {
            dom.textContent += text.charAt(i)
            i++
            setTimeout(write,50)
        }
    }
    write()
}

const didAnimation = sessionStorage.getItem('didAnimation')
    
document.getElementById('resetMoney').onclick = function() {
    setBalance(100)
}

if (didAnimation) {
    document.getElementById('title1').innerHTML = "Welcome to the "
    document.getElementById('title2').innerHTML = "Fake Casino"
    document.getElementsByTagName('main')[0].style.height = '90%'
    document.getElementsByTagName('main')[0].style.opacity = '1'
} else {
    document.addEventListener("DOMContentLoaded", function() {
        const segment1 = "Welcome to the ";
        const segment2 = "Fake Casino";

        const title1 = document.getElementById('title1')
        const title2 = document.getElementById('title2')
     
        typeWrite(title1,segment1)
        setTimeout(() => {
            typeWrite(title2,segment2)
        },850)
        setTimeout(() => {
            document.getElementsByTagName('main')[0].style.height = '90%'
            document.getElementsByTagName('main')[0].style.opacity = '1'
        }, 1300)
    });
    sessionStorage.setItem('didAnimation',true)
}