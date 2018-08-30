/* global Api Store*/ 

const Bookmarks = (function(){

  const bookmarkToHtml = function(bookmarkObj){
    const bookMarkRatingToStarString = function(rating){
      let str = '';
      for (let i = 1; i <= rating; i++){
        str += '<i class="fas fa-star"></i>';
      }
      return str;
    };

    return `
      <li>
      <div class="well col-md-12">
        <div class="form_wrapper">
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
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"> 1
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2"> 2
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3"> 3
                          </label>
                          <label class="radio-inline">
                              <input type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4">4
                          </label>
                          <label class="radio-inline">
                              <input type="radio" name="inlineRadioOptions" id="inlineRadio5" value="5">5
                          </label>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                    <button type="button" class="btn btn-default">Cancel</button>
            </form>
          </div>
        </div>
      <div class="well bookmark col-md-12">
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

  const generateHtmlString = function(){
    const html = Store.bookmarks.map(elem => bookmarkToHtml(elem));
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
  };

  const render = function(){
    const html = generateHtmlString();
    $('#results').html(html);
  };

  return {
    render,
    attachHandlers
  };
}());