<?php
$data = json_decode(file_get_contents("php://input"));
$file = $data->file.'.json';
// Ouvre un fichier pour lire un contenu existant
//$current = file_get_contents($file);
// Ajoute une personne
// Écrit le résultat dans le fichier
//file_put_contents($file, $current);
//echo $data->data;
// OU
//parse_str(file_get_contents('php://input'), $data);
// OU
/*
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$pass = $request->password;
*/

file_put_contents($file, $data->data);
print 'Ok '.$file;
?>
