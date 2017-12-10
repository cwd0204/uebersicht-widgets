var baseUrl = 'https://api.github.com';
var currentCallback;
var busy = false;

window.githubApiCallback = function githubApiCallback(json) {
  busy = false;
  if (currentCallback) {
    currentCallback(json.data);
  }
};

exports.getJSON = function getJSON(path, callback) {
  if (busy) {
    throw new Error('API request already in progress.');
  }
  busy = true;
  var script = document.createElement('SCRIPT');
  script.src = baseUrl + '/' + path + '?callback=githubApiCallback';
  document.body.appendChild(script);
  currentCallback = callback;
};
