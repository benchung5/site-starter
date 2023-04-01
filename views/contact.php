<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">
				<div class="row">
					<div class="small-12 large-7 columns">
						<div class="title-area">
							<h1>Contact Us</h1>	
						</div>
						<iframe frameborder="0" style="background: :#000;" src="https://www.google.com/maps/d/u/0/embed?mid=19OqDGhCRznhV_FsSSolO7gjNJEkr1jI&ehbc=2E312F" width="100%" height="480"></iframe>
					</div>
					<div class="small-12 large-5 columns sidebar">
						<div class="contact-icons">
			                <div class="icon-with-text phone">
			                    <div class="icon"></div>
			                    289-697-8873
			                </div>
			            </div>
            			<div class="contact-icons">
                            <div class="icon-with-text email">
                                <div class="icon"></div>
                                <div class="email-img"></div>
                            </div>
                        </div>
                        <div class="spacer-sml"></div>
						<div class="socials">
						    <a href="https://twitter.com/niagaratrees" target="_blank" class="social twitter"></a>
						    <a href="https://www.facebook.com/niagaratreeandgarden" target="_blank" class="social facebook"></a>
						    <a href="https://www.instagram.com/niagaratreeandgarden/" target="_blank" class="social instagram"></a>
						    <a href="https://linkedin.com/company/nature-with-us" target="_blank" class="social linkedin"></a>
						    <a href="https://www.pinterest.ca/naturewithus" target="_blank" class="social pinterest"></a>
						    <a href="https://www.yelp.ca/biz/nature-with-us-st-catharines" target="_blank" class="social yelp"></a>
						</div>
						<div class="spacer-med"></div>
						Send us an email
						<form class="contact" method="post" action="https://formspree.io/f/xbjpqnve">				
						<!-- <form class="contact" name="htmlform" method="post" action="send_email"> -->
							<div class="colum-inputs">
								<div class="contact-input">
									<input   type="text" name="name" maxlength="50" size="30" placeholder="name">
								</div>
								<div class="contact-input">
									<input  class="contact-input" type="text" name="email" maxlength="80" size="30" placeholder="email">
								</div>
								<div class="phone-input">
									<input  class="phone-input" type="text" name="telephone" maxlength="80" size="30" placeholder="phone" required>
								</div>
							</div>
							<div class="contact-input">
								<textarea  class="contact-input" name="message" maxlength="1000" cols="25" rows="6" placeholder="message"></textarea>
							</div>
							<div class="contact-input">
								<input class="button" type="submit" value="Submit">								
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->