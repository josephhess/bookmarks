/* global $ Api Store*/ 

const Bookmarks = (function(){

  const bookmarkToHtml = function(bookmarkObj){
    const bookMarkRatingToStarString = function(rating){
      let str = '';
      for (let i = 1; i <= rating; i++){
        str += '<i class="fas fa-star"></i>';
      }
      return str;
    };
    const radioChecked = function(radioVal, inputVal){
      if (radioVal === inputVal){
        return 'checked="checked"';
      };
      return 'checked=""'
    };

    return `
      <li>
      <div class=" bookmark_edit well col-md-12 hidden" id="${bookmarkObj.id}-form">
        <div class="form_wrapper ">
          <form class="bookmark_edit_form">
                    <div class="form-inline form-group">
                      <label for="bookMarkTitle">Title</label>
                      <input type="text" class="form-control" id="bookMarkTitle" value="${bookmarkObj.title}">
                      <label for="bookMarkUrl">Url</label>
                      <input type="text" id="bookMarkUrl" class="form-control" value="${bookmarkObj.url}">
                    </div>
                    <div class="form-group">
                        <label for="bookMarkDescriptionInput">Description</label>
                        <textarea class="form-control" rows="2" id="bookMarkDescriptionInput">${bookmarkObj.desc}</textarea>
                    </div>
                    <div class="ratingRadioOptions">
                          <label for="inlineRadioOptions">Rate this link</label>
                          <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" ${radioChecked(1,bookmarkObj.rating)}>1
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" ${radioChecked(2,bookmarkObj.rating)}>2
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" ${radioChecked(3,bookmarkObj.rating)}>3
                          </label>
                          <label class="radio-inline">
                              <input type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4" ${radioChecked(4,bookmarkObj.rating)}>4
                          </label>
                          <label class="radio-inline">
                              <input type="radio" name="inlineRadioOptions" id="inlineRadio5" value="5" ${radioChecked(5,bookmarkObj.rating)}>5
                          </label>
                    </div>
                    <button type="submit" class="item_edit_submit btn btn-default">Submit</button>
                    <button type="button" class="cancel_edit btn btn-default">Cancel</button>
            </form>
          </div>
        </div>
      <div class="well bookmark col-md-12" id="${bookmarkObj.id}">
          <div class="bookmark_title">
            <span>${bookmarkObj.title}</span>
          </div>
          <div class="bookmark_description hidden">
            <p>${bookmarkObj.desc}</p>
          </div>
          <div class="bookmark_stars">
              <span>
                ${bookMarkRatingToStarString(bookmarkObj.rating)}
              </span>
              <div class="button_wrapper hidden">
                  <button class="visit_link btn btn-alert" value="${bookmarkObj.url}">Visit Site</button>
                  <button class="edit_bookmark btn btn-alert">Edit</button>
                  <button class="delete_bookmark btn btn-alert">Delete</button>
                </div>
            </div>
        </div>
    </li>
    `;
  };

  const generateHtmlString = function(data){
    let curData;
    if (Store.minimum_rating !== 0){
      curData = data.filter(elem => elem.rating >= Store.minimum_rating);
    } else {
      curData = data;
    }
    const html = curData.map(elem => bookmarkToHtml(elem));
    return html.join('');
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

  // listen for change on the minimum rating dropdown
  // get the value and pass it to a filter results function either
  // standalone or within the overall generateHtml function
  // rerender


  // extended feature: 
  // listen for click on edit button
  // expand form and hide the data div
  // form will have the data in fields as it currently stands
  // on submit get id, post to api with updated info
  // if successful rerender
  // otherwise hide add new button and show error on the page
  // (probably more helpful to show error within the form since 
  // you could be well  down the page when it happens, could also do an alert)
  $.fn.extend({
    serializeJson: function(){
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  const handleFilterByRating = function(){
    $('#minimum_rating').on('change', e => {
      e.preventDefault();
      const value = $(e.currentTarget).val();
      Store.minimum_rating = parseInt(value);
      render();
    });
  };

  const hideOrShowBookMarkEditFrom = function(){
    $('#results').on('click', '.edit_bookmark', e => {
      e.preventDefault();
      e.stopPropagation();

      const id = $(e.currentTarget).closest('.bookmark').attr('id');
      $(`#${id}`).addClass('hidden');
      $(`#${id}-form`).removeClass('hidden');
    });
    $('#results').on('click', '.cancel_edit', e => {
      e.preventDefault();
      e.stopPropagation();
      
      const id = $(e.currentTarget).closest('.bookmark_edit').attr('id');  
      $(`#${(id.substr(0,(id.length - 5)))}`).removeClass('hidden');
      $(`#${id}`).addClass('hidden');
    });
  };

  const handleInitialFormState = function(){
    if (Store.bookmarks.length === 0){
      $('#show_bookmark_add_form').removeClass('hidden');
    }
  };

  const handleHideOrShowNewBookMarkForm = function(){
    $('#show_bookmark_add_form').on('click', e => {
      e.preventDefault();
      $('#main_add_new_form_wrapper').removeClass('hidden');
    });
    $('#add_new_form_cancel').on('click', e => {
      $('#main_add_new_form_wrapper').addClass('hidden');
    });
  };

  const handleDeleteButtonClicked = function(){
    $('#results').on('click', '.delete_bookmark', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = $(e.currentTarget).closest('.bookmark').attr('id');
      Api.deleteBookMark(id,
        () => {
          Store.deleteBookMark(id);
          render();
        },
        errorCallback  
      );
    });
  };

  const errorCallback = function(message){
    alert(message.responseJSON.message);
  };
 

  const handleNewBookmarkSubmit = function(){
    $('#add_new_form').submit(e => {
      e.preventDefault();
      const data = $(e.target).serializeJson();
      Api.createBookMark(
        data,
        (e) => { 
          Store.addBookMark(e);
          render();
        },
        errorCallback
      );
    });
  };

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
    $('#results').on('click', '.visit_link', e => {
      e.preventDefault();
      e.stopPropagation();
      const link = $(e.currentTarget).val();
      window.open(link, '_blank');
    });
  };

  const attachHandlers = () => {
    showOrHideDescAndActions();
    visitSitePreventClose();
    handleNewBookmarkSubmit();
    handleDeleteButtonClicked();
    handleFilterByRating();
    handleHideOrShowNewBookMarkForm();
    handleInitialFormState();
    hideOrShowBookMarkEditFrom();
  };

  const render = function(){
    const html = generateHtmlString(Store.bookmarks);
    $('#results').html(html);
  };

  // pass a callback to getBookmarks that runs render after response, in index.js

  return {
    render,
    attachHandlers
  };
}());