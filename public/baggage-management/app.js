window.onload = function () {
  init()
}

function init() {
  if (getCookie('pid') != '') {
  var url = 'getSavedBags?pid=' + getCookie('pid')
  $.get(url, function(res) {
    showBags(res)
  })
  }

  if (getCookie('bagid') != '') {
    var url = 'getSavedBag?bagid=' + getCookie('bagid')
    $.get(url, function(res) {
      console.log(res.bagName)
      $("#bagName").attr("placeholder", res.bagName)
      var imgTag = '<img src=' + res.url + '>'
      $("#oldImage").append(imgTag)
      $("#bagID").attr("value", res.bagID)
    })
  }
}

function showBags(res) {
  var cards = ""
  $.each(res, function(i, bag) {
    cards +=
    `<div class="ui raised card" bagid=${bag.bagID}>
      <div class="card-image image">
        <img src="${bag.url}">
      </div>
      <div class="content">
        <a class="header">${bag.bagName}</a>
        <div class="meta">
          <span class="date">Added in ${bag.time}</span>
        </div>
        <div class="ui fluid buttons">
          <a class="ui blue basic button" onclick="editBag(this)"">Edit</a>
          <a class="ui yellow basic button" onclick="deleteBag(this)">Delete</a>
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
  document.cookie = pid
  window.location.replace("my-baggage.html")
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

// ============================================================
// Delete Bag
function deleteBag(e) {
  if (confirm("Do you really want to delete this bag?")) {
    var card = e.parentNode.parentNode.parentNode
    var bagID = $(card).attr("bagid")
    $(card).remove()
    var url = "deleteBag?bagid=" + bagID
    $.get(url, function(res) {
      console.log(res)
    })
  }
}

// ============================================================
// Edit Bag
function editBag(e) {
  var card = e.parentNode.parentNode.parentNode
  var bagID = $(card).attr("bagid")
  var bagidCookie = "bagid=" + bagID + "; path=/baggage-management/edit-bag.html"
  document.cookie = bagidCookie
  window.location.replace("edit-bag.html")
}