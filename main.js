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

    //trebuie sa verificam daca avem suficient de multe produse ca sa populam automatul
    //stoc pt fiecare produs (data-atribute)
    //setam o clasa pentru fiecare produs care sa fie codul produsului
    //data-atribute pentru fiecare produs care sa reprezinte indexul din lista
}

function listenBtns() {
    var okBtn = document.getElementById("okBtn");
    okBtn.addEventListener("click", showSum);
}

function showSum() {
    var sumNumber = document.getElementById("sumNumber");
    var sum = document.getElementById("sum");
    sum.innerHTML = sumNumber.value;
    sumNumber.value = 0;
}

function listenKeyPad() {
    var productCode = document.getElementById("productCode");
    var eraseBtn = document.getElementById("eraseBtn");

    eraseBtn.addEventListener("click", deleteCode);

    var keyPad = document.getElementById("keyPad");
    keyPad.addEventListener("click", onNumberPress);
}

function deleteCode() {
    var productCode = document.getElementById("productCode");
    productCode.innerHTML = "";
}

function onNumberPress(event) {
    var productCode = document.getElementById("productCode");
    var key = event.target.closest("div.number"); // luam cel mai apropiat div cu clasa "number" de event.target
    if (productCode.innerHTML.length === 2) {
        //da produsul
        returnProduct();
        return;
    } else {
        if (key.classList.contains("number")) {
            productCode.innerHTML += key.innerHTML;  
        }
    }
}

function returnProduct() {
    //verificam daca exista codul
    //verificam daca produsul are stoc
    //verificam daca avem bani
    //stoc --
    //bani --
    //stoc = zero--> schimbam imaginea
    //de scos imaginea de pe buton cand returnam produsul si de afisat in ecran codul
}