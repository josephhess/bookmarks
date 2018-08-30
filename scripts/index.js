/* global $ Bookmarks Store Api*/ 

$(function(){
 
  Api.getBookmarks((response) => {
    Store.setBookMarks(response);
    Bookmarks.render();
  });
  Bookmarks.attachHandlers();
});


// newBookMark = JSON.stringify({
//   title: "a lame  title",
//   url: 'https://www.google.com',
//   desc: 'a longer description',
//   rating: 2
  
// });
// Api.createBookMark(newBookMark, (data) => {console.log(data)}, (e) => {console.log(e, 'error')} );