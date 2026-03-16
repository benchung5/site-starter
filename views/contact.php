<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<!-- Contact page hero banner -->
	<section id="contact-hero" class="contact-hero-banner">
		<div class="contact-hero-inner">
			<h1>Connect With Us</h1>
		</div>
	</section>

	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal contact-page-internal">
				<div class="row">
					<div class="columns">
		                <!-- <div class="icon-with-text phone contact-sidebar-item">
		                    <div class="icon"></div>
		                    Call us: 250-981-1324
		                </div>
                        <div class="icon-with-text email contact-sidebar-item">
                            <div class="icon"></div>
                            <div class="email-img"></div>
                        </div>
						<div class="info-box contact-sidebar-item">
							<div class="left">
								<a href="/shipping">Shipping</a>
	                    	</div>
							<div class="right">
		                       <a href="/returns_and_guarantee">Returns and Guarantee</a>
	
	                    	</div>
                    	</div>
                        <div class="spacer-sml"></div> -->
						<div class="contact-form-section">
							<h2 class="contact-form-title">Get In Touch</h2>
							<p class="contact-form-subtitle">Fill out the below form and we'll get right back to you!</p>
							<div class="spacer-med"></div>
							<form class="contact contact-form-fullwidth" method="post" action="https://formspree.io/f/xbjpqnve">				
								<div class="contact-input">
									<input type="text" name="name" maxlength="50" placeholder="Name">
								</div>
								<div class="contact-input">
									<input type="text" name="email" maxlength="80" placeholder="Email">
								</div>
								<div class="contact-input">
									<input type="text" name="telephone" maxlength="80" placeholder="Phone" required>
								</div>
								<div class="contact-input">
									<textarea name="message" maxlength="1000" cols="25" rows="6" placeholder="Message"></textarea>
								</div>
								<div class="contact-input">
									<input class="btn btn-primary contact-submit-btn" type="submit" value="Send Your Question">								
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->