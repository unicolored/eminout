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
  /*
  print '
  <div class="form-group">
  <label for="'.$Label.'">'.$Label.'</label>
  <input '.$autovalue.' class="form-control" id="'.$Label.'" name="'.$name.'" type="text" placeholder="'.$Label.'" data-validation="required" data-validation-error-msg="'.$Label.'"/>
  </div>
  ';
  *//*
  print '
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <input '.$autovalue.' class="mdl-textfield__input" id="'.$Label.'" name="'.$name.'" type="text" data-validation="required" data-validation-error-msg="'.$Label.'"/>
  <label for="'.$Label.'" class="mdl-textfield__label">'.$Label.'</label>
  </div>
  ';*/
  print '
  <md-input-container >
  <label>'.$Label.'</label>
  <input ng-model="user.'.$name.'" '.$autovalue.'>
  </md-input-container>
  ';
}
?>
