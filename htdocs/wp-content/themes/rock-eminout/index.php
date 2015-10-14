<?php
/**
* Index
* @body.page.index
*/
require( 'includes/wp_home.php');
get_header();
////////////////////////////////////////////////////////////////////////////////
?>
<div class="container">

	<header id="pageHeader">
		<div class="br_header">
			<!-- -->
			<div class="page-header">
				<h1 itemprop="name"><?php the_title() ?></h1>
				<hr>
			</div>
			<!-- -->
		</div>
	</header>

	<!-- -->
	<div class="galaxie">
		<div class="br_article">
			<article class="page inverse">

				<section class="contenu pageContent">
					<?php
					while ( have_posts() ) {
						the_post();
						the_content();
					}
					?>
				</section>

				<?php
				if (comments_open( )) {
					?>
					<aside class="artAside disqus">
						<div class="commentaires">
							<div id="disqus_thread"></div>
						</div>
					</aside>
					<?php
				}
				?>
			</article>
		</div>
	</div>

	<!-- -->
	<div class="galaxie">
		<footer id="pageFooter">
			<!-- -->
			<div class="br_footer">
				<?php get_template_part('templates/section','citations') ?>
				<hr>
				<?php get_template_part('templates/section','newsletter') ?>
			</div>
			<!-- -->
		</footer>
	</div>

</div>

<script type="text/javascript">
/* * * CONFIGURATION VARIABLES * * */
var disqus_shortname = 'ghcom';

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
</script>

<?php
////////////////////////////////////////////////////////////////////////////////
$NOFOOTER = true;
get_footer()
?>
