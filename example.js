var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

/* Makes an image and caption appear in the detail (big) picture */
function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage =
      document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle =
      document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

/* pulls out the image URL from a thumbnail */
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

/* pulls out the image title from a thumbnail */
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title')
}

/* sets the URL and title of the detail (big)
 * picture from a thumbnail.
 * The first arg is a DOM node. */

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail),
             titleFromThumb(thumbnail));
}

/* adds a click handler to the given thumbnail,
 * a DOM node. The click handler causes the
 * detail (big) picture's attribute to be
 * set from the thumbnail's attributes
 */

function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);  // non-local var
  });
}

/* return a real array of all the thumbnail nodes. */

function getThumbnailsArray() {
  'use strict';
  var thumbnails =
      document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

/* sets everything up, by getting all the thumbnails and
 * adding an event handler to each one. */

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();   // set everything up