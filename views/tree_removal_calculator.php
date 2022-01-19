<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">
				<div class="row">
					<div class="small-12 large-7 columns">
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
									<input name="stem_diameter" value="1" class="form-control" type="number" min="0.5" step="1">
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
										<option selected="selected" value="1.4">Average</option>
										<option value="1.6">Dense</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="brush_rigging">
									<label>Percentage of Brush Rigging:</label>
									<select class="form-control" type="text" name="brush_rigging" value>
										<option value="0">0%</option>
										<option value="0.25">25%</option>
										<option selected="selected" value="0.5">50%</option>
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
										<option selected="selected" value="0.75">75%</option>
										<option value="1">100%</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="climb_count">
									<label>Number of Climbs:</label>
									<input name="climb_count" value="1" class="form-control" type="number" min="0" step="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57' >
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="keeping_brush">
									<label>Keeping Brush?:</label>
									<select class="form-control" type="text" name="keeping_brush" value>
										<option value="no">no</option>
										<option value="yes">yes</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="keeping_bigwood">
									<label>Keeping Big Wood?:</label>
									<select class="form-control" type="text" name="keeping_bigwood" value>
										<option value="no">no</option>
										<option value="yes">yes</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="ease_of_access">
									<label>Ease of Access:</label>
									<select class="form-control" type="text" name="ease_of_access" value>
										<option value="1">easy</option>
										<option value="1.06">difficult</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="drag_distance">
									<label>Drag Distance:</label>
									<select class="form-control" type="text" name="drag_distance" value>
										<option value="1">0-25 ft</option>
										<option value="1.06">25-50ft</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="disposal_distance">
									<label>Distance To Disposal:</label>
									<select class="form-control" type="text" name="disposal_distance" value>
										<option value="1">10 min</option>
										<option value="1.04">20 min</option>
										<option value="1.08">30 min</option>
										<option value="1.12">40 min</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="form-group" data-name="added_cost">
									<label>Added Cost % (urgency, poison ivy, etc.):</label>
									<select class="form-control" type="text" name="added_cost" value>
										<option value="0">0%</option>
										<option value="0.1">10%</option>
										<option value="0.2">20%</option>
										<option value="0.3">30%</option>
										<option value="0.4">40%</option>
										<option value="0.5">50%</option>
									</select>
									<div class="error"></div>
								</div>								
								<div class="form-group" data-name="reduced_cost">
									<label>Reduced Cost % (season of work, senior discount, etc.):</label>
									<select class="form-control" type="text" name="reduced_cost" value>
										<option value="0">0%</option>
										<option value="0.1">10%</option>
										<option value="0.2">20%</option>
										<option value="0.3">30%</option>
										<option value="0.4">40%</option>
										<option value="0.5">50%</option>
									</select>
									<div class="error"></div>
								</div>
								<div class="spacer-med"></div>
								<div class="form-group">
									<label class="bold">Total: $<span id="total">0</span></label>
								</div>
							</div>
						</form>
						<div class="spacer-lg"></div>
					</div>
					<div class="small-12 large-5 columns">

					</div>
				</div>
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->