// Imports and variable assignment
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongojs = require('mongojs');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var collections = ['Monsters'];
var collections2 = ['Users'];

var username = process.argv.length === 4 ? process.argv[2] : '';
var password = process.argv.length === 4 ? process.argv[3] : '';
var uri = 'mongodb://' + username + ':' + password + '@ds013206.mlab.com:13206/pad'
var db = mongojs(uri, collections);
var db2 = mongojs(uri, collections2);

var App = function() {
  // Scope
  var self = this;

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  self.setupVariables = function() {
    self.ipaddr = process.env.IP || "0.0.0.0";
    self.port = process.env.PORT || 3000

    /*if (typeof self.ipaddr === "undefined") {
        console.warn('No IP environment variable');
        self.ipaddress = "127.0.0.1";
    }*/
  };

  /**
   *  Populate the cache.
   */
  self.populateCache = function() {
    if (typeof self.zcache === "undefined") {
      self.zcache = { 'index.html': '' };
    }
    
    // Local cache for static content.
    self.zcache['index.html'] = fs.readFileSync('./client/index.html');
    self.zcache['dictionary.txt'] = fs.readFileSync('./dictionary.txt');
  };
  
  /**
   *  Retrieve entry (content) from cache.
   *  @param {string} key   Key identifying content to retrieve from cache.
   */
  self.cache_get = function(key) { return self.zcache[key]; };
  
  /**
   *  terminator === the termination handler
   *  Terminate server on receipt of the specified signal.
   *  @param {string} sig   Signal to terminate signal on
   */
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating sample app ...', 
                  Date(Date.now()), sig);
      process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
  };
  
  /**
   * 
   */
  self.setupTerminationHandlers = function() {
    // Process on exit and signals.
    process.on('exit', function() { self.terminator(); });
    
    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSER2', 'SIGTERM'
    ].forEach(function(element, index, array) {
      process.on(element, function() { self.terminator(element); })
    });
  }
  
  // Creating routing table entries + handlers for the application
  self.routes = {};
  
  /**
   *  Default Route. Loads the index.html
   *  Type: GET
   *  Data: None
   *  Response: HTML → index.html
   */
  self.routes['/'] = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(self.cache_get('index.html'));
    
    //var link = "http://www.wallpaperup.com/uploads/wallpapers/2014/09/25/455895/big_thumb_6b2d7a6264cc4b37209fc5e560e3ebe0.jpg";
    //res.send("<html><body><img style='width:100%;' src='" + link + "'></body></html>");
  };
  
  /**
   *  ___
   *  Type: ___
   *  Data: ___
   *  Response: ___
   */
  self.routes['/dictionary.txt'] = function(req, res) {
    res.send(self.cache_get('dictionary.txt'));
  };
  
  /**
   *  ___
   *  Type: ___
   *  Data: ___
   *  Response: ___
   */
  self.routes['/setupMonsterCollection'] = function(req, res) {
    console.log(req);
    res.send(req);
  };
  
  /**
   *  ___
   *  Type: ___
   *  Data: ___
   *  Response: ___
   */
  self.routes['/getMonster'] = function(req, res) {
    res.send(req);
    console.log(req.body);
    db.Monsters.findOne({id: req.param('MID')}, function(err, Monsters) {
      if (err || !Monsters) {
        res.status(500).send('Monster not found');          
      } else {
        res.send(Monsters);
      }
    });
  };
  
  // Assigning express to the app
  self.app = express();
  
  // Allowing server to access request data
  self.app.use(express.bodyParser());
  
  // Serving static files
  //self.app.use(express.static(path.resolve(__dirname, 'client')));
  self.app.use('/js', express.static(__dirname+'/client/js'));
  self.app.use('/css', express.static(__dirname+'/client/css'));
  self.app.use('/img', express.static(__dirname+'/client/img'));
  //self.app.use('/fonts', express.static(__dirname+'/client/fonts'));
  
  // Allowing cross-domain ajax calls
  self.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  // Register the handlers
  self.app.get('/', self.routes['/']);
  self.app.get('/dictionary.txt', self.routes['/dictionary.txt']);
  self.app.get('/setupMonsterCollection', self.routes['/setupMonsterCollection']);
  
  /**
   *  Start the server
   */
  self.start = function() {
    // Start the app on the specific interface (and port).
    self.app.listen(self.port, self.ipaddr, function() {
      console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
    });
  };
};

var PADapp = new App();
PADapp.setupVariables();
PADapp.populateCache();
PADapp.setupTerminationHandlers();
PADapp.start();