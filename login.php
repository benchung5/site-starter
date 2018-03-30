<label>
	sign in to continue
	<div>
		<input type="text" ng-model="form.email" placeholder="me@company.com">
	</div>
	<div>
		<input type="text" ng-model="form.password" placeholder="password">
	</div>
	<div>
		<input id="keep-me-in" type="checkbox" ng-model="form.keepMeIn" placeholder="password">
		<label for="keep-me-in">
			Keep me logged in
		</label>
	</div>
	<div>
		<button class="button" ng-click="login()">
			<i class="glyphicon glyphicon-log-in"></i>
			Log in
		</button>
	</div>
	<div>
		<a href="#" class="">Sign Up</a>
		<a href="#" class="">Need Help?</a>
	</div>
</label>