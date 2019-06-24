  // /* ==========================================================================
  // init angular
  // ========================================================================== */
  // //global app object
  // var onePix = {};

  // //declare the module
  // onePix.app = angular.module('onePix', [
  //   // resources
  // ]);

  // //prevent angular from loading twice
  // window.addEventListener('domready', function() {
  //   angular.bootstrap(document, ['onePix']);
  // });

  // //config
  // onePix.app.config(
  //   function() {
  //     //config options here
  // });

  // //run
  // onePix.app.run([
  //   //options
  //   function() {
  //     //executes on application start

  //     //recompile angular if needed for dynamic html
  //     onePix.AngularCompile = function(elName) {
  //       var $injector = angular.injector(['ng', 'onePix']);
  //       $injector.invoke(function($rootScope, $compile) {
  //         //ex: #pnlServiceProviders
  //        $compile(jQuery(elName))($rootScope);
  //       });
  //     }
  // }]);