<?php
    session_start();
?>
<?php
    $product = $_GET["productname"];
    $price = $_GET["productprice"];

    function toXml($MDA)
    {
        $doc = new DomDocument('1.0');
        $cart = $doc->createElement('cart');
        $cart = $doc->appendChild($cart);

        $p = $_GET["productname"];
        $pn = $_GET["productprice"];

        foreach($MDA as $a => $b)
        {
            $product = $doc->createElement('book');
            
        }
    }
?>