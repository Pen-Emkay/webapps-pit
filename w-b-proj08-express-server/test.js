let express = require("express")
let serverApp = express()
serverApp.use(express.urlencoded({ extended: false }))

serverApp.get("/", function(req, res) {
    res.send(`
    <h3>The home page</h3>
    <form action="/answer" method="POST">
    <p>What's the color of sky?</p>
    <input type="text" name="bodyColor" autoComplete="off"/>
    <button>Submit</button>
    </form>
    `)
})

serverApp.post("/answer", function(req, res) {
    if (req.body.bodyColor.trim().toUpperCase() == "BLUE") {
        res.send("<p>Correct!</p>")

    } else {
        res.send("<p>Wrong!</p>")
    }
})
serverApp.listen(3000)