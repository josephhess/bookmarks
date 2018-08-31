/* global $ Bookmarks Store Api*/ 

$(function(){
  Api.getBookmarks((response) => {
    Store.setBookMarks(response);
    Bookmarks.attachHandlers();
    Bookmarks.render();
  });
});
