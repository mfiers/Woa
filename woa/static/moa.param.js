/* Table initialisation */
/*jshint multistr: true */
$(document).ready(function() {


  $.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iColumn = 1;

        var showPrivate = $('#CB_showprivate').data("toggled");
        var showInherited = $('#CB_showinherited').data("toggled");
        var showSystem = $('#CB_showsystem').data("toggled");

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

  $('#CB_showprivate').click(function (e) {
    moaToggleButton($(e.target));
    paramTable.fnDraw();
    });
  $('#CB_showinherited').click(function (e) {
    moaToggleButton($(e.target));
    paramTable.fnDraw();
    });
  $('#CB_showsystem').click(function (e) {
    moaToggleButton($(e.target));
    paramTable.fnDraw();
    });
});

