
      var channelName = "TechGuyWeb";
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
$(document).ready(function(){
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response) {
    //     console.log(response);
    //   });

    $.get("https://www.googleapis.com/youtube/v3/channels",{
        part: "snippet,contentDetails",
        forUsername: channelName,
        key: "AIzaSyDDjAtFUlvDYNDJyzf_aok7-rHVSDKRd60"},
        function(data){
            $.each(data.items, function(i,item){
                console.log(item);
                cid = item.id;//
                vid=item.contentDetails.relatedPlaylists.uploads;
                getVid(cid);
                //console.log("ghabl az farakhani");
               // showVid(cid);
                //console.log("bad az farakhani");
            })
        }
    );
    
    function getVid(cid){
        console.log(cid);
        $.get("https://www.googleapis.com/youtube/v3/playlists",{
        part: "snippet,contentDetails",
        maxResults: 10,
        //playlistId : pid,
        channelId: cid,//"UC29ju8bIPH5as8OGnQzwJyA",
        key: "AIzaSyDDjAtFUlvDYNDJyzf_aok7-rHVSDKRd60"},
        function(data){
            $.each(data.items, function(i,item){
                console.log(item);
                videTitle = item.snippet.title;
                playlistid=item.id;
                getVideo(playlistid);
                output="<li>"+videTitle+"</li>";
                $("#results").append(output);
            })
        }
    );
    }

    function getVideo(playlistid){
        console.log("playlistid"+playlistid);
        $.get("https://www.googleapis.com/youtube/v3/playlistItems",{
            part: "snippet,contentDetails",
            playlistId: playlistid,
            key: "AIzaSyDDjAtFUlvDYNDJyzf_aok7-rHVSDKRd60"},
            function(data){
                $.each(data.items, function(i,item){
                    console.log(item);
                    vid=item.contentDetails.videoId;
                    showVideo(vid);
                })
            }
        );
    }

    function showVideo(vid){
        console.log("vid"+vid);
        $.get("https://www.googleapis.com/youtube/v3/videos",{
            part: "snippet,contentDetails,statistics,player",
            id: vid,
            key: "AIzaSyDDjAtFUlvDYNDJyzf_aok7-rHVSDKRd60"},
            function(data){
                $.each(data.items, function(i,item){
                    console.log(item);
                    var newLi=$("<li>");
                    newLi.append(item.player.embedHtml);
                    $("#results").append(newLi);
                    // vid=item.contentDetails.videoId;
                    // showVideo(vid);
                })
            }
        );
    }
});