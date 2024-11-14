const isProduction = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
const startIndex = window.location.origin.length

document.addEventListener("DOMContentLoaded", function () {
    console.log('sigma')
    const cssLinks = document.querySelectorAll('link');
    const jsScripts = document.querySelectorAll('script');
    const aLinks = document.querySelectorAll('a');


    if (cssLinks) cssLinks.forEach((dom) => {
        if (dom.href.charAt(startIndex) != '/') return;
        dom.href = isProduction ? `/fake-casino${dom.href.split(window.location.origin)[1]}` : dom.href
    })
    if (jsScripts) jsScripts.forEach((dom) => {
        if (dom.src.charAt(startIndex) != '/') return;
        dom.src = isProduction ? `/fake-casino${dom.src.split(window.location.origin)[1]}` : dom.src
    })
    if (aLinks) aLinks.forEach((dom) => {
        if (dom.href.charAt(startIndex) != '/') return;
        dom.href = isProduction ? `/fake-casino${dom.href.split(window.location.origin)[1]}` : dom.href
    })
});