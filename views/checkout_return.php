<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<section id="success" class="hidden">
		  <p>
		    We appreciate your business! A confirmation email will be sent to <span id="customer-email"></span>.

		    If you have any questions, please email <a href="mailto:info@naturewithus.com">info@naturewithus.com</a>.
		  </p>
		</section>
	</div><!-- /content wrapper -->
	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->