(function (global) {
    var
        version = "1.0",
        mattelSite = {
            projectBindedArr : [],
            groupUniqueObj: function (resObj, keyName) {
                var data = {};
                if (resObj == undefined || keyName == undefined) return false;
                for (var i = 0; i < resObj.length; ++i) {
                    var obj = resObj[i];
                    if (data[obj[keyName]] === undefined)
                        data[obj[keyName]] = []; //Assign a new array with the first element of DtmStamp.

                    data[obj[keyName]].push(obj);
                }
                return data;
            },
            DOMLoaded: function () {
                document.onreadystatechange = function () {
                    var state = document.readyState
                    if (state == 'interactive') {
                        document.getElementById('page-container').style.visibility = "hidden";
                    } else if (state == 'complete') {
                        document.getElementById('interactive');
                        document.getElementById('page-loading').style.visibility = "hidden";
                        document.getElementById('page-container').style.visibility = "visible";
                    }
                }
            },
            parseQueryString: function (queryString) {
                if (!queryString) return false;
                var query = {};
                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            },
            updateQueryStringParameter: function (key, value, uri) {
                var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
                if (!uri) uri = window.location.href;
                var separator = uri.indexOf('?') !== -1 ? "&" : "?";
                if (uri.match(re)) {
                    return uri.replace(re, '$1' + key + "=" + value + '$2');
                }
                else {
                    return uri + separator + key + "=" + value;
                }
            },
            wrapElement: function (elem, clsName, gridColWrap) {
                for (var i = 0; i < elem.length; i += gridColWrap) {
                    var $div = $("<li/>", { class: clsName });
                    elem.slice(i, i + gridColWrap).wrapAll($div);
                }
            },
            requestAPICall: function (obj, cb) {
                var self = this;
                return $.ajax({
                    type: obj.type,
                    url: location.protocol + '//' + location.host + "/api/" + obj.methodName,
                    contentType: 'application/json',
                    data: JSON.stringify(obj.body),
                    success: function (response) {
                        if (typeof self[cb] == 'function') {
                            self[cb](response);
                        } else if (typeof cb == "function") {
                            cb(response)
                        }
                    },
                    error: function (errrLog) {
                        if (typeof self[cb] == 'function') {
                            self[cb](false);
                            $.notify(obj.methodName + "API Error!", "error");
                        }
                    }
                });
            },
            evenWithODDArrSort : function(res){
                var ar1 = [],ar2=[];
                var result = {};
                for (var i = 0; i < (Object.keys(res)).length; i++) {
                    if(i % 2 === 0) { // index is even
                        ar1.push(Object.keys(res)[i]);
                    } else{
                        ar2.push(Object.keys(res)[i]);
                    }
                }
                ar1 = ar1.concat(ar2);

                ar1.forEach(function(key) {
                    var found = false;
                        if(!result[key]){
                            result[key] = [];
                        }
                        if(!found && res[key]) {
                            result[key] = res[key];
                            found = true;
                            return false;
                        } else 
                            return true;
                })
                return result;
            },
            helperFunction : function(){
                // HBS helper for == and || condition
                var self = this;
                Handlebars.registerHelper('ifCond', function (operator1, v1, v2, v3, v4, options) {

                    switch (operator1) {
                        case '==||':
                            return (v1 == v2 || v3==v4) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
                })
                Handlebars.registerHelper('ifHelper', function (v1, operator, v2, options) {

                    switch (operator) {
                        case '==':
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        case '===':
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        case '!=':
                            return (v1 != v2) ? options.fn(this) : options.inverse(this);
                        case '!==':
                            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                        case '<':
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        case '<=':
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        case '>':
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        case '>=':
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        case '&&':
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);
                        case '||':
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
                });
                Handlebars.registerHelper('titleFormat', function(title) {
                    var title = title.split("."),
                        titleFormat = title[title.length-1];
                    return titleFormat;
                });
                Handlebars.registerHelper('isProjectAlreadyBinded', function(projectId,options) {
                    if(self.projectBindedArr.indexOf(projectId)==-1) {
                        self.projectBindedArr.push(projectId);
                        return options.fn(this)
                    }
                    return options.inverse(this);
                });
            }
        }
    global.mattelSite = mattelSite;

}(typeof window !== "undefined" ? window : this));