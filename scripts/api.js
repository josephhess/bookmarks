/* global Api $ */ 

const Api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joseph/bookmarks';

  const getBookmarks = function(successCallBack){
    $.getJSON(BASE_URL, successCallBack);
  };

  const createBookMark = function(data, successCallBack, errorCallBack){
    $.ajax({
      method: 'POST',
      url: BASE_URL,
      contentType: 'application/json',
      success: successCallBack,
      error: errorCallBack,
      data: data
    });
  };

  return {
    getBookmarks,
    createBookMark
  };
}());

// function(){
//   newBookMark = JSON.stringify({
//     title: "a lame  title",
//     url: 'https://www.google.com',
//     desc: 'a longer description',
//     rating: 2
    
//   });
//   Api.createBookMark(newBookMark, (data) => {console.log(data)}, (e) => {console.log(e, 'error')} );
// }
