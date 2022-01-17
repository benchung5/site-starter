<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">
				<div class="row">
					<div class="small-12 large-7 columns">
<!-- 						<form class="" method="post" action="https://formspree.io/f/xbjpqnve">				
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
						</form> -->


						<form id="tree-removal-form">
							<div id="form-fields">
								<div class="form-group" data-name="tree_type">
									<label>Tree Type:</label>
									<select class="form-control" type="text" name="tree_type" value>
										<option value="13">Apple</option>
										<option value="12.6">Ash</option>
										<option value="12.9">Beech</option>
										<option value="12.7">Birch</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="stem_count">
									<label>Number of Stems:</label>
									<input name="stem_count" value="1" class="form-control" type="number" min="0" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57' >
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="stem_diameter">
									<label>Diameter of Stems (ft):</label>
									<input name="stem_diameter" value="1" class="form-control" type="number" min="0" step="1">
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="stem_length">
									<label>Length of Stems (ft):</label>
									<input name="stem_length" value="25" class="form-control" type="number" min="0" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57' >
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="stem_angle">
									<label>Angle of Stems:</label>
									<select class="form-control" type="text" name="stem_angle" value>
										<option value="1">Upright</option>
										<option value="1.3">Diagonal</option>
										<option value="1.5">Horizontal</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="crown_density">
									<label>Crown Density:</label>
									<select class="form-control" type="text" name="crown_density" value>
										<option value="1">Bare</option>
										<option value="1.2">Sparse</option>
										<option value="1.4">Average</option>
										<option value="1.6">Dense</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="brush_rigging">
									<label>Percentage of Brush Rigging:</label>
									<select class="form-control" type="text" name="brush_rigging" value>
										<option value="0">0%</option>
										<option value="0.25">25%</option>
										<option value="0.5">50%</option>
										<option value="0.75">75%</option>
										<option value="1">100%</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="square_rigging">
									<label>Percentage of Square Rigging:</label>
									<select class="form-control" type="text" name="square_rigging" value>
										<option value="0">0%</option>
										<option value="0.25">25%</option>
										<option value="0.5">50%</option>
										<option value="0.75">75%</option>
										<option value="1">100%</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="climb_count">
									<label>Number of Climbs:</label>
									<input name="climb_count" value="1" class="form-control" type="number" min="0" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57' >
									<div class="error"></div>
								</div>	
								<div class="form-group">
									<label>Total: $<span id="total">0</span></label>
								</div>
							</div>
						</form>

					</div>
					<div class="small-12 large-5 columns">

					</div>
				</div>
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->