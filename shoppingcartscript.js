var xhr = createRequest();

function addItemtoCart(){}

function displayProductList(){
    if (xhr.readyState == 4 && xhr.status == 200){
        var productSpanNames = {};
        var productSpanPrices = {};
        var serverResponse = JSON.parse(xhr.responseText);
        //var keys = Object.keys(serverResponse);
        if(serverResponse!= null)
        {
            if(window.ActiveXObject)
            {
                //Get span ids for product names
                for (var i = 0; i < 5; i++)
                {
                    productSpanNames['ID_'+ (i+1)] = document.getElementsByTagName("span")[i*2];
                }

                //Get span ids for product prices
                for (var i = 0; i < 5; i++)
                {
                    productSpanPrices['ID_'+ (i+1)] = document.getElementsByTagName("span")[(i*2)+1];
                }
                
                productSpanNames.ID_1.innerHTML = serverResponse[0].name;
                productSpanNames.ID_2.innerHTML = serverResponse[1].name;
                productSpanNames.ID_3.innerHTML = serverResponse[2].name;
                productSpanNames.ID_4.innerHTML = serverResponse[3].name;
                productSpanNames.ID_5.innerHTML = serverResponse[4].name;
                
                productSpanPrices.ID_1.innerHTML = serverResponse[0].price;
                productSpanPrices.ID_2.innerHTML = serverResponse[1].price;
                productSpanPrices.ID_3.innerHTML = serverResponse[2].price;
                productSpanPrices.ID_4.innerHTML = serverResponse[3].price;
                productSpanPrices.ID_5.innerHTML = serverResponse[4].price;
            }else{
                //Get span ids for productn ames
                for (var i = 0; i < 5; i++)
                {
                    productSpanNames['ID_'+ (i+1)] = document.getElementsByTagName("span")[i*2];
                }

                //Get span ids for product prices
                for (var i = 0; i < 5; i++)
                {
                    productSpanPrices['ID_'+ (i+1)] = document.getElementsByTagName("span")[(i*2)+1];
                }

                productSpanNames.ID_1.innerHTML = serverResponse[0].name;
                productSpanNames.ID_2.innerHTML = serverResponse[1].name;
                productSpanNames.ID_3.innerHTML = serverResponse[2].name;
                productSpanNames.ID_4.innerHTML = serverResponse[3].name;
                productSpanNames.ID_5.innerHTML = serverResponse[4].name;
                
                productSpanPrices.ID_1.innerHTML = serverResponse[0].price;
                productSpanPrices.ID_2.innerHTML = serverResponse[1].price;
                productSpanPrices.ID_3.innerHTML = serverResponse[2].price;
                productSpanPrices.ID_4.innerHTML = serverResponse[3].price;
                productSpanPrices.ID_5.innerHTML = serverResponse[4].price;
            }
        }else{
            productDivID1.innerHTML = "";
            productDivID2.innerHTML = "";
            productDivID3.innerHTML = "";
            productDivID4.innerHTML = "";
            productDivID5.innerHTML = "";
            alert("Error can't load products :)");
        }
        
    }
}

function loadProducts(){
    xhr.open("GET", "fetchProducts.php", true);
    //alert("Loading products");
    xhr.onreadystatechange = displayProductList;
    xhr.send(null);
}

function addRemoveProduct(action, position)
{
    var product = document.getElementsByTagName("span")[(position*2)-2].childNodes[0].textContent; 
    var price = document.getElementsByTagName("span")[(position*2)-1].childNodes[0].textContent;
    
    if (action == "add"){
        alert("Adding" + product + " and " + price);

        xhr.open("GET", "processCart.php?action=" + action + "&productname=" + product + "&productprice=" + price, true);
    }
    xHRObject.onreadystatechange = getData;
    xHRObject.send(null);
}