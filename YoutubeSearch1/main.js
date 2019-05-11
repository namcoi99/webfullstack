var key;
var pagetoken;
var enableLoad = true;
// $("#search").on("submit",function(event){
//     event.preventDefault();
//     key = $("#keyword").val();
//     $(":text").val("");
//     $.ajax({
//         url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
//         type: "GET",
//         success: function(data){
//             //console.log(data);
//             pagetoken = data.nextPageToken;
//             // console.log(pagetoken);
//             $("#result-list").empty();
//             data.items.forEach(function(value){
//                 $("#result-list").append(`
//                 <a class="result col-md-12" href="https://youtube.com/watch?v=${value.id.videoId}?autoreplay=true" target="_blank">
//                 <img src="${value.snippet.thumbnails.high.url}" alt="">
//                 <div class="video_info">
//                     <h2 class="title">${value.snippet.title}</h2>
//                     <p class="description">${value.snippet.description}</p>
//                     <span>View >></span>
//                 </div>
//             </a>`)
//             })
//         },
//         error: function(error){
//           console.log(error);
//         }
//       })
//   })

  $(window).scroll( function(event){
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
	if (enableLoad && pagetoken && (scrollHeight - scrollPosition) <400 ){
        console.log(pagetoken);
        enableLoad = false;
       $.ajax({
            url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pagetoken}`,
            type: "GET",
            success: function(subdata){
            subdata.items.forEach(function(subvalue){
                $("#result-list").append(`
                <a class="result col-md-12" href="https://youtube.com/watch?v=${subvalue.id.videoId}?autoreplay=true" target="_blank">
                <img src="${subvalue.snippet.thumbnails.high.url}" alt="">
                <div class="video_info">
                    <h2 class="title">${subvalue.snippet.title}</h2>
                    <p class="description">${subvalue.snippet.description}</p>
                    <span>View >></span>
                </div>
            </a>`)
            })
            enableLoad = true;
            pagetoken = subdata.nextPageToken;
        },
        error:function(error){
            console.log(error);
        }
    })
    }
  })

let debounce;

$("#keyword").on("input",function(){
    console.log("input");
    if(debounce){
        clearTimeout(debounce);
    }
    debounce = setTimeout(function(){
            key = $("#keyword").val();
            $(":text").val("");
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${key}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                type: "GET",
                success: function(data){
                    //console.log(data);
                    pagetoken = data.nextPageToken;
                    // console.log(pagetoken);
                    $("#result-list").empty();
                    data.items.forEach(function(value){
                        $("#result-list").append(`
                        <a class="result col-md-12" href="https://youtube.com/watch?v=${value.id.videoId}?autoreplay=true" target="_blank">
                        <img src="${value.snippet.thumbnails.high.url}" alt="">
                        <div class="video_info">
                            <h2 class="title">${value.snippet.title}</h2>
                            <p class="description">${value.snippet.description}</p>
                            <span>View >></span>
                        </div>
                    </a>`)
                    })
                },
                error: function(error){
                  console.log(error);
                }
              })
    },500);
})