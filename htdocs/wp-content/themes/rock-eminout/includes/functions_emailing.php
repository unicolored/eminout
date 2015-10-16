<?php
function cleanTag($tag) {
  $cleanTag = str_replace('*','',$tag);
  $cleanTag = str_replace('|','',$cleanTag);
  return $cleanTag;
}
function getTag($tag) {
  $autovalue = false;
  $cleanTag = cleanTag($tag);
  $name = $cleanTag;
  $namelower = strtolower($cleanTag);
  $Label = ucfirst($namelower);
  if(isset($AUTOTAG[$name])) {
    $autovalue = 'value="'.$AUTOTAG[$name].'"';
  }
  return array('name'=>$name,'Label'=>$Label);
}

function formGroup($res) {
  extract($res);
  print '
  <div class="form-group">
  <label for="'.$Label.'">'.$Label.'</label>
  <input '.$autovalue.' class="form-control" id="'.$Label.'" name="'.$name.'" type="text" placeholder="'.$Label.'" data-validation="required" data-validation-error-msg="'.$Label.'"/>
  </div>
  ';
}
?>
