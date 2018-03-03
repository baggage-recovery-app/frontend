window.onload = function () {
	init()
}

function init() {
	if (getCookie('pid') != null) {
	var url = 'getSavedBag?pid=' + getCookie('pid')
		$.get(url, function(res) {
			console.log(res)
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
		  </div>
		</div>`
	})
	console.log(cards)
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
	var pid = 'pid=' + $("#passengerId").val()
	document.cookie = pid;
	window.location.replace("my-baggage.html");
}