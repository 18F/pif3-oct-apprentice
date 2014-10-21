$(document).ready(function(){
  $.get('data/raw.json', function(data){
    var markup = '';
    data.forEach(function(el){
      markup += '<tr><td>' + el.SPON_ORG_NAME + '</td></tr>';
    });

    $('.sponsors').append(markup);
  });
});
