$(document).ready(function(){
  var dataPromise = $.get('data/raw.json');

  // display option selectors
  dataPromise.then(function(data){
    var types = _.pluck(data, 'OCC_TITLE');
    types = _.uniq(types);
    types.sort();

    var markup = types.reduce(function(lastOption, type){
      return lastOption + '<option>' + type + '</type>';
    }, '');

    $('.job-type').append(markup);
  });

  // display data rows
  dataPromise.then(function(data){
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
