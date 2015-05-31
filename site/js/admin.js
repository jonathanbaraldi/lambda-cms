var posts = "json/posts.json";

function CarregarPosts() {

    $.ajax({
        url : posts,
        type: 'GET',
        contentType : "application/json; charset=utf-8",
        dataType : "json",
        processdata : true,
        success : function(json) {
            MontaPosts(json);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    });    
}

function MontaPosts(json) {
    console.log(json);
    postsText = JSON.stringify(json.posts, undefined, 4);    
    $('textarea#posts').html(postsText);
}

function PublicaPosts() {
    ak = $('input#ak').val();
    sk = $('input#sk').val();

    if (ak!==""&&sk!=="") {

        $('input#ak').removeClass('required');
        $('input#sk').removeClass('required');

        // Chamar a função do lambda para enviar
        posts = $('textarea#posts').val();
        posts = JSON.parse(posts);
        posts = {
                    'posts' : posts    
                };
        posts = JSON.stringify(posts);  

        AWS.config.credentials = { 
            "accessKeyId": ak,
            "secretAccessKey": sk
        };

        AWS.config.region = 'us-east-1';
        var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
        var params = {
          FunctionName: 'lambdaCMS',
          InvokeArgs : posts
        };
        lambda.invokeAsync(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                alert("Post publicado com sucesso!");
                console.log(data);
            }   
        });        
    } else {

        $('input#ak').addClass('required');
        $('input#sk').addClass('required');
    }
}

$(document).ready(function(){
    CarregarPosts();

    $('button.publicar').click(function(){
        PublicaPosts();
    });

});