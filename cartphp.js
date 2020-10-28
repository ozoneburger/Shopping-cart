// JavaScript Document
var xHRObject = false;
if (window.XMLHttpRequest)
{
	xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
	xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function loadXMLDoc(filename)
{
	combineXML();
	xHRObject.open("POST", filename, false);
	try
	{
		xHRObject.responseType = "msxml-document";
	} 
	catch(err) 
	{
		alert("The type [XSLTProcessor] and the function [XmlDocument.transformNode] are not supported by this browser, can't transform XML document to HTML string!");
		return null;
	}
	xHRObject.send();
	return xHRObject.responseXML;
}

function deleteXML(file)
{
	xHRObject.open("GET", "delete.php?file=" + encodeURIComponent(file), false);
	xHRObject.onreadystatechange = function()
	{
		if ((xHRObject.readyState == 4) && (xHRObject.status == 200))
		{
			var status = xHRObject.responseText;
			//alert(status);
		}
	};
	xHRObject.send(null);
}

function readXML(position)
{
	var text = "";
	var file = position.toString() + ".xml";
    xHRObject.open("GET", file, false);
    xHRObject.onreadystatechange = function()
    {
        if ((xHRObject.readyState == 4) && ((xHRObject.status == 200) || (xHRObject.status == 0)))
        {
			text = xHRObject.responseText;
			var check = text.search("</ISBN>");
			if(text.charAt(parseInt(check)-1) == ">")
			{
				//alert("Found " + file);
				deleteXML(file);
				text = "";
			}
			else
			{					
				//alert(text);
				text += "";
			}
		}
    };
    xHRObject.send(null);
	return text;
}

function combineXML()
{
	var max = getMax();
	var xmls = null;
	xmls = [];
	for(i = 0; i < max; i++)
	{
		var str = "";
		var num = i+1;
		str = readXML(num);
		var subStr = "";
		if(str != "")
		{
			var begin = str.indexOf("<book>");
			var end = str.indexOf("</cart>");
			//alert(begin);
			//alert(end);
			//alert(str);
			subStr = str.slice(begin, end);
			//alert(subStr);
			xmls[i] = subStr;
		}
		else
		{
			xmls[i] = str;
		}
		//var file = num.toString() + ".xml";
		//deleteXML(file);
	}
	var carts = xmls.join("");
	//alert(carts);
	var strXML = "";
	if(carts != "")
	{
		//var textBegin = "<?xml version=\"1.0\"?><cart>";
		var textBegin = "<cart>";
		var textEnd = "</cart>";
		strXML = textBegin + carts + textEnd;
	}
	//alert(strXML);
	var recreateXML = function()
	{
		xHRObject.open("POST", "create.php", false);
		xHRObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xHRObject.onreadystatechange = function()
		{
			if ((xHRObject.readyState == 4) && (xHRObject.status == 200))
			{
				var success = xHRObject.responseText;
				//alert(success);
			}
		};
		xHRObject.send("data=" + strXML);
	};
	if(strXML != "")
	{
		recreateXML();
	}
	else
	{
		deleteXML("cart.xml");
	}
	return strXML;
}
getData = function()
{
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200))
    {
		var serverResponse = loadXMLDoc("cart.xml");
		
		var spantag = document.getElementById("cart");
		
		if (serverResponse != null)
		{	
			spantag.innerHTML = "";

			var cart = serverResponse.getElementsByTagName("cart")[0];

			var items = cart.childNodes.length/4;

			for(i = 1; i <= items; i++)
			{
				var book = cart.childNodes[(i*4)-4];
				var title = book.firstChild.childNodes[0].textContent;
				var quantity = parseInt(book.lastChild.childNodes[0].textContent);
				var ISBN = cart.childNodes[(i*4)-3].childNodes[0].textContent;
				var price = parseFloat(cart.childNodes[(i*4)-2].childNodes[0].textContent);
				var position = parseInt(cart.childNodes[(i*4)-1].childNodes[0].textContent);
				var total = price * quantity;
				var remove = "<a href='#' onclick='AddRemoveItem(\"Remove\", " + position + ");'>Remove Item from Shopping Cart</a>";
	
				if (window.ActiveXObject)
				{
					spantag.innerHTML += "<br>";
					spantag.innerHTML += " Book: " + title + "<br>";
					spantag.innerHTML += " " + "ISBN: " + ISBN + "<br>";
					spantag.innerHTML += " Number: " + quantity + "<br>" + "Price: $" + total.toFixed(2) + "<br><br>";
					spantag.innerHTML += remove + "<br>";
				}
				else
				{
					spantag.innerHTML += "<br>";
					spantag.innerHTML += " Book: " + title + "<br>";
					spantag.innerHTML += " " + "ISBN: " + ISBN + "<br>";
					spantag.innerHTML += " Number: " + quantity + "<br>" + "Price: $" + total.toFixed(2) + "<br><br>";
					spantag.innerHTML += remove + "<br>";
				}
			}
        }
        else
		{  
			spantag.innerHTML = "<br> Shopping cart is empty!"; 
		}
    }
}

function AddRemoveItem(action, position)
{	
	var book = document.getElementsByTagName("span")[(position*4)-4].childNodes[0].textContent;
	var ISBN = document.getElementsByTagName("span")[(position*4)-2].childNodes[0].textContent;
	var price = document.getElementsByTagName("span")[(position*4)-1].childNodes[0].textContent;
	
	if(action=="Add")
	{
		xHRObject.open("GET", "ManageCart.php?action=" + action + "&position=" + encodeURIComponent(position) + "&book=" + encodeURIComponent(book) + "&ISBN=" + encodeURIComponent(ISBN) + "&price=" + encodeURIComponent(price) + "&value=" + Number(new Date), true);
	}
	else
	{
		xHRObject.open("GET", "ManageCart.php?action=" + action + "&position=" + encodeURIComponent(position) + "&book=" + encodeURIComponent(book) + "&ISBN=" + encodeURIComponent(ISBN) + "&price=" + encodeURIComponent(price) + "&value=" + Number(new Date), true);
	}
	xHRObject.onreadystatechange = getData;
	xHRObject.send(null);
}

function getMax() 
{
	var divNumber = document.getElementsByTagName("div").length;
	return divNumber;
}