$(document).ready(function(){
    var apikey = "c678cacdd32f44eb8d1e22498cf8fa93";
    var baseQuery = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    baseQuery += "api-key=" + apikey;

    $("#search").on("click", function(event){
        event.preventDefault();
        var q = $("#query").val();
        $("#result").empty();
        if(q.length != 0){
            var numberSearches = $("#number").val();
            queryString = baseQuery + "&q=" + q;
            var begin = $("#begin").val();
            var end = $("#end").val();
            
            if(begin.length == 4 && end.length == 4){
                begin += "0101";
                end  += "1231";
                queryString += "&begin_date=" + begin + "&end_date=" + end;
                
            }
            $.ajax({
                method: "GET",
                url: queryString
            }).done(function(response){
                var hits = parseInt(response.response.meta.hits);
                var articles = response.response.docs;
                if(hits>=numberSearches){
                    if(numberSearches>10){
                        for(var i = 0; i < 10; i++){
                            var article = articles[i];
                            $("#result").append("<h2>"+article.headline.main+"</h2>");
                        }
                        $.ajax({
                            method: "GET",
                            url: queryString + "&page=1"
                        }).done(function(response){
                            var articles = response.response.docs;
                            for(var j = 0; j < 5; j++){
                               var article = articles[j];
                               $("#result").append("<h2>"+article.headline.main+"</h2>");
                            }
                        });
                    }else{
                        for(var i = 0; i < numberSearches; i++){
                            var article = articles[i];
                            $("#result").append("<h2>"+article.headline.main+"</h2>");
                        }
                    }
                }else{
                    
                    if(hits>10){
                        for(var i = 0; i < 10; i++){
                            var article = articles[i];
                            $("#result").append("<h2>"+article.headline.main+"</h2>");
                        }
                        $.ajax({
                            method: "GET",
                            url: queryString + "&page=1"
                        }).done(function(response){
                            var articles = response.response.docs;
                            for(var j = 0; j < hits-10; j++){
                                var article = articles[j];
                                $("#result").append("<h2>"+article.headline.main+"</h2>");
                            }
                        });
                    }else{
                        for(var i = 0; i < hits; i++){
                            var article = articles[i];
                            $("#result").append("<h2>"+article.headline.main+"</h2>");
                        }
                    }
                }
            });
        }
    });
    
});