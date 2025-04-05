async function getData(date) {
    const mathDate = `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`
    const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${mathDate}`
    
    try {
        const response = await fetch(url)
        const data = await response.json()
        document.getElementById('info').textContent = `Курси на дату: ${mathDate}`

        document.getElementById('convertBtn').addEventListener('click', () => {
            const fromCurrency = document.getElementById('fromCurrencyInput').value.toUpperCase()
            const toCurrency = document.getElementById('toCurrencyInput').value.toUpperCase()
            const suma = document.getElementById('suma').value

            const fromCurrencyData = data.exchangeRate.find(rate => rate.currency === fromCurrency);
            const toCurrencyData = data.exchangeRate.find(rate => rate.currency === toCurrency);

            if (!fromCurrencyData || !toCurrencyData) {
                document.getElementById('result').textContent = 'Введені валюти не знайдено.';
                return;
            }

            const fromRate = fromCurrencyData.saleRateNB;
            const toRate = toCurrencyData.purchaseRateNB;

            const convertedSuma = (suma / toRate) * fromRate;

            document.getElementById('result').textContent = `Результат: ${convertedSuma.toFixed(2)}`;
        })

        const table = document.querySelector('table')
        table.innerHTML = `
                <tr>
                    <th>Базова валюта</th>
                    <th>Валюта для обміну</th>
                    <th>Курс продажу</th>
                    <th>Курс купівлі</th>
                </tr>
            `

        const filterCurrency = document.getElementById('filterCurrency').value
        data.exchangeRate.forEach(element => {
            if (filterCurrency === 'all' || element.currency === filterCurrency) {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            } else 
            if (filterCurrency === 'USD' && element.currency === 'USD') {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            } else 
            if (filterCurrency === 'EUR' && element.currency === 'EUR') {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            } else 
            if (filterCurrency === 'PLN' && element.currency === 'PLN') {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            } else 
            if (filterCurrency === 'CZK' && element.currency === 'CZK') {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            } else 
            if (filterCurrency === 'allFamous' && 
                (element.currency === 'USD' || element.currency === 'EUR' || element.currency === 'PLN' || element.currency === 'CZK')) {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${element.baseCurrency}</td>
                <td>${element.currency}</td>
                <td>${element.saleRateNB}</td>
                <td>${element.purchaseRateNB}</td>
                `   
                table.appendChild(tr)
            }
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