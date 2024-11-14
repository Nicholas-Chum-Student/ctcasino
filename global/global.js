(function () {
    const script = document.createElement('script');
    script.src = "https://kit.fontawesome.com/b278eaa481.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
})();

const G_balanceDOM = document.getElementById('G_balance')
const saved = localStorage.getItem('CTCFC_balance')
let G_balance = saved ? Number(saved) : 100

function setBalance(num) {
    localStorage.setItem('CTCFC_balance', num)
    G_balance = num
    if (!G_balanceDOM) return;
    G_balanceDOM.innerHTML = `$${Number(G_balance.toFixed(2)).toLocaleString()}`
}

if (G_balanceDOM) {
    G_balanceDOM.innerHTML = `$${Number(G_balance.toFixed(2)).toLocaleString()}`
}

window.addEventListener('pageshow', (event) => {
    if (G_balanceDOM) {
        G_balanceDOM.innerHTML = `$${Number(G_balance.toFixed(2)).toLocaleString()}`
    }
});