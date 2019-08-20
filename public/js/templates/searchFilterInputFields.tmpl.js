(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['searchFilterInputFields.tmpl'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <option value=\""
    + alias2(alias1((depth0 != null ? depth0.ProjectYear : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.ProjectYear : depth0), depth0))
    + "</option> \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.Category : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.Category : depth0), depth0))
    + "</option>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.Team : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.Team : depth0), depth0))
    + "</option>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.sourceId : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.sourceDescription : depth0), depth0))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\" for=\"inlineFormCustomSelect\">Year</label>\r\n    <div class=\"col-sm-7\">\r\n        <select name=\"projectYear\" class=\"form-control\" id=\"inlineFormCustomSelect\">\r\n            <option selected=\"selected\" value=\"\">Choose Year</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.year : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\">Project Number</label>\r\n    <div class=\"col-sm-7\">\r\n        <input type=\"text\" name=\"projectNumber\" class=\"form-control\" maxlength=\"10\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\">Product Number</label>\r\n    <div class=\"col-sm-7\">\r\n        <input type=\"text\" name=\"productNumber\" class=\"form-control\" maxlength=\"5\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\">Assortment Number</label>\r\n    <div class=\"col-sm-7\">\r\n        <input type=\"text\" name=\"assortmentNumber\" class=\"form-control\" maxlength=\"5\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\" for=\"inlineFormCustomSelect\">Category</label>\r\n    <div class=\"col-sm-7\">\r\n        <select name=\"category\" class=\"form-control\" id=\"inlineFormCustomSelect\">\r\n            <option value=\"\"></option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.category : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\" for=\"inlineFormCustomSelect\">Team</label>\r\n    <div class=\"col-sm-7\">\r\n        <select name=\"team\" class=\"form-control\" id=\"inlineFormCustomSelect\">\r\n            <option value=\"\"></option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.team : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-sm-5 control-label\" for=\"inlineFormCustomSelect\">Source</label>\r\n    <div class=\"col-sm-7\">\r\n        <select name=\"source\" class=\"form-control\" id=\"inlineSourceCustomSelect\">\r\n            <option value=\"\"></option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"amount\" class=\"col-sm-5 control-label\">Project Description</label>\r\n    <div class=\"col-sm-7\">\r\n        <input type=\"text\" name=\"projectDescription\" class=\"form-control\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"amount\" class=\"col-sm-5 control-label\">Product Description</label>\r\n    <div class=\"col-sm-7\">\r\n        <input type=\"text\" name=\"productDescription\" class=\"form-control\">\r\n    </div>\r\n</div>\r\n<div class=\"form-check\">\r\n    <label class=\"form-check-label col-sm-5\">\r\n        <input class=\"form-check-input\" name=\"extendedsearch\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"true\"> Extended Search\r\n    </label>\r\n    <label class=\"form-check-label col-sm-5\">\r\n        <input class=\"form-check-input\" name=\"includedrops\" type=\"checkbox\" id=\"inlineCheckbox2\" value=\"true\">  Include Drops\r\n    </label>\r\n</div>";
},"useData":true});
})();