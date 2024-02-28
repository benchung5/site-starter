
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns">
				<div class="row">
					<div class="small-12 large-7 columns">
						<div id="customer-info-container">
						</div>
						<div id="payment-container">
							<h2>Payment</h2>
							<form id="payment-form">
							  <div id="payment-element">
							    <!--Stripe.js injects the Payment Element-->
							  </div>
							  <button id="submit" class="btn btn-primary loading-button">
							    <span class="button-text">Pay now</span>
							  </button>
							  <div id="payment-message" class="hidden"></div>
							</form>
						</div>
						<section id="success" class="hidden">
						  <p>
						    We appreciate your business! A confirmation email will be sent to:<br>
						    <span id="customer-email"></span><br><br>
						    Package will be shipped to:<br>
						    <span id="customer-name"></span><br>
						    <span id="line1"></span><br>
						    <span id="line2"></span><br>
						    <span id="city"></span>, <span id="state"></span><br>
						    <span id="postal_code"></span><br>
						    If you have any questions, please email us: <a href="mailto:info@naturewithus.com">info@naturewithus.com</a>
						  </p>
						</section>
					</div>
					<div class="small-12 large-5 columns sidebar">
						<h2>Order Summary</h2>
						Order summary...
					</div>
				</div>
			</div>
		</div>
	</div><!-- /content wrapper -->

</div><!-- /site wrapper -->