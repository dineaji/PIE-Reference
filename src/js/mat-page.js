/*!
 *
 * Date: 2018-02-15
 * Handlebars run cmd - handlebars events.tmpl -f events.tmpl.js
 */

(function (genericFn, pagination, cookie, subBrandObj,router) {

    var
        showRowCookieName = "showRowCount",
        getRowCount = cookie.get(showRowCookieName);
        page = function () {
            return page.fn.init();
        };
        page.fn = page.prototype = {

        bindingConfig: function () {
            var obj = [{
                'elem': '#navbar-content .nav-item>a',
                'func': 'loadNavigation',
            }, {
                'elem': '#submit-search-results',
                'func': 'submitSearchResult'
            }, {
                'elem': '#pagination .page-link',
                'func': 'paginationClick'
            },{
                'elem': '.toggle-accordion',
                'func': 'toggleAccordion'
            }]
            return obj;
        },
        eventBinding: function ($curEl, callBack) {
            var self = this;
            if (typeof self[callBack] === 'function') {
                $(document).on('click', $curEl, function (evt) {
                    // evt.preventDefault();
                    self[callBack](this, evt);
                    // return false;
                })
            }
        },
        bindLooping: function (obj) {
            var self = this;
            for (var i = 0; i < obj.length; i++) {
                self.eventBinding(obj[i].elem, obj[i].func);
            }
            $('body').on('click', function (e) {
                if (!$('li.dropdown-list').is(e.target)
                    && $('li.dropdown-list').has(e.target).length === 0
                    && $('.show').has(e.target).length === 0
                ) {
                    $('li.dropdown-list').removeClass('show');
                }
            });
            $('#selectBrandName').on('change', function (e) {
                self['getBrandFilterDatas'](this, e)
            });
            $('#show-n-rows option[value=' + getRowCount + ']').attr('selected', true)
            $('#show-n-rows').on('change', function (e) {
                cookie.set(showRowCookieName, this.value);
                location.reload();
            });
        },
        paginationClick: function (elem, evt) {
            evt.preventDefault();
            genericFn.projectBindedArr = [];
            var tableId = "#search-result-table";
            var hrefKeyPair = $(elem).attr('href').split("=");
            if (genericFn.parseQueryString(window.location.search).page != hrefKeyPair[1]) {
                $(tableId).addClass("loading");
            }
            var updatedHref = genericFn.updateQueryStringParameter(hrefKeyPair[0], hrefKeyPair[1]);
            window.history.pushState('', '', updatedHref);
            Backbone.history.checkUrl()
        },
        
        
        // This function for analyzing page time.
        // hide the loading icon when DOM loaded
        selectedRowVal: function (elem) {
            var elem = elem || '#show-n-rows';
            return $(elem).find(":selected").val() || 0;
        },
        toggleAccordion: function(elem){
            var attrId = $(elem).attr("accordion-id");
            var $accordionElem = $(attrId).find(".collapse");
            if($(elem).hasClass('active')){ 
                $accordionElem.collapse("hide"); 
                $(elem).removeClass('active');
            }
            else{ $accordionElem.collapse("show"); $(elem).addClass('active'); }
        },
        loadNavigation: function (el, event) {
            var self = this;
            var elem = el.parentElement;
            var wrapLiLoop = 6;
            var subBrandName = elem.dataset.subBrandName;
            var src = "";
            if (!$(elem).hasClass('show')) $(elem).parent().children('li').removeClass('show')
            if ($(elem).hasClass('dropdown-list')) {
                $(elem).toggleClass('show');
                event.preventDefault();
                // return false;
            }
            if ($(elem).hasClass('api-loaded')) return;
            genericFn.requestAPICall({ type: 'post', methodName: 'getTeamList', body: { 'subBrandId': subBrandName } }, function (response) {
                if (!response && !response.recordset) { console.log("GetTeamList Service API Error."); return; }
                response.recordset.forEach(function (element, index) {
                    src += '<a href="/teams/' + element.item_id +'" class="teamlist-desc">' + element.item_descrip + '</a>'
                });
                $(elem).find(".submenu-carousel").html(src);
                genericFn.wrapElement($(elem).find(".submenu-carousel .teamlist-desc"), 'team-list-wrap', wrapLiLoop)
                $(elem).addClass('api-loaded').find('.submenu-carousel').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: false,
                    autoplaySpeed: 2000,
                    responsive: [
                        {
                          breakpoint: 1175,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 3,
                            // dots: false
                          }
                        }
                    ]
                })

            });
        },
        getBrandFilterDatas: function (curElem, evnt) {
            var template
                , context
                , getSubBrand = curElem.value ? subBrandObj[curElem.value] : {}
                , obj = {
                    subBrand: getSubBrand.subBrand,
                    brand: getSubBrand.brand
                }
                , $targetId = $("#search-form-wrapper")
                , $submitElem = $(curElem.form).find('input[type="submit"]');
            $targetId.addClass('loading');
            genericFn.requestAPICall({ type: 'post', methodName: 'getBrandFilterDatas', body: obj }, function (response) {
                var res = response && response.recordsets;
                if (!res) {
                    console.log("Err : Dropdown filter API failed..");
                    return false;
                }
                template = Handlebars.templates['searchFilterInputFields.tmpl'] // your template minus the .js
                context = {year: res[0],category: res[1],team: res[2],source: res[3]}
                $targetId.html(template(context)).removeClass('loading');
                $submitElem.removeAttr('disabled');
            })
        },
        submitSearchResult : function(elem,evt){
            var arr = [];
            var formFields = $('#search-form-wrapper input:text,#search-form-wrapper select');
            if(!formFields.length) return;
            formFields.each(function() {
                if($(this).val()){
                    arr.push($(this).val());
                }
            });
            if(_.isEmpty(arr)){
                console.log("Select Atleast one fileds..");
                $("#dialog-modal").modal('show');
                // $.notify("Please enter at least one of the following search fields", "error");
                evt.preventDefault();
                return false;
            }
        },
        init: function () {
            genericFn.DOMLoaded();
            this.bindLooping(this.bindingConfig());
            router.init(this);
        }
    }
    page = new page();

}(mattelSite , mattelSite.pagination,mattelSite.cookie,mattelSite.getSubBrands,mattelSite.router));
