const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
   for(currency_code in country_list) {
      let selected;
      if (i == 0) {
         selected = currency_code == "USD" ? "selected" : "";
      } else if (i == 1) {
         selected = currency_code == "NPR" ? "selected" : "";
      }
      let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
      dropList[i].insertAdjacentHTML("beforeend",optionTag);
   }
   dropList[1].addEventListener("change",e => {
      loadFlag(e.target);
   })
}

const ApiKEY = "3385d73f922be69fe4579626";

const getExchangeRate = () => {
   const amount = document.querySelector(".amount input"),
   exchangeRateTxt = document.querySelector(".exchange-rate");
   let amountVal = amount.value;
   if (amountVal == "" || amountVal == "0") {
      amount.value = "1";
      amountVal = 1;
   }
   exchangeRateTxt.innerText = "Getting exchange rate..."
   let url = `https://v6.exchangerate-api.com/v6/${ApiKEY}/latest/${fromCurrency.value}`;
   fetch(url).then(response => response.json()).then(result => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      // console.log(exchangeRate);
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
   })
}

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",() => {
   let tempCode = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = tempCode;
   getExchangeRate();
})

window.addEventListener("load",e => {
   getExchangeRate();
})

getButton.addEventListener("click",e => {
   e.preventDefault();
   getExchangeRate();
})