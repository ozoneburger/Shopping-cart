<?php
    session_start();
    $product = $_GET["productname"];
    $price = $_GET["productprice"];
    $amount = 1;

    $_SESSION["cartitems"] = [
    ["name" => $product, "price" => $price, "amount" => $amount]
    ];

    print json_encode($item);
?>