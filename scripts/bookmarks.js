/* global $ Api Store*/ 

const Bookmarks = (function(){

  const errorCallback = function(response){
    $('#error_box').removeClass('hidden');
    $('#error_box').find('#error_message').html(response.responseJSON.message);
  };

  $.fn.extend({
    serializeJson: function(){
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => {
        o[name] = val;        
      });
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
      Store.currently_editing = id;
      render();
    });
    $('#results').on('click', '.cancel_edit', e => {
      e.preventDefault();
      e.stopPropagation();
      
      Store.currently_editing = null;
      render();
    });
  };

  const handleEditBookMarksForm = function(){
    $('#results').on('submit','.bookmark_edit_form', e => {
      e.preventDefault();
      e.stopPropagation();

      const id = $(e.currentTarget).closest('.bookmark_edit').attr('id');
      const data = $(e.target).serializeJson();

      Api.editBookMark(id, data, 
        () => {
          Store.editBookMark(id,JSON.parse(data));
          Store.currently_editing = null;
          render();
        },
        errorCallback
      );   
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

  const handleHideOrShowNewBookMarkForm = function(){
    $('#show_bookmark_add_form').on('click', e => {
      e.preventDefault();
      $('#main_add_new_form_wrapper')
        .removeClass('hidden');
    });
    $('#add_new_container').on('click', '#add_new_form_cancel', () => {
      $('#main_add_new_form_wrapper')
        .addClass('hidden');
    });
  };
 
  const handleNewBookmarkSubmit = function(){
    $('#add_new_container').on('submit', '#add_new_form',e => {
      e.preventDefault();

      const data = $(e.target).serializeJson();
      Api.createBookMark(
        data,
        (response_data) => { 
          Store.addBookMark(response_data);
          e.target.reset();
          $('#main_add_new_form_wrapper').addClass('hidden');
          render();
        },
        errorCallback
      );
    });
  };

  const showOrHideDescAndActions = function(){
    $('#results').on('click', '.bookmark', e => {
      e.preventDefault();
      e.stopPropagation();

      $(e.currentTarget)
        .find('.bookmark_description')
        .toggleClass('hidden');

      $(e.currentTarget)
        .find('.button_wrapper')
        .toggleClass('hidden');
    });
  };

  const visitSiteAndPreventClose = function(){
    $('#results').on('click', '.visit_link', e => {
      e.preventDefault();
      e.stopPropagation();
      const link = $(e.currentTarget).val();
      try {
        window.open(link, '_blank');
      } catch(e){
        $('#error_box').removeClass('hidden');
        $('#error_box').find('#error_message').html(e.toString());
      } 
    });
  };

  const attachHandlers = () => {
    showOrHideDescAndActions();
    visitSiteAndPreventClose();
    handleNewBookmarkSubmit();
    handleDeleteButtonClicked();
    handleFilterByRating();
    handleHideOrShowNewBookMarkForm();
    hideOrShowBookMarkEditFrom();
    handleEditBookMarksForm();
  };

  const render = function(){
    $('#error_box').addClass('hidden');
    const addNewFormHtml = GenerateHtml.addNewForm();
    $('#add_new_container').html(addNewFormHtml)
    const html = GenerateHtml.generateHtmlString(Store.bookmarks);
    $('#results').html(html);
  };

  return {
    render,
    attachHandlers
  };
}());