// Add Buttons
var topicsArr = ["arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", "travel", "upshot", "us", "world"];
var abstractArr = [];
var titleArr = [];
var linkArr = [];
//buttons appear on page load

function showButtons() {
    $("#button-bar").empty();
    for (var i = 0; i < topicsArr.length; i++) {
        var button = $("<button>");
        button.attr("data-element", topicsArr[i]);
        button.attr("id", "topic-button");
        button.attr("class", "btn btn-outline-primary")
        button.text(topicsArr[i]);
        $("#button-bar").append(button);
    };
};

// query for NYT API

$(document).on("click", "#topic-button", function() {
    var apiKey = "UA8uSAgssGj8XdWmpw2aN3UOEEBviYiJ";
    var topic = $(this).attr("data-element");
    var queryNYT = "https://api.nytimes.com/svc/topstories/v2/" + topic + ".json?api-key=" + apiKey;

    console.log();    

    $.ajax({
        url: queryNYT,
        method: "GET"
    }).then(function(response){
        console.log("NYT API worked");
        

        abstractArr = [];
        titleArr = [];
        linkArr = [];
        $("tbody tr").remove();
    
        for (const item in response.results) {
            abstractArr.push(response.results[item].abstract);
            titleArr.push(response.results[item].title);
            linkArr.push(response.results[item].url);
        }
    
        console.log(abstractArr, titleArr, linkArr);
        

        // Twinword Sentiment Analysis API
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
                "x-rapidapi-key": "ee17b152f8msh2255cbce79fae02p1d4262jsn63775420543c",
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                // Give this value of information from NYT API
                "text": ""
            }
        }
        // Call Twinword API for every string sent to it
        for(var i = 0; i < abstractArr.length; i++){
            settings.data.text = abstractArr[i];
            $.ajax(settings).done(function (response) {
                // Extract positive, neutral, negative string to add too emotion coloumn
                var sentimentAnalysis = response.type;
                // feed GIPHY API response.type string
                // have GIPHY shown on the columns

                addItems(arr1, sentimentAnalysis, arr3)
            });
        }


    });
    
});



// add Articles to DOM
// function addItems(NYTAbstract, SentimentAnalysis, GiphyLink) {
    
    var tRow = $("<tr>");
    var articleTd = $("<td>").text(array[i]);
    var emotionTd = $("<td>").text(SentimentAnalysis);
    // var giphyTd = $("<td>");
    
    tRow.append(articleTd, emotionTd, giphyTd);
    
    $("tbody").append(tRow);
}


//Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
var data = null;

function getGiphy() = {}

    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("Here");
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].images.downsized_large.url);
    }
});

showButtons();