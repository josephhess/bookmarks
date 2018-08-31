const Store = (function(){
  let bookmarks;
  let minimum_rating = 0;

  const setBookMarks = function(dataSet){
    this.bookmarks = dataSet;
  };

  const addBookMark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  const deleteBookMark = function(id){
    this.bookmarks = this.bookmarks.filter( bm => bm.id !== id);
  };

  // const editBookMark = function(id, obj){
  //   const curBookMark = this.bookmarks.find( bm => bm.id = id);
  //   Object.assign(curBookMark, obj);
  // };
  return {
    bookmarks,
    setBookMarks,
    addBookMark,
    deleteBookMark,
    minimum_rating
  };
}());