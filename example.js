Crawler = require("crawler");
var url = require('url');

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

// Queue just one URL, with default callback
c.queue('http://joshfire.com');

//Queue a list of URLs
c.queue(['http://jamendo.com/','http://tedxparis.com']);

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'http://minhaclaro.claro.com.br/portal/site/MinhaClaro/RedirectBL/ConsultaConsumo',
    jQuery: true,

    // The global callback won't be called
    callback: function (error, result, $) {
        var textConteudo = $('#conteudo').text();
        console.log('Grabbed', textConteudo, 'bytes');
    }
}]);
    
// Queue using a function
var googleSearch = function(search) {
  return 'http://www.google.fr/search?q=' + search;
};
