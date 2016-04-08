//Call needed libraries
var http = require('http')
var url = require('url')

//Function for finding the OS portion of the HTTP header
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





//Initialize Server
var server = http.createServer(function (req, res) {
    
//Create empy JSON object for header objects    
    var headerparseJSON = {
        'ipaddress': req.headers['x-forwarded-for'],
        'language': req.headers['accept-language'],
        'software': parseOS(req.headers['user-agent'])
        
    }
//Return a response with a success code and JSON string
    res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(headerparseJSON))
    

})

//Start the server
server.listen(process.env.PORT || 8080)