var http = require('http')
var url = require('url')

function parseOS (string) { 
    var startCut = 0
    var endCut = 0
    for (var i = 0; i < string.length; i++) {
        if (string[i] == "(") {
            
            startCut = i + 1
        }
        
        if (string[i] == ")")  {
            endCut = i
            return string.substring(startCut, endCut)
        }
    
    }
    
    if (startCut == 0 && endCut == 0) return "null"    
}






var server = http.createServer(function (req, res) {
    
    var headerparseJSON = {
        'ipaddress': req.headers['x-forwarded-for'],
        'language': req.headers['accept-language'],
        'software': parseOS(req.headers['user-agent'])
        
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(headerparseJSON))
    

})

server.listen(process.env.PORT || 8080)