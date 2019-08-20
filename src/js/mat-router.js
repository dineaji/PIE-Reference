/*!
    *
    * Date: 2018-03-02
    */

(function (mat,pagination,cookie,subBrandObj) {
    var 
    
    router = {

    Router: Backbone.Router.extend({
        routes: {
            "teams/:id(/)(?*queryString)": "teamResults",
            "teams/:action/:id": "searchDetail",
            "searchresults/:id": "searchDetail",
            "searchresults": "searchResults",
            "brands/:id(/)(?*queryString)": "searchBrandResults",
            "brands/:action/:id": "searchDetail"
        },
        getSearchResultInit: function (id) {
            if (typeof id.includes == "function" && id.includes("index")) return;
            if (typeof id == "string" && isNaN(id)) {
                return true;
            }
            console.log("Invalid Query String format..")
            return false;
        },
        bindSearchResult: function (response, pageNo, selectedRowVal, serachParams) {
            var tableId = "#search-result-table";
            var showRowsId = "#show-n-rows-container";
            var resposeDatas = response.recordsets;
            var $filterInfo = $(".filter-info-bar");
            var $filterCount = $filterInfo.find("#filter-total-results");
            var $filterInfoList = $filterInfo.find("#filter-info-list");
            $filterCount.html(response.recordset[0].TotalRecords);
            $filterInfoList.html(serachParams);
            $filterInfo.removeClass('hidden-xs-up');
            if (!_.isEmpty(resposeDatas[1]) || pageNo) {
                var res = "";
                var paginationSize =
                    Math.ceil(resposeDatas[0][0].TotalRecords / selectedRowVal);
                if (pageNo > paginationSize) {
                    console.log("page no: " + pageNo + " is not available.redirecting..");
                    var updatedHref = mat.updateQueryStringParameter('page', paginationSize);
                    window.history.pushState('', '', updatedHref);
                    Backbone.history.checkUrl()
                    return false;
                }
                pagination.Init(document.getElementById('pagination'), {
                    size: paginationSize, // pages size
                    page: pageNo || 1,   // selected page
                    step: 3   // pages before and after current
                });
                if(paginationSize==1){
                    $('#pagination').addClass("arrow-disabled");
                }
                $(tableId).addClass('loading');
                var template = Handlebars.templates['searchResults.tmpl'], // your template minus the .js
                    context = {
                        items:resposeDatas[1],
                        baseHref : window.location.href.split('?')[0]
                    }
                    if(context.items.length>1) $filterInfo.addClass('multiple-results-count')
                $(tableId).html(template(context)).removeClass('empty-container loading');
                $(showRowsId).addClass('d-inline').removeClass('d-none');
            } else {
                $(tableId).addClass('empty-container').removeClass('loading').html('')
                $(showRowsId).addClass('d-none').removeClass('d-inline');
            }
        },
        teamResults: function (id, queryString) {
            if (!this.getSearchResultInit(id)) return;
            var self = this;
            var queryString = mat.parseQueryString(queryString);
            var selectedRowVal = mat.page.selectedRowVal();
            var pageNo = queryString.page && parseInt(queryString.page);
            var firstIndex = selectedRowVal * (pageNo - 1);
            var lastIndex = selectedRowVal * pageNo;
            var postObj = {
                teamName: id,
                lastIndex: firstIndex || 0,
                recordsCount: selectedRowVal || 10
            };
            var $activeNav = "";
            var brandName = "";
            var teamName = "";
            mat.requestAPICall({ type: 'post', methodName: 'getProjects', body: postObj }, function (response) {
                brandName = response.recordsets[2];
                if( !_.isEmpty(brandName) && brandName[0].BrandDisplayName){
                    $activeNav = $('#navbar-content li[data-brand-name=' + brandName[0].BrandDisplayName + ']');
                    $activeNav.addClass('active');
                    teamName = brandName[0].team;
                }
                self.bindSearchResult(response, pageNo, selectedRowVal,teamName || id);
            });
        },
        searchDetail : function(queryString,id){
            var $elemId = $("#search-detail-container");
            mat.requestAPICall({ type: 'post', methodName: 'getProjectDetail', body: {'projectNumber' : id || queryString} }, function (response) {
                if(_.isEmpty(response) || _.isEmpty(response.productDocuments)){
                    console.log("Err: Search Detail API Fails..")
                    $elemId.addClass('error-container').removeClass('loading')
                    return false;
                }
                if( !_.isEmpty(response.brandName)){
                    $activeNav = $('#navbar-content li[data-brand-name=' + response.brandName + ']');
                    $activeNav.addClass('active');
                }
                
                var template = Handlebars.templates['searchDetail.tmpl'];
                $elemId.removeClass('empty-container loading').html(template({
                    productAttributes : response.productAttributes,
                    // productDocuments : response.productDocuments,
                    productDocuments : mat.evenWithODDArrSort(response.productDocuments),
                    // displayBrandName : response.brandName,
                    productDocsHalf : (Math.ceil(Object.keys(response.productDocuments).length/2)-1),
                    productDocsSecondHalf : Math.ceil(Object.keys(response.productDocuments).length/2),
                    productDocsSecondHalfEnd : Object.keys(response.productDocuments).length,
                }));
                $('.toggle-accordion').click();
            })

        },
        searchBrandResults: function (id, queryString) {
            var isBrandResultPage = true;
            this.searchResults('brand=' + id + '&' + queryString,isBrandResultPage);
        },
        searchResults: function (urlString,isBrandResultPage) {
            var self = this;
            var urlStringObj = mat.parseQueryString(urlString); // convert url query string to json object.
            // query params are kept in cookie. Check and stop if not available.
            if ((!cookie.get('searchParams') || cookie.get('searchParams') == 'undefined') && !isBrandResultPage){
                 $("#search-result-table").addClass('error-container').removeClass('loading').html('');
                return;
            }  
            var queryString = !isBrandResultPage ? JSON.parse(cookie.getEscapeVal('searchParams')) : urlStringObj;
            if (urlStringObj.page) {
                queryString.page = urlStringObj.page;
            }

			var fullBrandName = queryString.brand;
            var getSubBrand = queryString.brand ? subBrandObj[queryString.brand] : {};
            var selectedRowVal = mat.page.selectedRowVal();
            var pageNo = queryString.page && parseInt(queryString.page);
            var firstIndex = selectedRowVal * (pageNo - 1);
            var lastIndex = selectedRowVal * pageNo;
            var displayBrandName = subBrandObj[queryString.brand].displayName;

            var $activeNav = $('#navbar-content li[data-brand-name=' + queryString.brand + ']');
            $activeNav.addClass('active');

            queryString.lastIndex = firstIndex || 0;
            queryString.recordsCount = selectedRowVal || 10;
            queryString.subBrand = getSubBrand.subBrand;
            queryString.brand = getSubBrand.brand;

            var queryParams = "<span>"+displayBrandName+"</span><span>"+(queryString.projectYear || '')+"</span><span>"+(queryString.projectNumber || '')+"</span><span>"+(queryString.productNumber || '')+"</span><span>"+(queryString.assortmentNumber || '')+"</span><span>"+(queryString.category || '')+"</span><span>"+(queryString.team || '')+"</span><span>"+(queryString.source || '')+"</span><span>"+(queryString.projectDescription || '' )+"</span><span>"+(queryString.productDescription || '')+"</span>";
        
            mat.requestAPICall({ type: 'post', methodName: 'getSearchResults', body: queryString }, function (response) {
                self.bindSearchResult(response, pageNo, selectedRowVal,queryParams);
            })
        }
    }),
    init : function(page){
        mat.page = page;
        mat.helperFunction();
        this.route = new this.Router();
        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start({
            pushState: true,
            root: '/'
        });
    }
}
    mattelSite.router = router;
}(mattelSite,mattelSite.pagination,mattelSite.cookie,mattelSite.getSubBrands));