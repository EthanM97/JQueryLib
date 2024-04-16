const $em = function (x) {
  if (x == document) {
    return {
      ready: function (cb) {
        if (document.readyState == "complete") {
          cb.bind(document);
          cb();
        } else {
          window.addEventListener("load", function () {
            // onload event on window; thispreserved should be used in the callback function.
            cb.bind(document);
            cb();
          });
        }
      },
    };
  } else if (typeof x == "string") {
    x = x.trim();
    let elements = document.querySelectorAll(x);

    return {
      click: function (cb) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].addEventListener("click", function (eobj) {
            cb.bind(elements[i]);
            cb(eobj);
          });
        }
      },
      val: function (value) {
        // assuming the CSS id selector is passed
        if (elements.length > 0) {
          if (value == undefined) return elements[0].value;
          else elements[0].value = value;
        }
      },
      css: function (property, value) {
        // assuming the CSS id selector is passed
        if (elements.length > 0) {
          if (value == undefined)
            return window.getComputedStyle(elements[0])[property];
          else elements[0].style[property] = value;
        }
      },
      html: function (content) {
        // assuming the CSS id selector is passed
        if (elements.length > 0) {
          if (content == undefined) return elements[0].innerHTML;
          else elements[0].innerHTML = content;
        }
      },
      load: function (url) {
        // assuming the CSS id selector is passed
        if (elements.length > 0) {
          let xhttp = new XMLHttpRequest();
          xhttp.addEventListener("load", function () {
            elements[0].innerHTML = xhttp.responseText;
          });
          xhttp.open("GET", url);
          xhttp.send();
        }
      },
    };
  } else return null;
};

$em.get = function (url, cb) {
  let xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", function () {
    cb(xhttp.responseText);
  });
  xhttp.open("GET", url);
  xhttp.send();
};
