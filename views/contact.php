<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper">
		<div class="row">
			<div class="small-12 columns internal">
				<h1>Contact Us</h1>	


				<form name="htmlform" method="post" action="send_email">
					<table width="450px">

						<tr>
							<td valign="top">
								<label for="name">Name *</label>
							</td>
							<td valign="top">
								<input  type="text" name="name" maxlength="50" size="30">
							</td>
						</tr>

						<tr>
							<td valign="top">
								<label for="email">Email *</label>
							</td>
							<td valign="top">
								<input  type="text" name="email" maxlength="80" size="30">
							</td>

						</tr>

						<tr>
							<td valign="top">
								<label for="message">Message *</label>
							</td>
							<td valign="top">
								<textarea  name="message" maxlength="1000" cols="25" rows="6"></textarea>
							</td>

						</tr>
						<tr>
							<td colspan="2" style="text-align:center">
								<input type="submit" value="Submit">
							</td>
						</tr>

					</table>
				</form>

			</div>
		</div>
	</div><!-- /content wrapper -->
</div><!-- /site wrapper -->