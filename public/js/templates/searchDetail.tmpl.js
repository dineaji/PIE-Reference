(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['searchDetail.tmpl'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                   "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.assortmentNumber : stack1), depth0))
    + " <span>/</span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <span class=\"value\">Yes</span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <span class=\"value\">No</span>\r\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,"==||",(data && data.index),0,(data && data.index),(depths[1] != null ? depths[1].productDocsSecondHalf : depths[1]),{"name":"ifCond","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    \r\n            <div class=\"card\">\r\n                <div class=\"card-header\" role=\"tab\">\r\n                    <h5 class=\"mb-0\">\r\n                        <a data-toggle=\"collapse\" href=\"#collapse"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" aria-expanded=\""
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\" aria-controls=\"collapse"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\r\n                            <span class=\"accordion-icon\"></span>\r\n                            "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\r\n                        </a>\r\n                    </h5>\r\n                </div>\r\n                \r\n                <div id=\"collapse"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" class=\"collapse "
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\" role=\"tabpanel\">\r\n                    <ul class=\"card-block\">\r\n"
    + ((stack1 = helpers.each.call(alias1,blockParams[0][0],{"name":"each","hash":{},"fn":container.program(16, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n            </div>\r\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,"==||",(data && data.index),(depths[1] != null ? depths[1].productDocsHalf : depths[1]),(data && data.index),(depths[1] != null ? depths[1].productDocsSecondHalfEnd : depths[1]),{"name":"ifCond","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"col-md-6\">  \r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "true";
},"12":function(container,depth0,helpers,partials,data) {
    return "false";
},"14":function(container,depth0,helpers,partials,data) {
    return "show";
},"16":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                            <li>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1["0"] : stack1)) != null ? stack1.libraryVal : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams),"inverse":container.program(19, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                                <ul "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = blockParams[0][0]) != null ? stack1["1"] : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = helpers.each.call(alias1,blockParams[0][0],{"name":"each","hash":{},"fn":container.program(23, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</ul>\r\n                            </li>\r\n";
},"17":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=container.escapeExpression;

  return "                            <a href=\""
    + alias1(container.lambda(((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1["0"] : stack1)) != null ? stack1.libraryVal : stack1), depth0))
    + "\" target=\"_blank\">"
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "</a>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            "
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    return " class=\"document-lists\" ";
},"23":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[0][0]) != null ? stack1.title : stack1),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                                ";
},"24":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.escapeExpression, alias2=container.lambda;

  return "                                        <li><a target=\"_blank\" class=\""
    + alias1((helpers.titleFormat || (depth0 && depth0.titleFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[1][0]) != null ? stack1.title : stack1),{"name":"titleFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "\" href=\"//pie2vault/"
    + alias1(alias2(((stack1 = blockParams[1][0]) != null ? stack1.value : stack1), depth0))
    + "\">"
    + alias1(alias2(((stack1 = blockParams[1][0]) != null ? stack1.title : stack1), depth0))
    + "</a> <span>"
    + alias1(alias2(((stack1 = blockParams[1][0]) != null ? stack1.lstupdt_date : stack1), depth0))
    + "</span></li>\r\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "            </div>               \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div id=\"product-attributes\">\r\n    <h2>Product Attributes</h2>\r\n    <div class=\"attributes-container\">\r\n        <ul class=\"attributes-lists\">\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Asst/Toy</span>\r\n                <span class=\"value\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.assortmentNumber : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.productNumber : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Description</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.productDescription : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Product Type</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.productType : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Legal Approved</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.teamProductLegal : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Dash Code</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.dashCode : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">MFG Classic</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.mfgClassification : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Eng Type</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.engineeringType : stack1), depth0))
    + "</span>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"attributes-lists\">\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Product Complexity</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectComplexity : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Project Year</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectYear : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Project Number</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectNumber : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Project Status</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectStatus : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Project Priority</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectPriority : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Slot #</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.slotNumber : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">Drop Date</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.dropDate : stack1), depth0))
    + "</span>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"attributes-lists\">\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L1</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl1 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L2</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl2 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L3</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl3 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L4</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl4 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L5</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl5 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L6</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl6 : stack1), depth0))
    + "</span>\r\n            </li>\r\n            <li class=\"key-value-pair\">\r\n                <span class=\"key\">GRS L7</span>\r\n                <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.grsl7 : stack1), depth0))
    + "</span>\r\n            </li>\r\n        </ul>\r\n       <div class=\"key-value-pair\">\r\n            <span class=\"key\">Sub/Team/Cat</span>\r\n            <span class=\"value\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.subbrand : stack1), depth0))
    + " / "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.team : stack1), depth0))
    + " / "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"pie-documents\">\r\n    <h2>PIE Documents</h2>\r\n    <a href=\"javascript:void(0)\" class=\"toggle-accordion\" accordion-id=\"#documents-container\"></a>\r\n    <div class=\"documents-container row\" id=\"documents-container\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.productDocuments : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n\r\n<div id=\"external-links\">\r\n    <h2>External Links</h2>\r\n    <table class=\"table table-striped\" style=\"border: 1px solid #eceeef;\">\r\n        <tbody>\r\n            <tr>\r\n                <td>\r\n                    <a href=\"http://gcs/Reports/ProjectReports/ProjectOnePageReport.aspx?Project="
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectNumber : stack1), depth0))
    + "&noteProject=Project&noteNextsteps=NextSteps&notePlant=Plant&noteQA=QA\" target=\"_blank\">\r\n                        <img src=\"\\./images/externallink.png\" alt=\"\"> One-Page Report</a> \r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                    <a href=\"http://gcs/Reports/ProjectReports/MfgTwoPageReport.aspx?Project="
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectNumber : stack1), depth0))
    + "&noteProject=Project&noteSchedule=Schedule&noteNextsteps=NextSteps&notePlant=Plant&noteQA=QA\" target=\"_blank\">\r\n                        <img src=\"\\./images/externallink.png\" alt=\"\"> Mfg Two Page</a>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                    <a href=\"http://gcs/Reports/scheduledetail.aspx?Project="
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.productAttributes : depth0)) != null ? stack1.projectNumber : stack1), depth0))
    + "\" target=\"_blank\">\r\n                        <img src=\"\\./images/externallink.png\" alt=\"\"> Full Schedule </a>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n";
},"useData":true,"useDepths":true,"useBlockParams":true});
})();