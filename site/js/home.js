var posts = "json/posts.json";

function CarregaPosts() {
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
    posts = json;
    postsPublicar = posts.posts;

    $.each(postsPublicar, function(i, item) {        
        console.log(item.titulo);
        post = "<div class='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>"
              +"    <h2 class='post-title'>"
              +     item.titulo
              +"    </h2>"
              +"    <h3 class='post-subtitle'>"
              +     item.subtitulo
              +"    </h3>"
              +"    <p>"+item.conteudo+"</p>"
              +"</div>";

        $('article .posts').append(post);
    });
}



$(document).ready(function(){
    CarregaPosts();
});