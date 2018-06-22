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
app.get('/search/:term', (req, res) => {
    console.log(process.env.API_KEY)
    const apiUrl = `http://omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.params.term}`

    apiClient({ method: 'get', url: apiUrl }).then((apiResponse) => {
        let results = ''
        apiResponse.data.Search.forEach((r) => {
            const imgUrl = r.Poster
            results += `<img src="${imgUrl}">`
        })
        res.send(results)
    })
});

app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT} :)`)
  });