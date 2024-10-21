$(document).ready(function () {
  // extension:
  $.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
      var $this = $(this);
      if ($this.data("scrollTimeout")) {
        clearTimeout($this.data("scrollTimeout"));
      }
      $this.data("scrollTimeout", setTimeout(callback, timeout));
    });
  };

  // how to call it (with a 1000ms timeout):
  $(window).scrollEnd(function () {
    if (window.innerWidth >= 768) {
      if (window.pageYOffset >= 47) {
        isInTransition = true;
        $("#desktop-tab-menu").removeClass("large");
        $("#desktop-tab-menu-min").removeClass("small");
        $("#desktop-tab-menu").addClass("small");
        $("#desktop-tab-menu-min").addClass("large");

        $("#spnIDQD").text($("#cart-count-QD").text());
        $("#spnIDParts").text($("#cart-count-Parts").text());

        $("#lblQD").text($("#cart-label-QD").text());
        $("#lblparts").text($("#cart-label-Parts").text());

        //$("#hrefQD").text($("#cart-icon-link-container-hrefQD").text());
        //$("#hrefParts").text($("#cart-icon-link-container-hrefParts").text());

        var hrefPartsatt = $("#cart-icon-link-container-hrefParts").attr(
          "href"
        );
        $("#hrefParts").attr("href", hrefPartsatt);
        if ($("#spnIDQD").text() == "" && $("#spnIDParts").text() == "")
          $("#spanBrownCircle").css("visibility", "hidden");
        else $("#spanBrownCircle").css("visibility", "visible");
        if ($("#spnIDQD").text() == "")
          $("#spanBrownCircleQD").css("visibility", "hidden");
        else $("#spanBrownCircleQD").css("visibility", "visible");
        if ($("#spnIDParts").text() == "")
          $("#spanBrownCircleParts").css("visibility", "hidden");
        else $("#spanBrownCircleParts").css("visibility", "visible");
        //Min Menu cart with popover link for QD and Parts: Start
        //$('#min-minu-cart').popover({
        //    html: true,
        //    content: function () {
        //        return $('#min-minu-cart-popover').html();
        //    }
        //});
        //Min Menu cart with popover link for QD and Parts: End
        //Not a sitefinity search
        if ($(".sitefinitySearch-dtp").length <= 0) {
          temp_min_search_menu = $(".input-group.search-container")[0]
            .outerHTML;
          if (temp_min_search_menu) {
            $(".search-min").html(temp_min_search_menu);
          }
          if (
            typeof HawkSearch !== "undefined" &&
            HawkSearch.initAutoSuggest !== undefined
          ) {
            HawkSearch.initAutoSuggest();
          }
          if (
            typeof HawkSearch !== "undefined" &&
            HawkSearch.bindhawkSearch !== undefined
          ) {
            HawkSearch.bindhawkSearch();
          }
          addHawkSearchkeyUpHideDropdown();
        } else {
          if (
            $(".sitefinitySearch-mobile").length > 0 &&
            $(".mobile-search-container").length > 0
          ) {
            var mobileSearch = $(".sitefinitySearch-mobile").html();
            if (mobileSearch.length > 0) {
              $(".sitefinitySearch-mobile").html("");
              $(".mobile-search-container").html(mobileSearch);
            }
          }
          if (
            $(".sitefinitySearch-mini").length > 0 &&
            $(".search-min").length > 0
          ) {
            var miniSearch = $(".sitefinitySearch-mini").html();
            if (miniSearch.length > 0) {
              $(".sitefinitySearch-mini").html("");
              $(".search-min").html(miniSearch);
            }
          }
          initSitefinitySearch();
          initSitefinitySearchMini();
          initSitefinitySearchMobile();
        }
        distributeAllMenus();
        if (
          $("#DrpDownMenuMin")
            .parent()[0]
            .className.indexOf("btn-group bootstrap-select") < 0
        ) {
          $("#DrpDownMenuMin").selectpicker();
          if ($("span.filter-option").length > 0) {
            $("span.filter-option").each(function (i) {
              $("span.filter-option")[i].innerText = ChooseModelTitle;
            });
          }
        }
        $(".header-site-navbar").animate(
          {
            height: 77,
          },
          800,
          "linear",
          function () {
            //isInTransition = false;
            // window.scrollTo(0, 48);
          }
        );
        //isMenuSmall = true;
      } else if (window.pageYOffset <= 46) {
        $("#desktop-tab-menu").removeClass("small");
        $("#desktop-tab-menu-min").removeClass("large");
        $("#desktop-tab-menu").addClass("large");
        $("#desktop-tab-menu-min").addClass("small");
        $(".header-site-navbar").animate(
          {
            height: 219,
          },
          800,
          "linear",
          function () {
            //isInTransition = false;
            // window.scrollTo(0, 0);
          }
        );
        //isMenuSmall = false;
      }
    }
    $(".txtSiteSearch").click(function (e) {
      $(".nav-dd-container").removeClass("slide-left");
      $(".nav-dd-container").addClass("slide-right");
      $(".search-container .input-group-addon").show();
    });
    $(".nav-dd-container").click(function (e) {
      $(".nav-dd-container").addClass("slide-left");
      $(".nav-dd-container").removeClass("slide-right");
      $(".nav-dd-container").show();
      $(".search-container .input-group-addon").hide();
    });
    $(".nav-dd-container .dropdown-menu.open input").click(function (e) {
      $(".nav-dd-container").addClass("slide-left");
      $(".nav-dd-container").removeClass("slide-right");
      $(".nav-dd-container").show();
      $(".search-container .input-group-addon").hide();
    });
  }, 100);
  var homePageURLMinMenu = $(".logo").attr("href");
  $(".min-logo-container a").attr("href", homePageURLMinMenu);

  //var gh_zoom = $(".gh-zoom").html();
  //if (gh_zoom) {
  //    $(window).scroll(function () {
  //        var scroll = $(window).scrollTop();
  //        $(".gh-zoom img").css({
  //            transform: 'translate3d(0%, -' + (scroll / 100) + '%, 0) scale(' + (100 + scroll / 5) / 100 + ')'
  //        });
  //    });
  //}

  distributeAllMenus();

  if (addDropdownListner !== undefined) {
    addDropdownListner();
  }

  $(window).on("resize", function (event) {
    if (document.body.offsetWidth <= 767.98) {
      $("#left-navbar-min").modal("hide");
      $("#navbar-min").modal("hide");
    }
    if (document.body.offsetWidth >= 768) {
      $("#left-navbar").modal("hide");
      $("#navbar").modal("hide");
    }
  });

  addHawkSearchkeyUpHideDropdown();
  var temp_mobile_search_container = $(".search-container").html();
  if (
    temp_mobile_search_container !== "undefined" &&
    temp_mobile_search_container.trim() != ""
  ) {
    $(".mobile-search-container").html(temp_mobile_search_container);
  }
});

