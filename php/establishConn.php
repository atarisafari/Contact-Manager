<?php 

$url = "localhost";
$database = "ContactManager";
$username = "eef";
$password = "";

$conn = new mysqli($url, $username, $password, $database);

if(!$conn) //Connection Failed 
{
    die("Connection Failed :( ");
}

