/* global Api Store*/ 

const Bookmarks = (function(){

  const bookmarkToHtml = function(bookmarkObj){

  };
  // get each bookmark into html
  // get all of the bookmark htmls into one big block
  // add the total html to the dom
  // listen for click on the element and expand it (certain element are hidden)

  // listen for click on the delete button
  // get id from the element
  // call delete on api to delete the item
  // rerender

  // if store is empty, show a message "Add your first bookmark!" 
  // and have add-new form shown, if store is not empty
  // listen for click on add new button and show form when clicked 
  //  and hide the add new button
  // then listen for click on cancel to hide the form and show add a new
  // book mark button again, clear out contents of add new form on cancel

  // listen for submit on add new form and add call addNewItem on api then
  // if successful rerender
  // otherwise show error on page
  // 

  // extended feature: 
  // listen for click on edit button
  // expand form and hide the data div
  // form will have the data in fields as it currently stands
  // on submit get id, post to api with updated info
  // if successful rerender
  // otherwise hide add new button and show error on the page
  // (probably more helpful to show error within the form since 
  // you could be well  down the page when it happens, could also do an alert)


  const showOrHideDescAndActions = function(){
    $('#results').on('click', '.bookmark', e => {
      e.preventDefault();
      const desc = $(e.currentTarget).find('.bookmark_description');
      const buttons = $(e.currentTarget).find('.button_wrapper');
      desc.toggleClass('hidden');
      buttons.toggleClass('hidden');
    });
  };

  const visitSitePreventClose = function(){
    $('.visit_link').on('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const link = $(e.target).val();
      window.open(link, '_blank');
    });
  };

  const attachHandlers = () => {
    showOrHideDescAndActions();
    visitSitePreventClose();
  };


  const render = function(){

  };

  return {
    render,
    attachHandlers
  };
}());