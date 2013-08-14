/* Table initialisation */
$(document).ready(function() {

  $.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iColumn = 0;

        var showHidden = $('#showHidden').is(":checked");

        if (showHidden) {
          return true;
        } else {
          var iPth = aData[iColumn];
          var iTxt = $(iPth).text();
          var frst = iTxt.substring(0, 1);
          if (frst == '.') {
            return false;
          } else {
            return true;
          }
        }
    }
  );

  jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "file-size-pre": function ( a ) {
        var x_unit = 1;
        var x = a.toLowerCase();
        var l_one = x.substring(x.length - 1, x.length);
        var l_two = x.substring(x.length - 2, x.length);
        var r_one = x.substring(0, x.length - 1);
        var r_two = x.substring(0, x.length - 2);

        if (l_one == 'k') {
          x_unit = 1000;
          x = r_one;
        } else if (l_one == 'm') {
          x_unit = 1000000;
          x = r_one;
        } else if (l_one == 'g') {
          x_unit = 1000000000;
          x = r_one;
        } else if (l_two == 'kb') {
          x_unit = 1000;
          x = r_two;
        } else if (l_two == 'mb') {
          x_unit = 1000000;
          x = r_two;
        } else if (l_two == 'gb') {
          x_unit = 1000000000;
          x = r_two;
        }

        return parseInt( x * x_unit, 10 );
    },

    "file-size-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "file-size-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  } );

  indexTable = $('#moaIndexTable').dataTable( {
    "sDom": "t<'row'<'span5'p><'span6'f><r>",
    "sPaginationType": "bootstrap",
    "iDisplayLength": 50,
    "oLanguage": {
      "sLengthMenu": "_MENU_ records per page"
    },
    "aoColumnDefs": [
       { "sType": [ "file-size" ], "aTargets": [ 1 ] }
    ]
  } );

  $('#showHiddenC').on('switch-change', function (e, data) {
    indexTable.fnDraw();
    });


});
