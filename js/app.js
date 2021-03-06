'use strict';

//docs used from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//console.log('Hello Seattle');

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const shopLocationTotals =[];
let grandTotal = new Array(hours.length+1).fill(0);
let table = document.getElementById('table');
let body =document.createElement('tbody');
table.appendChild(body);
let myform = document.querySelector('form');

function ShopLocation(name, minCustomer, maxCustomer, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.cookiesSoldPerHour = [];
  this.storeTotalPerDay = 0;
  shopLocationTotals.push(this);
  this.locationRender();
  this.calcTotal();

}

ShopLocation.prototype.randoCustomerPerHour = function () {
  return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
};

ShopLocation.prototype.addCookiesSoldPerHour = function () {
  for (var i = 0; i < hours.length; i++) {
    let randoCustomerForOneHour = this.randoCustomerPerHour();
    let cookiesPerHour =  Math.floor(randoCustomerForOneHour * this.avgCookiePerCustomer) + 1;
    this.cookiesSoldPerHour.push(cookiesPerHour);
    this.storeTotalPerDay += cookiesPerHour;
  }
};

ShopLocation.prototype.locationRender = function() {
  this.addCookiesSoldPerHour();
  let tr = document.createElement('tr'); // creating a row to be rendered on the sales page
  let th = document.createElement('th'); //creating the actual cells like in a speadsheet
  th.textContent = this.name;//assignnig the value of 'th' as this.name which is the naes of each city
  tr.appendChild(th);//appending the 'th' to the row so that it can be rendered.
  for (let i = 0; i < this.cookiesSoldPerHour.length; i++){//itirating over the array to get cookies sold per hour
    let td = document.createElement('td');//creating table data.
    td.textContent = this.cookiesSoldPerHour[i];//giving table data content from the cookiessoldperhour array
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.textContent = this.storeTotalPerDay;
  tr.appendChild(td);
  body.appendChild(tr);//appending the row to the table body. The row is the child of the body
};

function headerRender(){
  let head = document.createElement('thead');
  let tr = document.createElement('tr');
  let th = document.createElement('th');
  tr.appendChild(th);

  for(let i = 0; i < hours.length; i++){
    th = document.createElement('th');
    th.textContent = hours[i];
    tr.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'Store Daily Totals';
  tr.appendChild(th);
  head.appendChild(tr);
  table.appendChild(head);
}

function footerRender(){
  let tfoot = document.createElement('tfoot');
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.textContent = 'Totals';
  tr.appendChild(td);

  for(let i = 0; i < grandTotal.length; i++){
    td = document.createElement('td');
    td.textContent = grandTotal[i];
    tr.appendChild(td);
  }
  tfoot.appendChild(tr);
  table.appendChild(tfoot);
}


ShopLocation.prototype.calcTotal = function (){
  for (let i = 0; i < this.cookiesSoldPerHour.length; i++){
    grandTotal[grandTotal.length - 1] += this.cookiesSoldPerHour[i];
    grandTotal[i] += this.cookiesSoldPerHour[i];

  }
};

function handleSubmit(event) {
  event.preventDefault();
  let locationName = event.target.location.value;
  let minCustomer = +event.target.minCustomer.value;
  let maxCustomer = +event.target.maxCustomer.value;
  let avgCookiePerCustomer = +event.target.avgCookiePerCustomer.value;
  let newShop = new ShopLocation(locationName, minCustomer, maxCustomer, avgCookiePerCustomer);
  newShop.render();

  document.getElementById('table').deleteRow(-1);
  footerRender();
}

let seattle = new ShopLocation ('Seattle', 23, 65, 6.3);
// seattle.calcTotal();- another way to call the function
// seattle.locationRender();
let tokyo = new ShopLocation ('Tokyo', 3, 24, 1.2);
let dubai = new ShopLocation ('Dubai',	11,	38,	3.7);
let paris = new ShopLocation ('Paris', 20, 38, 2.3);
let lima = new ShopLocation ('Lima', 2, 16, 4.6);
console.log(grandTotal);

headerRender();
footerRender();

myform.addEventListener('submit', handleSubmit);
