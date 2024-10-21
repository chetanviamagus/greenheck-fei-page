(function ($) {
    $(function () {
        $('[data-sf-role="login-status-button"]').on('click', function () {

            if ($('[data-sf-role="sf-allow-windows-sts-login"]').val().toLowerCase() === 'true') {
                location.href = '?stsLogin=true';
            } else {
                location.href = $('[data-sf-role="sf-login-redirect-url"]').val() || '#';
            }
            return false;
        });

        if ($('[data-sf-role="sf-is-design-mode-value"]').val().toLowerCase() !== 'true') {
            $.ajax({
                url: $('[data-sf-role="sf-status-json-endpoint-url"]').val(),
                cache: false,
                success: function (statusViewModel) {
                    if (statusViewModel && statusViewModel.IsLoggedIn) {
                        var loggedInView = $('[data-sf-role="sf-logged-in-view"]');
                        loggedInView.find('[data-sf-role="sf-logged-in-name"]').html(statusViewModel.DisplayName);
                        loggedInView.show();
                    }
                    else {
                        $('[data-sf-role="sf-logged-out-view"]').show();
                    }
                }
            });
        }
        else {
            $('[data-sf-role="sf-logged-out-view"]').show();
        }
    });
}(jQuery));