let collectionId = $('#collection-container').data('id');

let searchHarvardMuseumAPI = function() {
  let keyword = $("input#artwork-keyword").val();
  // Constants for access to the Harvard Museum API
  const apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
  const apiKey = "5789a1c0-182e-11e8-954f-f135508030b0";

  // Form the query string to use with the API URL to search for a specific keyword
  // We only need the objectid, title, and image to display in the collection
  // TODO: Implement pagination to allow us to view multiple results
  let queryString = $.param({
    apikey: apiKey,
    title: keyword,
    fields: 'objectid,title,images',
    size: 9
  });

  // Query the Harvard Museum API, then display the search results by calling
  // the function displaySearchResults()
  $.getJSON(apiEndpointBaseURL + "?" + queryString, displaySearchResults);
  return false;
};

// Function to display search results from the Harvard Museum API
let displaySearchResults = function(data) {
  // Create a new <div class="row" id="search-results">
  var resultsDiv = $('<div>');
  resultsDiv.attr('class', 'row');
  resultsDiv.attr('id', 'search-results');

  // For each artwork in the search results, display the artwork thumbnail,
  // name, etc. and add it in our <div class="row" id="search-results">
  for (let i = 0; i < data.records.length; i++) {
    let artwork = data.records[i];
    let artworkThumbnail = createArtworkThumbnailForDisplay(artwork);
    resultsDiv.append(artworkThumbnail);
  }

  // Replace the current <div class="row" id="search-results"> with the one
  // that was just created here and populated with artwork thumbnails
  $('#search-results').replaceWith(resultsDiv);
}

// This creates a jQuery dom element that represents thumbnail displayed from
// the search result
let createArtworkThumbnailForDisplay = function(artwork) {
  // Clone the artwork thumbnail template from the page
  let artworkDiv = $("#search-results-template").clone();

  // If the artwork data from Harvard Museum API returns at least one image,
  // let's use that image to display a thumbnail in the result page
  let imgHref = null;
  if (artwork.images && artwork.images.length > 0) {
    imgHref = artwork.images[0].baseimageurl;
    // Set the img href to the image URL we got from the Harvard Museum API, scaled to a height of 255px
    artworkDiv.find('img').attr('src', imgHref + "?height=255");
  }

  // Set the name of the result to the artwork title
  artworkDiv.find('.card-text').html(artwork.title);

  // Show the add button
  artworkDiv.find('.btn').attr('data-object-id', artwork.objectid);
  artworkDiv.find('.btn-added').hide();

  // Set it so when the user clicks the add button it calls the function to add
  // this artwork to the collection
  artworkDiv.find('.btn-add').click(function() {
    addToCollection(artworkDiv, artwork.objectid, artwork.title, imgHref);
  });

  // Display this artwork (the template is hidden, so when we cloned the
  // template, by default this artwork thumbnail would have been hidden as well)
  artworkDiv.show();

  // Return the artwork thumbnail element
  return artworkDiv;
}

let addToCollection = function(artworkDiv, objectId, title, imageURL) {
  let data = {
    collection_id: collectionId,
    object_id: objectId,
    title: title,
    image_url: imageURL
  }
  $.post('/artworks', data, function(data, status) {
    artworkDiv.find('.btn-add').hide();
    artworkDiv.find('.btn-added').show();
  });
  return false;
}

$("#artwork-search").submit(searchHarvardMuseumAPI);
