// Function will run when document is ready
$(function() {

  // Build html for incomplete items
  var liHtmlPrefix = '<li id="'; // ID concatenated here
  var liHtmlMiddle = '"><input class="done_checkbox" type="checkbox"/>'; // Text concatenated here
  var liHtmlSuffix = '<a class="delete_btn" href="#"><i class="fa fa-trash"></i></a></li>';

  // Html for completed items
  var liHtmlPrefixCompleted = '<li class="done" id="'; // ID concatenated here
  var liHtmlMiddleCompleted = '"><input class="done_checkbox" type="checkbox" checked />'; // Text concatenated here

  function getItems() {
    $('#itemListing').children().remove();

    $.get('/items/all').done(function(response){
      for (var i = 0; i < response.length; i++) {

        if(response[i].completed) {
          liHtml = liHtmlPrefixCompleted + response[i].id + liHtmlMiddleCompleted + response[i].text + liHtmlSuffix;

        } else {
          liHtml = liHtmlPrefix + response[i].id + liHtmlMiddle + response[i].text + liHtmlSuffix;
        }

        $('#itemListing').append(liHtml);
      }
    });
  }

  $('#submitButton').on('click', function() {
    var newItemText = $('#newItemField').val();

    $.post('/items/new', {text: newItemText}).done(function(response) {
      $('#newItemField').val('');
      getItems();
    });
  });

  $('#itemListing').on('click', '.done_checkbox', function() {
    var li = $(this).parent();
    var itemId = li.attr('id');

    if(li.hasClass('done')) {
      // Item is already complete
      $.ajax({
        method: 'put',
        url: '/items/uncomplete',
        data: {id: itemId}
      })
      .done(function(response) {
        getItems();
      });

    } else {
      $.ajax({
        method: 'put',
        url: '/items/complete',
        data: {id: itemId}
      })
      .done(function(response) {
        getItems();
      });
    }
  });

  $('#itemListing').on('click', '.delete_btn', function() {
    event.preventDefault();

    var itemId = $(this).parent().attr('id');

    // Not working
    // var reallyDelete = confirm('Delete?');

    $.ajax({
      method: 'delete',
      url: '/items',
      data: {'id': itemId}
    })
    .done(function(response) {
      getItems();
    });
  });

  getItems();
});
