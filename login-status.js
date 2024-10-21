(function ($) {
  $(function () {
    $('[data-sf-role="login-status-button"]').on("click", function () {
      const allowWindowsStsLogin = $(
        '[data-sf-role="sf-allow-windows-sts-login"]'
      ).length
        ? $('[data-sf-role="sf-allow-windows-sts-login"]')
            .val()
            .toLowerCase() === "true"
        : false;
      const redirectUrl = $('[data-sf-role="sf-login-redirect-url"]').length
        ? $('[data-sf-role="sf-login-redirect-url"]').val() || "#"
        : "#";

      if (allowWindowsStsLogin) {
        location.href = "?stsLogin=true";
      } else {
        location.href = redirectUrl;
      }
      return false;
    });

    if (
      $('[data-sf-role="sf-is-design-mode-value"]').length
        ? $('[data-sf-role="sf-is-design-mode-value"]').val().toLowerCase() !==
          "true"
        : true
    ) {
      $.ajax({
        url: $('[data-sf-role="sf-status-json-endpoint-url"]').length
          ? $('[data-sf-role="sf-status-json-endpoint-url"]').val() || ""
          : "", // Default to empty string if undefined
        cache: false,
        success: function (statusViewModel) {
          if (statusViewModel?.IsLoggedIn) {
            var loggedInView = $('[data-sf-role="sf-logged-in-view"]');
            loggedInView
              .find('[data-sf-role="sf-logged-in-name"]')
              .html(statusViewModel.DisplayName);
            loggedInView.show();
          } else {
            $('[data-sf-role="sf-logged-out-view"]').show();
          }
        },
      });
    } else {
      $('[data-sf-role="sf-logged-out-view"]').show();
    }
  });
})(jQuery);
