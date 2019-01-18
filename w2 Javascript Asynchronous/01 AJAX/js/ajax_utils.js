var fakeSlowNetwork;

// you can ignore this immediately-executing function
// it is used to simulate a slow network to show you how AJAX and Promises work
(function () {
  var lsKey = 'fake-slow-network';
  var networkFakeDiv = document.querySelector('.network-fake');
  var checkbox = networkFakeDiv.querySelector('input');

  fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0;

  networkFakeDiv.style.display = 'block';
  checkbox.checked = !!fakeSlowNetwork;

  checkbox.addEventListener('change', function () {
    localStorage.setItem(lsKey, Number(checkbox.checked));
    location.reload();
  });
}());


// here is where the "real" example code starts
// it includes a few lines to "slow down" the AJAX calls
//   to simulate a real network scenario which you can ignore for now
//   but which will be relevant when we construct ASYNC callbacks next week

// ******* 
// AJAX STUFF
// *******
function getSync(url) {

  var req = new XMLHttpRequest();
  req.open('get', url, false);
  req.send();

  // pause here to simulate slow network - IGNORE
  var startTime = Date.now();
  var waitTime = 3000 * Math.random() * fakeSlowNetwork;
  while (waitTime > Date.now() - startTime);

  // now continue
  if (req.status == 200) {
    return req.response;
  }
  else {
    throw Error(req.statusText || "Request failed");
  }
}

function getJsonSync(url) {
  let data = JSON.parse(getSync(url));
  if (data['html'] != null) {
    if (data['html'].includes("dictum")) {
      // let definition = JSON.parse(getSync('api.wordnik.com/v4/word.json/dictum?api_key=APIKEY')); //Doesn't work without api key
      let newElement = document.createElement("div");
      newElement.setAttribute('id', 'newElement');
      document.getElementById("storyDiv").appendChild(newElement);
      newElement.innerHTML = 'Dictum: Doesn\'t work because it requires API key';
    }
  }
  return data;
}

function getSelection() {
  let txt = '';
  if (window.getSelection) {
    txt = window.getSelection();
  } else if (document.getSelection) {
    txt = document.getSelection();
  } else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  return txt;
}

document.ondblclick = () => {
  let t = getSelection();
}


// ******* 
// DOM STUFF
// *******
var storyDiv = document.querySelector('.story');

function addHtmlToPage(content) {
  var div = document.createElement('div');
  div.innerHTML = content;
  storyDiv.appendChild(div);
}

function addTextToPage(content) {
  var p = document.createElement('p');
  p.textContent = content;
  storyDiv.appendChild(p);
}