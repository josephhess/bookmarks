/* global Store*/ 

const GenerateHtml = (function(){

  const bookMarkRatingToStarString = function(rating){
    let str = '';
    for (let i = 1; i <= rating; i++){
      str += '<i class="fas fa-star"></i>';
    }
    return str;
  };
  const radioChecked = function(radioVal, inputVal){
    if (radioVal === parseInt(inputVal)){
      return 'checked="checked"';
    }
    return '';
  };

  const addNewForm = function(){
    const hidden = e => {
      if (Store.bookmarks.length === 0){
        return '';
      }
      return 'hidden';
    }
    return `    
      <div aria-live="polite" id="main_add_new_form_wrapper" class="well col-md-12 ${hidden()}">
        <p id="add_new_bookmark">Add a new bookmark here</p> 
        <form id="add_new_form">
          <div class="form-inline form-group">
            <label for="title" >Title</label>
            <input aria-label="title of bookmark" type="text" class="form-control" name="title" value="">
            <label for="url">Url</label>
            <input aria-label="url of bookmark" type="text"  name="url" class="form-control" value="">
          </div>
          <div class="form-group">
            <label for="desc">Description</label>
            <textarea aria-label="longer description of bookmark" class="form-control" rows="2" name="desc"></textarea>
          </div>
          <fieldset>
          <legend>Choose a rating for the bookmark from 1 to 5</legend>
            <div class="ratingRadioOptions">
              <label for="rating">Rate this link</label>
              <label class="radio-inline">
                <input type="radio" name="rating" value="1"> 1
              </label>
              <label class="radio-inline">
                <input type="radio" name="rating"  value="2"> 2
              </label>
              <label class="radio-inline">
                <input type="radio" name="rating" value="3"> 3
              </label>
              <label class="radio-inline">
                  <input type="radio" name="rating" value="4">4
              </label>
              <label class="radio-inline">
                  <input type="radio" name="rating" value="5">5
              </label>
            </div>
          </fieldset>
          <button type="submit" class="btn btn-default">Submit</button>
          <button id="add_new_form_cancel" type="button" class="btn btn-default">Cancel</button>
        </form>
      </div>
      `;
  };

  const bookmarkToEditForm = function(bookmarkObj){
    return `
      <li>
        <div aria-live="polite" class="bookmark_edit well col-md-12 " id="${bookmarkObj.id}">       
          <form class="bookmark_edit_form">
            <div class="form-inline form-group">
              <label for="title">Title</label>
              <input aria-label="edit title of this bookmark" type="text" class="form-control" name="title" value="${bookmarkObj.title}">
              <label for="url">Url</label>
              <input aria-label="edit url of this bookmark" type="text" name="url" class="form-control" value="${bookmarkObj.url}">
            </div>
            <div class="form-group">
              <label for="desc">Description</label>
              <textarea aria-label="edit the longer description of bookmark" class="form-control" name="desc"rows="2" >${bookmarkObj.desc}</textarea>
            </div>
            <div>
              <fieldset>
                <legend>Choose a rating for the bookmark from 1 to 5</legend>
                <label for="rating">Rate this link</label>
                <label class="radio-inline">
                  <input type="radio" name="rating" value="1" ${radioChecked(1,bookmarkObj.rating)}>1
                </label>
                <label class="radio-inline">
                  <input type="radio" name="rating"  value="2" ${radioChecked(2,bookmarkObj.rating)}>2
                </label>
                <label class="radio-inline">
                  <input type="radio" name="rating" value="3" ${radioChecked(3,bookmarkObj.rating)}>3
                </label>
                <label class="radio-inline">
                    <input type="radio" name="rating" value="4" ${radioChecked(4,bookmarkObj.rating)}>4
                </label>
                <label class="radio-inline">
                    <input type="radio" name="rating" value="5" ${radioChecked(5,bookmarkObj.rating)}>5
                </label>
              </fieldset>
            </div>
            <button type="submit" class="item_edit_submit btn btn-default">Submit</button>
            <button type="button" class="cancel_edit btn btn-default">Cancel</button>
          </form>
        </div>
      </li>
    `;
  };
  const bookmarkToHtml = function(bookmarkObj){
    return `
    <li>
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
    const html = curData.map( elem => {
      if (Store.currently_editing && Store.currently_editing === elem.id){
        return bookmarkToEditForm(elem);
      } else {
        return bookmarkToHtml(elem);
      }
    });
    return html.join('');
  };

  return {
    addNewForm,
    generateHtmlString
  };
}());