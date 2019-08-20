(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['searchResults.tmpl'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <tr>\r\n"
    + ((stack1 = (helpers.isProjectAlreadyBinded || (depth0 && depth0.isProjectAlreadyBinded) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.projectNumber : depth0),{"name":"isProjectAlreadyBinded","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "    </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <td align=\"center\"><a href=\""
    + alias2(alias1((depths[1] != null ? depths[1].baseHref : depths[1]), depth0))
    + "/"
    + alias2(alias1((depth0 != null ? depth0.projectNumber : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.projectNumber : depth0), depth0))
    + "</a></td>\r\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.projectDescription : depth0), depth0))
    + "</td>\r\n            <td align=\"center\">"
    + alias2(alias1((depth0 != null ? depth0.projectStatus : depth0), depth0))
    + "</td>\r\n            <td align=\"center\" style=\"font-weight:bold;\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.toynumber : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</td>\r\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.productDescription : depth0), depth0))
    + "</td>\r\n            <td align=\"center\">"
    + alias2(alias1((depth0 != null ? depth0.projectYear : depth0), depth0))
    + "</td>\r\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.team : depth0), depth0))
    + "</td>\r\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.category : depth0), depth0))
    + "</td>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.toynumber : depth0), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.primarytoynumber : depth0), depth0));
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td align=\"center\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.toynumber : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\r\n            <td>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.productDescription : depth0), depth0))
    + "</td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();