/*
 Q: Why an empty file?
 A: iOS doesn't need plumbing to get the plugin to work, so..
    - Including no file would mean the import in index.html would differ per platform.
    - Also, using one version and adding a userAgent check for Android feels wrong.
    - And if you're not using PhoneGap Build, you could paste your handleOpenUrl JS function here.
*/
(function () {
    "use strict";

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction(url) {
    if (typeof window.handleOpenURL === "function") {
      // Clear the intent when we have a handler (note that this is only done when the preference 'CustomURLSchemePluginClearsAndroidIntent' is 'true' in config.xml
      cordova.exec(
          null,
          null,
          "LaunchMyApp",
          "clearIntent",
          []);

      window.handleOpenURL(url);
    } else if (remainingAttempts-- > 0) {
      setTimeout(function(){waitForAndCallHandlerFunction(url);}, 500);
    }
  }

  function triggerOpenURL() {
    cordova.exec(
        waitForAndCallHandlerFunction,
        null,
        "LaunchMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerOpenURL, false);

  var launchmyapp = {
    getLastIntent: function(success, failure) {
      cordova.exec(
        success,
        failure,
        "LaunchMyApp",
        "getLastIntent",
        []);
    }
  }
  
    window.handleOpenURL = function(url) {
     setTimeout(function(){alert("handleOpenURL inside plugin executed. goto: ");}, 500);
    };
 
  module.exports = launchmyapp;

}());
