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
      data: data,
      success: successCallBack,
      error: errorCallBack
    });
  };

  const deleteBookMark = function(id, successCallBack, errorCallBack){  
    $.ajax({
      method: 'DELETE',
      url: `${BASE_URL}/${id}`,
      contentType: 'application/json',
      success: successCallBack,
      error: errorCallBack
    });
  };

  const editBookMark = function(id, data, successCallBack, errorCallBack){  
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/${id}`,
      contentType: 'application/json',
      success: successCallBack,
      error: errorCallBack,
      data: data
    });
  };

  return {
    getBookmarks,
    createBookMark,
    deleteBookMark

  };
}());
