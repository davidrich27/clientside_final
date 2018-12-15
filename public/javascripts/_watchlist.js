add_to_watchlist() {
  var query = $('#generalTerm').val();
  $.getJSON('/watchlist/add/', {generalTerm: generalTerm})
}

remove_from_watchlist(id) {
  var id = id;
  $.getJSON('/watchlist/remove/', {id: id})
}
