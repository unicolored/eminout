

</md-content>
</div>
</div>


<?php
wp_footer();

// TOFIX: Passer cela via functions.php dans le wp_footer()
if ( BR_GOOGLE_ANALYTICS != false ) {
  ?>
  <script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', <?php echo BR_GOOGLE_ANALYTICS ?>, 'auto');
  ga('send', 'pageview');
  </script>
  <?php
}
?>
</body>
</html>
