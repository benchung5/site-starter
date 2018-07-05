<h1>about us</h1>

data:
<ul>
	<?php 
	if (isset($view_data['vehicles'])) {
		foreach($view_data['vehicles'] as $vehicle) {
			echo '<li>'.$vehicle->name.'</li>';
		}
	}
	?>
</ul>