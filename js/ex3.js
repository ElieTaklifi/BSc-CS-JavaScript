if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        creatTable();
        document.getElementById("messageForm").addEventListener("submit", (event) => {

            event.preventDefault();
            errorMessages = [];

            // we build the new product object from the form input:
            let prod = {
                reference: document.getElementById("productRef").value.trim(),
                name: document.getElementById("productName").value.trim(),
                description: document.getElementById("productDescription").value.trim(),
                price: document.getElementById("productPrice").value.trim()
            }
            // we validate the product:
            if (validateProduct(prod)) {

                // if the product is valid, we add it to the list of products:
                document.getElementById("errorMessages").innerHTML = "Product is saved!";

                // add the product to the list of products and update the HTML table
                addProduct(prod);

            } else
                // if the product is not valid, we display the errors:
                document.getElementById("errorMessages").innerHTML = convertErrorsToHtml(errorMessages);
        });

        // the sort button handler:
        document.getElementById("sortByReference").addEventListener("click", (event) => {
            sortProductsByReference();
        })

    });
}

const forbiddenWords = ["politics", "religion", "cheap", "expensive", "money", "offer"]
let errorMessages = []
let productsList = []
let headersTitle = ['Reference', 'Name','Description', 'Price']
let myTable = document.getElementById("productsTable");

function validateProduct(formInput) {

    temp = true;
    if(
        checkRef(formInput["reference"])
        && checkName(formInput["name"])

    )
        return true;
    else{
        return false;
    }
}


//************************************************/
function checkRef(inp){
    if(isEmpty(inp) || isLetterOrNumber(inp) || isMoreThan(20)){
        return false;
    }
    return true
}

function checkName(inp){
    if(isEmpty(inp) || isMoreThan(inp,50) || isInList(inp) ){
        return false;
    }
    return true
}
//************************************************/


//************************************************/
const isEmpty = function (inp) {
    if(inp.length === 0){
        errorMessages.push("Input is empty");
        return true;
    }
    return false;
}

const isLetterOrNumber = function (inp) {
    if(!inp.match(/^[A-Za-z0-9]*$/)){
        errorMessages.push("Input contains something else than letters or digits");
        return true;
    }
    return false;
}

const isMoreThan = function (inp,num) {
    if(inp.lenght > num){
        errorMessages.push(`Input is more than ${num} letters`);
        return true;
    }
    return false;
}

const isInList = function (inp) {
    for(const word of forbiddenWords){
        if(inp === word){
            errorMessages.push(`Input ${inp} is in the forbidden lists words`);
            return true;
        }
    }
    return false;
}
//************************************************/




/** you need to implement this function - do not change the name of the function
 * @param listOfErrors an array of strings containing the error messages
 * @returns {string|string|*} the HTML code to display the errors
 */
function convertErrorsToHtml(listOfErrors) {
    result ="<p>Please correct the following mistake(s):</p>"
    result += "<ol>";
    for (var c of listOfErrors) {
        result += "<li>" + c + "</li>";
    }
    result += "</ol>";

    return result;
}

//-------------------------------------------------------------
function creatTable(){

    let table = document.createElement('table');
    table.setAttribute('class', 'table');
    table.setAttribute('id', 'tableProducts');



    let thead = document.createElement('thead');
    table.appendChild(thead);

    let headerRow = document.createElement('tr');
    headersTitle.forEach(headerText =>{
        let header = document.createElement('th');
        header.setAttribute('scope', 'col');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
    myTable.appendChild(table);
    myTable.style.display = "none";
}
//-------------------------------------------------------------


/** you need to implement this function - do not change the name of the function
 * add a product to the productsList and update the HTML displaying the list of products using displayProducts()
 * @param product an object, the new product to add (see the code line 61)
 */
function addProduct(product) {
    productsList.push(product);

    myTable.style.display = "initial";
    let table = document.getElementById("tableProducts");
    let tbody = document.createElement('tbody');

    table.appendChild(tbody);
    let row = document.createElement('tr');
    Object.values(product).forEach(text=>{
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })

    table.appendChild(row);
}

function displayProducts (prod)  {
    document.getElementById("productsTable").innerHTML = result; }

/** you need to implement this function - do not change the name of the function
 * sort the productsList amd update the HTML displaying the list of products using displayProducts()
 */
function sortProductsByReference() {
}



