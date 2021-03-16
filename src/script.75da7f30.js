// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var list = document.querySelectorAll('.list');
var currentLeauge = document.querySelector('.current--leauge');
var currentLeaugeSpan = document.querySelector('.current--leauge-span');
var btn = document.querySelector('.btn');
var h2 = document.querySelector('.h2--matchday');
var currentMatchday = 0;
var changerLeauges;
var containerParent = document.querySelector('.container--parent');
var heart = document.querySelector('.heart');
var seasons = document.querySelectorAll('.season');
var links = document.querySelectorAll('.link');

var initIfs = function initIfs() {
  if (currentLeauge.innerText === 'PREMIER LEAUGE') changerLeauges = 'en.1';
  if (currentLeauge.innerText === 'BUNDESLIGA') changerLeauges = 'de.1';
  if (currentLeauge.innerText === 'SERIE A') changerLeauges = 'it.1';
  if (currentLeauge.innerText === 'LA LIGA') changerLeauges = 'es.1';
  if (currentLeauge.innerText === 'LIGUE 1') changerLeauges = 'fr.1';
}; //WYSUWANE MENU CZ.1


list.forEach(function (l) {
  l.style.display = 'none';
}); //WYSUWANE MENU CZ.2

var _loop = function _loop(i) {
  links[i].addEventListener('click', function (e) {
    if (list[i].style.display === 'none') {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  });
};

for (var i = 0; i < links.length; i++) {
  _loop(i);
}

if (module.hot) {
  module.hot.accept();
}

var returnUrl = function returnUrl() {
  return "https://raw.githubusercontent.com/openfootball/football.json/master/".concat(currentLeaugeSpan.innerText, "/").concat(changerLeauges, ".json");
}; //CZYTANIE WARTOŚCI Z KLIKNIETEJ LIGI I WRZUCZENIE ICH DO OVERVIEW


for (var _i = 0; _i < seasons.length; _i++) {
  seasons[_i].addEventListener('click', function (e) {
    //LISTA Z DATAMI SEZONOW
    var clickedLi = e.target.closest('li');
    currentLeaugeSpan.innerText = "".concat(clickedLi.innerText); //KTORA LIGA JEST OBECNIE WYBRANA

    var activeLeauge = clickedLi.parentNode.parentNode.firstChild.innerText;
    currentLeauge.innerText = "".concat(activeLeauge);
    initIfs(); //FETCH

    fetch(returnUrl()).then(function (request) {
      return request.json();
    }).then(function (data) {
      console.log(data);
      containerParent.innerHTML = ''; //WERSJA DOMYŚLNA

      currentMatchday = 0;
      var testChanger = data.rounds[0].matches;
      h2.innerText = data.rounds[0].name; //TESTOWANA WERSJA
      // settingActiveLeauge()

      testChanger.forEach(function (match) {
        var html = "<div class=\"container--row\">\n            <div class=\"team--1 teams\"><img src=\"../images/".concat(match.team1, ".png\"/>\n            <span>").concat(match.team1, "</span></div><div class=\"score\">").concat(match.score.ft[0], ":").concat(match.score.ft[1], "</div>\n            <div class=\"team--2 teams\"><span>").concat(match.team2, "</span><img src=\"../images/").concat(match.team2, ".png\"/>\n            </div></div>");
        containerParent.insertAdjacentHTML('afterbegin', html);
      });
    });
  });
}

; //FUNKCJA DO ZMIANY KOLEJKI + 1

var changerMatchday = function changerMatchday() {
  // containerParent.innerHTML = '';
  fetch(returnUrl()).then(function (request) {
    return request.json();
  }).then(function (data) {
    //wersja domyślna
    var testChanger = data.rounds[currentMatchday].matches;
    var nameTaker = data.rounds[currentMatchday].name;
    h2.innerText = nameTaker;

    if (currentMatchday === 0) {
      testChanger = data.rounds[0].matches;
      h2.innerText = data.rounds[0].name;
    } //funkcjonalnosc


    testChanger.forEach(function (match) {
      html = "<div class=\"container--row\">\n       <div class=\"team--1 teams\"><img src=\"../images/".concat(match.team1, ".png\"/>\n       <span>").concat(match.team1, "</span></div><div class=\"score\">").concat(match.score.ft[0], ":").concat(match.score.ft[1], "</div>\n       <div class=\"team--2 teams\"><span>").concat(match.team2, "</span><img src=\"../images/").concat(match.team2, ".png\"/>\n       </div></div>");
      containerParent.insertAdjacentHTML('afterbegin', html);
    });
  }).catch(function (reject) {
    alert("There's no more matchdays") ? "" : location.reload();
  });
}; // const cleaner = async function () {
//   let cleaner = containerParent.innerHTML = ''
//   await cleaner;
// }


var leaugePlus = function leaugePlus() {
  initIfs();
  changerMatchday();
  currentMatchday++;
  containerParent.innerHTML = '';
};

var leaugeMinus = function leaugeMinus() {
  initIfs();
  currentMatchday--;
  changerMatchday();
  containerParent.innerHTML = '';
}; //LIGA WEJSCIOWA


var settingActiveLeauge = function settingActiveLeauge() {
  initIfs();
  changerMatchday();
  currentMatchday = 0;
};

settingActiveLeauge();
document.querySelector('.btn--2').addEventListener('click', leaugePlus);
document.querySelector('.btn--1').addEventListener('click', leaugeMinus); //ADDA POWYZEJ DAC DO SRODKA

var searching = function searching(e) {
  var lookingFor = document.querySelector('.search');
  e.preventDefault();
  var searchedNumber = lookingFor.value;
  var myValue = Number(searchedNumber);
  lookingFor.placeholder = '';
  initIfs();
  fetch(returnUrl()).then(function (request) {
    return request.json();
  }).then(function (data) {
    containerParent.innerHTML = '';
    var testChanger = data.rounds[myValue - 1].matches;
    h2.innerText = data.rounds[myValue - 1].name;
    currentMatchday = myValue - 1; // searchedNumber.innerText = '';

    testChanger.forEach(function (match) {
      var html = "<div class=\"container--row\">\n    <div class=\"team--1 teams\"><img src=\"../images/".concat(match.team1, ".png\"/>\n    <span>").concat(match.team1, "</span></div><div class=\"score\">").concat(match.score.ft[0], ":").concat(match.score.ft[1], "</div>\n    <div class=\"team--2 teams\"><span>").concat(match.team2, "</span><img src=\"../images/").concat(match.team2, ".png\"/>\n    </div></div>");
      containerParent.insertAdjacentHTML('afterbegin', html);
    });
  }).catch(function (reject) {
    alert("There's no matchdays for this number!") ? "" : location.reload();
  });
}; //ARROWS LEFT/RIGHT


window.addEventListener("keydown", function (e) {
  if (e.defaultPrevented) {
    return;
  }

  switch (e.key) {
    case "ArrowLeft":
      leaugeMinus();
      break;

    case "ArrowRight":
      leaugePlus();
      break;
  }
});
btn.addEventListener('click', searching);
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56251" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map