$(document).click(function (event) {
  $(".nav-dd-container").removeClass("slide-left");
  $(".nav-dd-container").addClass("slide-right");

  if (event.srcElement && event.srcElement.type == "search") {
    $(".nav-dd-container").hide();
  } else {
    $(".nav-dd-container").show();
  }
});

function addDropdownListner() {
  $("#DrpDownMenuMobile").change(function (event) {
    var selecteditem = $(this).find("option:selected").val();
    if (
      selecteditem.toUpperCase().indexOf("NONE") < 0 &&
      selecteditem.toUpperCase().indexOf("NINGUNA") < 0
    ) {
      window.parent.location.href = selecteditem;
    }
    return false;
  });

  $("#DrpDownMenu").change(function (event) {
    var selecteditem = $(this).find("option:selected").val();
    if (
      selecteditem.toUpperCase().indexOf("NONE") < 0 &&
      selecteditem.toUpperCase().indexOf("NINGUNA") < 0
    ) {
      window.parent.location.href = selecteditem;
    }
    return false;
  });
  $("#DrpDownMenuMin").change(function (event) {
    var selecteditem = $(this).find("option:selected").val();
    if (
      selecteditem.toUpperCase().indexOf("NONE") < 0 &&
      selecteditem.toUpperCase().indexOf("NINGUNA") < 0
    ) {
      window.parent.location.href = selecteditem;
    }
    return false;
  });
  if (ChooseModelTitle) {
    $("span.filter-option").each(function (i) {
      $("span.filter-option")[i].innerText = ChooseModelTitle;
    });
  }
}

