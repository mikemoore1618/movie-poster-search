require('dotenv').config();

const
  express = require('express'),
  app = express(),
  axios = require('axios'),
  PORT = 3000

//builds an object that can make http requests from inside out code
const apiClient = axios.create()

app.use(express.static('public'));

//get route for "/search/:term" which will:
//contact the OMDB api (user the OMDB documentation), searching for whatever the user included in their request as :term
//when the results get returned to your app, go through the results and send the user an HTML string of <img> tags of all the movie posters for the search results.
//By the end, the user should be able to navigate to localhost:3000/search/terminator from their browser, and see all of the movie posters for the search results.
app.get('/', (req, res) => {
    console.log(process.env.API_KEY)
    const apiUrl = `http://omdbapi.com/?apikey=${process.env.API_KEY}&s=star_wars`

    apiClient({ method: 'get', url: apiUrl }).then((apiResponse) => {

        res.send(`<img src=${apiResponse.data.Search[0].Poster}>`)


        // let results = ''
        // apiResponse.data.data.forEach((r) => {
        //     const imgUrl = r.images.original.url
        //     results += `<img src="${imgUrl}">`
        // })
        // res.send(results)
    })
})
// app.get('/', (req,res) => {
//     res.sendFile(__dirname+'/views/index.html');
// })


app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT} :)`)
  });