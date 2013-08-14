/* Table initialisation */
/*jshint multistr: true */
$(document).ready(function() {


  $.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iColumn = 1;

        var showPrivate = $('#showPrivate').is(":checked");
        var showInherited = $('#showInherited').is(":checked");
        var showSystem = $('#showSystem').is(":checked");

        //console.log(showPrivate, showInherited, showSystem);
        var iPth = aData[iColumn];

        var isSystem = iPth.indexOf('error">S') > -1;
        var isPrivate = iPth.indexOf('error">P') > -1;
        var isInherited = iPth.indexOf('error">I') > -1;
        if ( showSystem && isSystem) return true;
        if ( showPrivate && isPrivate) return true;
        if ( showInherited && isInherited) return true;
        if ( ! isPrivate && ! isSystem && ! isInherited) return true
        return false;
    }
  );

  paramTable = $('#moaParamTable').dataTable( {
    "sDom": "t<'row'<'span6'p><'span6'f>r>",
    "sPaginationType": "bootstrap",
    "iDisplayLength": 50,
    "oLanguage": {
      "sLengthMenu": "_MENU_ records per page"
    }
  } );

  $('#showPrivateC').on('switch-change', function (e, data) {
    paramTable.fnDraw();
    });
  $('#showSystemC').on('switch-change', function (e, data) {
    paramTable.fnDraw();
    });
  $('#showInheritedC').on('switch-change', function (e, data) {
    paramTable.fnDraw();
    });


});