function DrpDownMenuOnchange() {
  var selecteditem = $(this).find("option:selected").val();
  if (
    selecteditem.toUpperCase().indexOf("NONE") < 0 &&
    selecteditem.toUpperCase().indexOf("NINGUNA") < 0
  ) {
    window.parent.location.href = selecteditem;
  }
}

function addHawkSearchkeyUpHideDropdown() {
  $(".txtSiteSearch").keyup(function () {
    if (this.value && this.value.length > 0) {
      $(".nav-dd-container").hide();
      $(".search-container .input-group-addon").show();
    } else {
      $(".nav-dd-container").show();
    }
  });

  $(".txtSiteSearch").keydown(function (event) {
    var searchPageUrl = "/search";

    if (window.location.href.toLowerCase().indexOf("es-us") > -1) {
      searchPageUrl = "/buscar";
    }

    if (event.keyCode == 13) {
      //alert("KeyCode 13 - Content\Greehsheckstyles\js\HeaderTemplate.js");
      //gotosearch(searchPageUrl, $(this).val());
      //gotosearchJson(searchPageUrl, $(this).val(), $("#hdnProfileName").val()); //comented trigers double time
      event.preventDefault();
      return false;
    }
  });
  $(".btnSiteSearch").click(function (event) {
    debugger; // \SitefinityWebApp\Content\GreenheckStyles\js\HeaderTemplate.js
    var searchPageUrl = "/search";

    if (window.location.href.toLowerCase().indexOf("es-us") > -1) {
      searchPageUrl = "/buscar";
    }

    //alert("search buddon click - Content\Greehsheckstyles\js\HeaderTemplate.js");
    var searchText = $(this).parent().siblings("input.txtSiteSearch").val();
    //gotosearch(searchPageUrl, searchText);
    //gotosearchJson(searchPageUrl, searchText, $("#hdnProfileName").val());  //comented trigers double time
    return false;
  });
  $(".txtSiteSearch").focus(function (e) {
    //if (this.value && this.value.length > 0) {
    $(".nav-dd-container").hide();
    $(".search-container .input-group-addon").show();

    //}
    //else {
    //    $(".nav-dd-container").show();
    //}
  });

  //$('.txtSiteSearch').focusout(function (e) {
  //    //if (this.value && this.value.length > 0) {
  //    //    $(".nav-dd-container").hide();
  //    //}
  //    //else {
  //    $(".nav-dd-container").show();

  //    //$(".search-container .input-group-addon").hide();
  //   // }
  //});

  $(".nav-dd-container").focusout(function (e) {
    //$('.nav-dd-container').removeClass('slide-left');
    //$('.nav-dd-container').addClass('slide-right');
  });
}

function distributeAllMenus() {
  var temp_min_choosemodel_menu;
  var temp_min_header_flags_container;
  var temp_min_header_lang_container;
  var temp_min_header_login_container;
  var temp_mobile_header_navigation_menu = $(
    ".temp-mobile-header-navigation-menu"
  ).html();
  if (temp_mobile_header_navigation_menu) {
    $(".desktop-min-header-navigation-menu").html(
      temp_mobile_header_navigation_menu
    );
    //$(".temp-mobile-header-navigation-menu").html('');
  }

  temp_min_header_flags_container = $(
    ".temp-mobile-header-flags-container"
  ).html();
  if (temp_min_header_flags_container) {
    $(".desktop-min-header-flags-container").html(
      temp_min_header_flags_container
    );
    //$(".temp-mobile-header-flags-container").html('');
  }
  temp_min_header_lang_container = $(
    ".temp-mobile-header-lang-container"
  ).html();
  if (temp_min_header_lang_container) {
    $(".desktop-min-header-lang-container").html(
      temp_min_header_lang_container
    );
    // $(".temp-mobile-header-lang-container").html('');
  }

  temp_min_header_login_container = $(
    ".temp-mobile-header-login-container"
  ).html();
  if (temp_min_header_login_container) {
    $(".desktop-min-header-login-container").html(
      temp_min_header_login_container
    );
    // $(".temp-mobile-header-login-container").html('');
  }
}
