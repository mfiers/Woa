/* Table initialisation */
$(document).ready(function() {

  $.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iColumn = 0;

        state = $("#showHidden").attr('state');

        if (state == 0) {
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
        var l_one = a.substring(a.length - 1, a.length);
        var l_two = a.substring(a.length - 2, a.length);
        var r_one = a.substring(0, a.length - 1);
        var r_two = a.substring(0, a.length - 2);

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
    "sDom": "t<'row'<'span4'p><'span4'f><'span4'<'dtcust'>>r>",
    "sPaginationType": "bootstrap",
    "iDisplayLength": 50,
    "oLanguage": {
      "sLengthMenu": "_MENU_ records per page"
    },
    "aoColumnDefs": [
       { "sType": [ "file-size" ], "aTargets": [ 1 ] }
    ]
  } );

  $("div.dtcust").html('<button class="btn btn-success btn-mini btn-primary pull-right" type="button" id="showHidden">Show hidden files</button>');

  $("#showHidden").click(function(e) {
      var but = $(this);
      var state = but.attr('state');
      if (typeof state == 'undefined') {
        state = 1;
      }
      if (state == 1) {
        but.removeClass("btn-success").addClass("btn-warning");
        but.text("Hide hidden files");
        state = 0;
      } else {
        but.removeClass("btn-warning").addClass("btn-success");
        but.text("Show hidden files");
        state = 1;
      }

      but.attr('state', state);
      indexTable.fnDraw();


      if (state == 'undefined') {
        but.attr('state', 'on');
      }
  });

});
