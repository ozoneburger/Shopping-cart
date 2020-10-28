<!--The cart will need to keep its “state” during page loads / refreshes
▪ List Products – these should be listed at all times to allow adding of products
▪ Products should be listed in this format: product name, price, link to add product
▪ Must be able to add a product to the cart
▪ Must be able to view current products in the cart
▪ Cart products should be listed in this format: product name, price, quantity, total, remove
link
▪ Product totals should be tallied to give an overall total
▪ Must be able to remove a product from the cart
▪ Adding an existing product will only update existing cart product quantity (e.g. adding the
same product twice will NOT create two cart items)
▪ All prices should be displayed to 2 decimal places
▪ Error checking will be set to strict for viewing completed code
▪ Project will work as expected in PHP 7.0+
-->
<?php
  session_name("simple_cart_exercise");
  session_start();
?>

<!DOCTYPE html>
<head>
  <script type="text/javascript" src="cartphp.js"></script>

  <script>
    function deleteTempXMLs()
    {
      for(i = 0; i < getMax(); i++)
      {
        var temp = (i+1).toString() + ".xml";
        deleteXML(temp);
      }
    }
  </script>

  <script>
      function retrieveProducts()
      {
      }

  </script>

  <style type="text/css">
  div {
    float: center;
  }
  </style>

  <center><h1>MITRE 20</h1><center>

</head>

<body onload="" onunload="deleteTempXMLs(); deleteXML('cart.xml');">
    <div id="1"> <br/>
    <b>Product: </b><span name="Product">SledgeHammer</span><br />
    <b>Price: $</b><span name="price">125.75</span><br />
    <br />
    <a href="#" onclick="AddRemoveItem('Add', 1)">Add Item to Shopping Cart</a> <br />
    <br />
    </div>
    
    <div id="2"> <br/>
    <b>Book: </b><span name="Product">Axe</span><br />
    <b>Price: $</b><span name="price">190.50</span> <br />
    <br />
    <a href="#" onclick="AddRemoveItem('Add', 2)">Add Item to Shopping Cart</a> <br />
    <br />
    </div>
    
    <div id="3"> <br/>
    <br />
    <b>Book: </b><span name="Product">Bandsaw</span><br />
    <b>Price: $</b><span name="price">562.131</span> <br />
    <br />
    <a href="#" onclick="AddRemoveItem('Add', 3)">Add Item to Shopping Cart</a> <br />
    <br />
    </div>

    <div id="4"> <br/>
        <br />
        <b>Book: </b><span name="Product">Chisel</span><br />
        <b>Price: $</b><span name="price">12.9</span> <br />
        <br />
        <a href="#" onclick="AddRemoveItem('Add', 4)">Add Item to Shopping Cart</a> <br />
        <br />
    </div>

    <div id="5"> <br/>
        <br />
        <b>Book: </b><span name="Product">Hacksaw</span><br />
        <b>Price: $</b><span name="price">18.45</span> <br />
        <br />
        <a href="#" onclick="AddRemoveItem('Add', 5)">Add Item to Shopping Cart</a> <br />
        <br />
        </div>

</body>
<span id="cart"><br>Shopping cart is empty!</span><class ng-controller="DemoCtrl"  class="container" ng-app="demoModule">
</class>
</html>
