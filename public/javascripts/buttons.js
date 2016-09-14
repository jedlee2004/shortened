function SendData () {
  $.ajax({
    url: '/new/',
    type: 'GET',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
      var resultHTML = '<a class="result" href="' + data.original_url + '">' + data.short_url + '</a>';
      var errorHTML = '<a class="error" title="' + data.error + '">' + data.error + '</a>'; 
      if(data.error) {
        $('#error').html(errorHTML);
        $('#error').hide().fadeIn('slow');
        $('#link').empty();
        $('#url-field').val('');
      } else {
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
        $('#error').empty();
        $('#url-field').val('');
      }
    }
  });
}

$('#url-field').keypress(function(e) {
  if(e.keyCode == 13) {
    SendData();
  }
});

$('.btn-shorten').on('click', function(){
  SendData(); 
}); 

//Open link in a new window 
$('#link').on('click', 'a', function(e) {
  e.preventDefault();
  var url = $(this).attr('href');
  window.open(url, '_blank'); 
}); 

/*
$('.btn-random').on('click', function(){
  $.ajax({
    url: 'http://randomword.setgetgo.com/get.php',
    type: 'GET',
    dataType: 'jsonp',
    jsonpCallback: 'RandomWordComplete'
  });
  function RandomWordComplete(data) {
    alert(data.Word); 
  }
});
*/