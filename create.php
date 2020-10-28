<?php
$data = $_POST['data'];
$doc = new DOMDocument('1.0');
$cart = $doc->createElement('cart');
$cart = $doc->appendChild($cart);
$doc->LoadXML($data);
$xmlName = 'cart.xml';
$doc->save($xmlName);
echo "$data";
?>