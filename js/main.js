async function getData(date) {
    const mathDate = `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`
    const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${mathDate}`
    
    try {
        const response = await fetch(url)
        const data = await response.json()

        const table = document.querySelector('table')
        table.innerHTML = `
                <tr>
                    <th>baseCurrency</th>
                    <th>currency</th>
                    <th>saleRateNB</th>
                    <th>purchaseRateNB</th>
                </tr>
            `

        data.exchangeRate.forEach(element => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${element.baseCurrency}</td>
            <td>${element.currency}</td>
            <td>${element.saleRateNB}</td>
            <td>${element.purchaseRateNB}</td>
            `
            table.appendChild(tr)
        });
    } catch (error) {
        console.error(error)
    }
}
document.getElementById('go').addEventListener('click', () => {
    const date = document.getElementById('inputDate').value;
    getData(date);
});

document.getElementById('now').addEventListener('click', () => {
    const date = new Date().toISOString().split('T')[0]
    getData(date)    
})