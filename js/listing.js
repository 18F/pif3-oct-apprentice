$(document).ready(function(){
  $.get('data/raw.json', function(data){
    var markup = data.reduce(function(lastRow, sponsor){
      var fields = [
        sponsor.SPON_ORG_NAME,
        sponsor.NAICS_INDUSTRY,
        sponsor.OCC_TITLE,
        sponsor.SPON_ORG_CITY,
        sponsor.SPON_ORG_STATE,
        sponsor.PHONE_NUM,
        sponsor.EMAIL
      ];

      var tds = fields.map(function(field){
        return '<td>' + field + '</td>';
      });

      return lastRow + '<tr>' + tds.join() + '</tr>';
    }, '');

    $('.sponsors').append(markup);
  });
});
