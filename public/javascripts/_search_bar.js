var xhr_venue;
new autoComplete({
    selector: '#venueTerm',
    source: function(term, response){
        try { xhr.abort(); } catch(e){}
        xhr_venue = $.getJSON('/query/autocomplete/Venue/', { q: term }, function(data){ response(data); });
    }
});

var xhr_tag;
new autoComplete({
    selector: '#tagTerm',
    source: function(term, response){
        try { xhr.abort(); } catch(e){}
        xhr_tag = $.getJSON('/query/autocomplete/Tags/', { q: term }, function(data){ response(data); });
    }
});

function searchQuery(advancedBtn) {
  $('#isAdvanced').val(advancedBtn);
  return true;
}
