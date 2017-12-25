const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/Users/welab/Desktop/wufang/wf/src/assets/jsonserver/db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp({name: 'hello'})
// })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

router.render = (req, res) => {
  res.jsonp({
  	code: 1,
  	message: '数据错误',
    data: res.locals.data
  })
}

// In this example we simulate a server side error response

// router.render = (req, res) => {
//   res.status(500).jsonp({
//     error: "error message here"
//   })
// }

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  "/*/total" : "/total",
  "/menus/query" : "/menus?_embed=children",
  "/*/**" : "/$1",
  "/info*" : "/users/5?_embed=rights"
}))

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

