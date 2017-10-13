$(document).ready(function() {
  $("button").on("click", function() {
    $.ajax({
      url:
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $("#quote-title").text(post.title);
        $("#quote-content").html(post.content);
        //implementing into twitter.
        content = $("#quote-content").text();
        $("#tweet-quote")
          .attr("href", "https://twitter.com/intent/tweet?text=" + content)
          .attr("target", "_blank");
        // If the Source is available, use it. Otherwise hide it.
        if (
          typeof post.custom_meta !== "undefined" &&
          typeof post.custom_meta.Source !== "undefined"
        ) {
          $("#quote-source").html("Source: " + post.custom_meta.Source);
        } else {
          $("#quote-source").text("");
        }
        // Animating the box
        var el = $("#main-box");
        curHeight = el.height();
        autoHeight = el.css("height", "auto").height();
        el.height(curHeight).animate({ height: autoHeight }, 300);
      },
      cache: false
    });
  });
});