const express = require("express")
const app = express()
const path= require("path") 
////
app.use(express.urlencoded({extended:false}))
app.use(getWeather)
app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())
////
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

function getWeather(req, res, next){
   req.visitorWeather=true 
    next()
}
app.get('/', getWeather, (req, res) => {
    res.render("home",{isRaining:req.visitorWeather,
        pets: [
            { name: "Meowsalot", species: "cat" },
            { name: "Barksalot", species: "dog" }
          ]
    })
})

app.post("/result",(req, res)=>{
    res.send(`Your favourite color is ${req.body.color.trim().toUpperCase()}`)
})

app.get('/about', (req, res) => {
    res.send("Thanks for learning more about us.")
})

app.get('/api/pets', (req, res)=>{
    res.json([
        { name: "Meowsalot", species: "cat" },
        { name: "Barksalot", species: "dog" }
      ])
})

app.get("/api/animal/:name", (req, res) => {
    if (req.params.name === "meowsalot") {
      res.json({ name: "Meowsalot", species: "cat", "photo": "https://learnwebcode.github.io/json-example/images/cat-1.jpg", bio: "This cat is great and very vocal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque." })
    } else if (req.params.name === "barksalot") {
      res.json({ name: "Barksalot", species: "dog", "photo": "https://learnwebcode.github.io/json-example/images/dog-1.jpg", bio: "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit." })
    } else if (req.params.name === "purrsloud") {
      res.json({ name: "Purrsloud", species: "cat", "photo": "https://learnwebcode.github.io/json-example/images/cat-2.jpg", bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum." })
    } else {
      res.json("Animal not found.")
    }
  })

  app.post("/api/secret", (req, res) => {
    if (req.body.username === "johndoe" && req.body.password === "qwerty") {
      res.json("You have secret access for us to tell you that 2 + 2 is 4.")
    } else {
      res.json("That is incorrect.")
    }
  })


app.listen(3000)