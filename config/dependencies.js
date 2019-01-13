module.exports = {
  'Server': {
    'class': './components/server.js',
    'args': [
      'IndexRouter',
      'UserRouter',
      'ItemRouter'
    ]
  },
  'IndexRouter': {
    'class': './routers/index.js',
    'args': ['IndexController', 'Auth']
  },
  'IndexController': {
    'class': './controllers/index.js',
    'args': ['Mysql', 'Auth']
  },
  'UserRouter': {
    'class': './routers/user.js',
    'args': ['UserControllet', 'Auth']
  },
  'UserControllet': {
    'class': './controllers/user.js',
    'args': ['Mysql']
  },
  'ItemRouter': {
    'class': './routers/item.js',
    'args': ['ItemController', 'Auth']
  },
  'ItemController': {
    'class': './controllers/item.js',
    'args': ['Mysql', 'Image']
  },
  'Mysql': {
    'class': './components/mysql.js',
    'args': []
  },
  'Auth': {
    'class': './components/auth.js',
    'args': []
  },
  'Image': {
    'class': './components/awesomeImageStorage.js',
    'args': ['GridFS']
  },
  'Mongo': {
    'class': './components/mongodb.js',
    'args': []
  },
  'GridFS': {
    'class': './components/gridfs.js',
    'args': ['Mongo']
  }
};