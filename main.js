var products = [
    {
        code: "01",
        name: "Choco Croissant",
        price: 2.5
    },
    {
        code: "02",
        name: "Orange Croissant",
        price: 2.5
    },
    {
        code: "03",
        name: "Cookies Croissant",
        price: 2.5
    },
    {
        code: "04",
        name: "Peanuts Croissant",
        price: 2.5
    },
    {
        code: "05",
        name: "Berry Croissant",
        price: 2.5
    },
    {
        code: "06",
        name: "Pepsi",
        price: 3.5
    },
    {
        code: "07",
        name: "Coke",
        price: 3.5
    },
    {
        code: "08",
        name: "Diet Coke",
        price: 3.5
    },
    {
        code: "09",
        name: "Cherry Coke",
        price: 3.5
    },
    {
        code: "10",
        name: "RedBull",
        price: 7
    },
    {
        code: "11",
        name: "Lays Pizza",
        price: 2
    },
    {
        code: "12",
        name: "Lays Classic",
        price: 2
    },
    {
        code: "13",
        name: "Lays Vinegar",
        price: 2
    },
    {
        code: "14",
        name: "Lays Wavy",
        price: 2
    },
    {
        code: "15",
        name: "Lays Barbeque",
        price: 3
    }
]; 


var productsPerSlot = 5;
var rows = 3;
var columns = 5;

document.addEventListener("DOMContentLoaded", onload);

function onload() {
    //afisam produsele
    populate();
    //evenimente pe butoane (OK si Change)
    listenBtns();
    //evenimente pe butoanele cu numere
    listenKeyPad();
}

function populate() {
    var divContainer = document.getElementById("products");
    for (var i = 0; i < rows; i++) {
        var productsRow = document.createElement("div");
        for (var j = 0; j < columns; j++) {
            var product = document.createElement("div");
            //stoc pt fiecare produs (data-atribute)
            product.setAttribute("data-stock", productsPerSlot);
            //setam o clasa pentru fiecare produs care sa fie codul produsului
            product.classList.add("cls-" + products[j+columns*i].code);
            console.log(j+columns*i); //liniarizarea matricei - indici cu valori de la 0 la 14

            var productCode = document.createElement("div")
            productCode.innerHTML = "Code: " + products[j+columns*i].code;
            var productName = document.createElement("div");
            productName.innerHTML = products[j+columns*i].name;
            var productImg = document.createElement("img");
            productImg.setAttribute("src", "media/products/" + j+columns*i + ".png");
            var productPrice = document.createElement("div");
            productPrice.innerHTML = products[j+columns*i].price + " Ron";

            product.appendChild(productCode);
            product.appendChild(productName);
            product.appendChild(productImg);
            product.appendChild(productPrice);

            productsRow.appendChild(product);
        }
        divContainer.appendChild(productsRow);
    }
}

function listenBtns() {
    var okBtn = document.getElementById("okBtn");
    okBtn.addEventListener("click", showSum);

    var changeBtn = document.getElementById("changeBtn");
    changeBtn.addEventListener("click", giveChange);
}

function showSum() {
    var sumNumber = document.getElementById("sumNumber");
    var sum = document.getElementById("sum");
    sum.innerHTML = parseInt(sumNumber.value) + parseInt(sum.innerHTML);
    sumNumber.value = 0;
}

function giveChange() {
    var sum = document.getElementById("sum");
    var errors = document.getElementById("errs");
    errors.innerHTML = "Your change is: " + sum.innerHTML;
    sum.innerHTML = 0;
    delErrs();
}

function listenKeyPad() {
    var productCode = document.getElementById("productCode");
    var eraseBtn = document.getElementById("eraseBtn");
    var okBtn = document.getElementById("codOk");

    eraseBtn.addEventListener("click", deleteCode);
    okBtn.addEventListener("click", returnProduct);

    var keyPad = document.getElementById("keyPad");
    keyPad.addEventListener("click", onNumberPress);
}

function deleteCode() {
    var productCode = document.getElementById("productCode");
    productCode.innerHTML = "";
}

function onNumberPress(event) {
    var productCode = document.getElementById("productCode");
    var key = event.target.closest("div.number span"); // luam cel mai apropiat div cu clasa "number" de event.target
    if (key != null) {
        productCode.innerHTML += key.innerHTML;
    }
}

function returnProduct() {
    //verificam daca exista codul
    var productCode = document.getElementById("productCode").innerHTML;
    var errors = document.getElementById("errs");
    var productFound = false;
    for (i = 0; i < products.length; i++) {
        if (productCode == products[i].code) { //produsul exista
            var htmlProduct = document.getElementsByClassName("cls-" + productCode)[0];
            //verificam daca produsul are stoc
            var productStock = parseInt(htmlProduct.getAttribute("data-stock")); //productStock = integer
            if (productStock > 0 ) {
                //verificam daca avem bani
                var sum = document.getElementById("sum");
                var initSum = parseInt(sum.innerHTML);
                if (initSum >= products[i].price) {
                    productStock --;
                    htmlProduct.setAttribute("data-stock", productStock);
                    //stoc = zero--> schimbam imaginea
                    if (productStock === 0) {
                        var productImg = htmlProduct.getElementsByTagName("img")[0];
                        productImg.setAttribute("src", "media/products/out-of-stock.png");
                    }
                    sum.innerHTML = initSum - products[i].price;
                    document.getElementById("productCode").innerHTML = "";
                } else {
                    errors.innerHTML = "You don't have enough money!!!";
                    delErrs();
                }
            } else {
                errors.innerHTML = "Out Of Stock!!!";
                delErrs();
            }
            productFound = true;
        }
    } 
    if (productFound === false) {
        errors.innerHTML = "Product Not Found!!!";
        document.getElementById("productCode").innerHTML = "";
        delErrs();
    }     
}

function delErrs() {
    var productCode = document.getElementById("productCode");
    productCode.innerHTML = "";
    setTimeout(function(){
        var errors = document.getElementById("errs");
        errors.innerHTML="";
    }, 5000);
}

