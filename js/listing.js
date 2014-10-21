$(document).ready(function(){
  var dataPromise = $.get('data/raw.json');

  // limit to first 100 - FOR TESTING ONLY
  dataPromise = dataPromise.then(function(data){
    return _.first(data, 100);
  });

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


  var $select = $('.job-type');
  $select.on('change', function(){
    var type = $select.val().trim();
    if (type){
      $('.job[data-job-type="' + type + '"]').show();
      $('.job[data-job-type!="' + type + '"]').hide();
    } else {
      $('.job').show();
    }
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

      return lastRow + '<tr class="job" data-job-type="' + sponsor.OCC_TITLE.trim() + '">' + tds.join() + '</tr>';
    }, '');

    $('.sponsors').append(markup);
  });
});
