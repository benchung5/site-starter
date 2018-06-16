<?php 
// header
$this->insert('header', $view_data );
?>

<!-- begin main content -->
<section id="main">
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <form id="login" action="admin" class="well" ng-controller="Login">
              <div class="form-group">
                <label>Email Address</label>
                <input type="text" class="form-control" placeholder="Enter Email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-default btn-block">Login</button>
          </form>
      </div>
    </div>
  </div>
</section>

<!-- <div ng-controller="Login">
  <div class="logout">
    <a href="" ng-click="logout()">
      <i class="glyphicon glyphicon-log-out"></i>
      Log out
    </a>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content">
      <span class="close">X</span>
    </div>
    <div class="modal-body">
      <div class="alert">
        Invalid email or password
      </div>
    </div>
  </div>
</div> -->

<!-- end main content -->

<?php 
// footer
$this->insert('footer', $view_data );
?>


