const Store = (function(){
  let bookmarks;

  const setBookMarks = function(dataSet){
    this.bookmarks = dataSet;
  };

  return {
    bookmarks,
    setBookMarks
  };
}());