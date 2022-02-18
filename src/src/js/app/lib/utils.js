import lodashClone from 'lodash/clone';
import { sanitizeInputString } from './stringUtils';

//toggle class (useful for css animations)
//---------------------------

//functions to use
export function hasClass(el, className) {
	if(el && className) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
	}
}
export function addClass(el, className) {
	if(el && className) {
		if (el.classList) el.classList.add(className);
		else if (!hasClass(el, className)) el.className += ' ' + className;
	}
}
export function removeClass(el, className) {
	if(el && className) {
		if (el.classList) el.classList.remove(className);
		else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
	}
}
export function toggle(el) {
    hasClass(el, 'is_hidden') ? removeClass(el, 'is_hidden') : addClass(el, 'is_hidden');
}
export function toggleClass(el, className) {
    hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}

//usecase:
// var el = document.querySelector('div');
// if (!hasClass(el, 'foo')) addClass(el, 'foo');

export function refsToArray(ctx, prefix){
	var results = [];
	for (var i=0;;i++){
	  var name = prefix + '-' + String(i);
	  var ref = ctx.refs[name];
	  //create an array of ref object (set loaded to false at first)
	  if (ref) results.push(ref);
	  else return results;
	}
}

//IE9/10 polyfill custom event
//use like this:
// let LoadSceneEvent = CustomEvent("sceneLoaded", { bubbles: false, cancelable: false, detail: 'my event detail' });
export function CustomEvent ( event, params ) {
	params = params || { bubbles: false, cancelable: false, detail: undefined };
	var evt = document.createEvent( 'CustomEvent' );
	evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	return evt;
}
CustomEvent.prototype = window.Event.prototype;

// check if array contians a certain value
// usage:
// contains.call(myArray, lookupValue) //true
export function contains(needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;

  if(!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
  } else {
      indexOf = function(needle) {
          var i = -1, index = -1;
          for(i = 0; i < this.length; i++) {
              var item = this[i];

              if((findNaN && item !== item) || item === needle) {
                  index = i;
                  break;
              }
          }
          return index;
      };
  }
  return indexOf.call(this, needle) > -1;
};

export function flattenObjArray(inArray, key) {
//return an array of values given a key in an array of objects
    if(inArray) {
      //convert to regular array of strings
      let outArray = inArray.map((item) => {
          return item[key];
      });
      //convert to comma string
      return outArray;
    } else {
      return null
    }
}

export function flattenActiveObjArray(inArrayObj, key) {
  //return an array of values given a key in an array of objects (if 'active')
  //used for button controls
  let newArray = inArrayObj.filter((item) => {
    if(item.active == true) {
      return true;
    } else {
      return false;
    }
  }).map((item) => {
    return item[key]
  });

  return newArray;
}

export function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export function setUrlParams(key, val) {
  if (!Array.isArray(val)) {
    //if not an array, convert to it
    //make it a string in an array
    let str = String(val);
    val = [];
    val.push(str);
  }

  val = val.join('+');
  let hash = window.location.hash;
  // replace valu on the part of the hash that has the current key
  if(hash) {
    hash = hash.replace('#', '')
    // get the query parts
    let parts = (/\?/.test(hash) ? hash.split('?') : [hash])
    
    let finalParts = [];
    let containsKey = parts.length;
    for(var i = 0; i < parts.length; i++) {
      // get the part that has the key
      var regexp = new RegExp('^' + key);
      if (regexp.test(parts[i])) {
        let params = parts[i].split('=');
        if (params[0]) {
          if(key && (!val.length)) {
            //if there is a key but an empty value remove it altogether
          } else {
            finalParts[i] = key + '=' + val;
          }
        }
      } else {
        finalParts[i] = parts[i];
        containsKey--;
      }
    }

    //re-index the array incase we had to remove one due to empty value
    finalParts.filter(val => val)

    // if key doesn't exist and it has a value, just add it in with it's new values
    if ((!containsKey) && (val.length)) {
      finalParts = lodashClone(parts);
      finalParts.push(key + '=' + val)
    }
    
    window.location.hash = finalParts.join('?');
  } else {
    // if no hash just put this key value on
    window.location.hash = key + '=' + val;;
  }
}

export function getUrlParams(key) {
  let hash = window.location.hash;

  if(hash) {
    hash = hash.replace('#', '');

    // get the query parts
    let parts = (/\?/.test(hash) ? hash.split('?') : [hash]);
    
    for(var i = 0; i < parts.length; i++) {
      // get the part that has the key
      var regexp = new RegExp('^' + key + '=');
      // get the indavidual parameters
      if (regexp.test(parts[i])) {
        let params = parts[i].split('=');

        if (params && (!params[1])) {
          //if a parameter but no value
          return [];
        }

        if (params && params[1]) {
          //if value(s) 
          //sanitize
          params[0] = decodeURI(sanitizeInputString(params[0]));
          params[1] = decodeURI(sanitizeInputString(params[1]));

          //(split by +) returns them in the form of an array
          params = params[1].split('+');
          return params;
        }
      }
    }
  }
  //no parameter not found
  return false;
}

export function clone(objectToClone) {
  let clonedObject = JSON.stringify(objectToClone);
  try {
    return JSON.parse(clonedObject);
  }
  catch(e) {
    return false;
  }
}