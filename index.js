Crawler = require("crawler");
var url = require('url'), 
    fs = require('fs');


var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
    }
});

c.queue([{
    uri: 'http://minhaclaro.claro.com.br/portal/site/MinhaClaro/RedirectBL/ConsultaConsumo',
    jQuery: true,

    // The global callback won't be called
    callback: function (error, result, $) {
	var textConteudo = $('#conteudo').text() + ' --------- ';

	fs = require('fs');
	fs.writeFile('claroConsumo.txt', textConteudo, function (err) {
  		if (err) return console.log(err);
  	});

        //console.log('Grabbed', textConteudo, 'bytes');
    }
}]);

