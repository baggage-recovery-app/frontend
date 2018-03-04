window.onload = function () {
  init()
}

function init() {
  if (getCookie('pid') != '') {
  var url = 'getSavedBag?pid=' + getCookie('pid')
    $.get(url, function(res) {
      showBags(res)
    })
  }
}

function showBags(res) {
  var cards =""
  $.each(res, function(i, bag) {
    cards +=
    `<div class="ui raised card">
      <div class="card-image image">
        <img src="${bag.url}">
      </div>
      <div class="content">
        <a class="header">${bag.bagName}</a>
        <div class="meta">
          <span class="date">Added in ${bag.time}</span>
        </div>
        <div class="ui fluid buttons">
          <button class="ui blue basic button">Edit</button>
          <button class="ui yellow basic button">Delete</button>
        </div>
      </div>
    </div>`
  })
  $("#cards").append(cards)
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function submitPassengerId() {
  var pid = 'pid=' + $("#passengerId").val() + "; path=/baggage-management/my-baggage.html"
  document.cookie = pid;
  window.location.replace("my-baggage.html");
}

// ============================================================
// Add new Bag
function displayAsImage() {
  var file = $("#bagImageInput")[0].files[0]
  var imgURL = URL.createObjectURL(file),
      img = document.createElement('img');

  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };

  img.src = imgURL;
  $("#preview").append(img)
  $(".bottom-fixed-button").removeClass("bottom-fixed-button").addClass("bottom-button")
}