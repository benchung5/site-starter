
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<!-- Display a payment form -->
		  <div id="checkout">
		    <!-- Checkout will insert the payment form here -->
		  </div>
	</div><!-- /content wrapper -->
	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->