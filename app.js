var hogan = require("hogan.js");
var md_parser = require("node-markdown").Markdown;
var fs = require('fs');

// n.b this function is syncronious - *will block*
function parseMD(path) {
	var html = "";

	var files = fs.readdirSync(path).filter(function(file) { 
	    	return (file.substr(-3) == '.md'); 
		});

	for(var i=0; i < files.length; i++)
	{	
		var fileData = fs.readFileSync(path + files[i], 'utf8');
		html = html + '\n<hr />\n' + md_parser(fileData);
	}

	return html
}

var html = parseMD('docs/');

var template = fs.readFileSync('template.tmpl', 'utf8');
 
// compile template
var compiled = hogan.compile(template);
var result = compiled.render({md_content: html});

fs.writeFile("static/docs.html", result, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
