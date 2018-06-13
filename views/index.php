<!-- begin main content -->
<div ng-controller="Login">
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
</div>
<!-- end main content -->

