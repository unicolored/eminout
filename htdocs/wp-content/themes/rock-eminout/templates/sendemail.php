<?php

$original_content = get_the_content();
//$original_content = str_replace('*|FNAME|*','Gilles',$original_content);

$tags_not_replaced = strpos($original_content,'*|SHARELINK|*');
$tags_not_replaced = preg_match('*|AUTHORFNAME|*',$original_content);
$tags_not_replaced = preg_match_all ('*||*',$original_content);
//vardump($tags_not_replaced);

$subject = $original_content;
$pattern = '*|AUTHORFNAME|*';
global $output_dest, $output_expe, $output_global;
preg_match_all("/\*\|DEST_(.){1,}\|\*/", $original_content, $output_dest);
preg_match_all("/\*\|EXPE_(.){1,}\|\*/", $original_content, $output_expe);
preg_match_all("/\*\|GLOBAL_(.){1,}\|\*/", $original_content, $output_global);
preg_match_all("/\*\|(.){1,}\|\*/", $original_content, $output_array);
$valid = 0;
foreach($output_array[0] as $tag) {
  if(in_array($tag,$output_dest[0]) || in_array($tag,$output_global[0]) || in_array($tag,$output_expe[0])) {
    $valid++;
  }
  else {
    print '<div class="alert alert-danger"><p><strong>Attention !</strong> '.$tag.' n\'est pas une valeur admise.</p></div>';
  }
}
if ($valid < count($output_array[0])) {
  print '
  <div class="alert alert-warning">
  <p><strong>Ce modèle de mail comporte des tags non admis</strong></p>
  <p><small>Les tags doivent avoir l\'un des préfixes suivants : GLOBAL_, DEST_ ou EXPE_</small></p>
  </div>';
} else {
  print '
  <div class="alert alert-info">
  <p><strong>Ce mail peut être envoyé</strong></p>
  <p><small>Editer les tags ci-dessous</small></p>
  </div>';
  get_template_part('templates/sendemail','form');
}

?>
