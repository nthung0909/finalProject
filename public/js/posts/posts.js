function sendComment() {
    var comment = document.forms['commentForm']['comment'].value;
    for (let i = 0; i < comment.length; i++) {
        if (comment[i] === ' ') {
            comment = comment.substr(1);
            i--;
        } else
            break;
    }
    if (comment.length === 0) {
        return false;
    }
    cmt = JSON.stringify(comment);
    $.ajax({
        type: "POST",
        url: "/posts",
        dataType: "json",
        jsonpCallback: 'callback',
        data: {
            comment: cmt
        },
        success: function(data) {
            console.log(data);
            document.forms['commentForm']['comment'].value = '';
            var comments = document.getElementsByClassName("comment");
            var node = document.createElement('div');
            node.setAttribute('class', 'row');
            node.innerHTML =
                `<div class="col-lg-1 col-md-2 col-sm-2 p-0">
                                <img src="` + data.avatar + `"class="avatarUS" alt="">
                            </div>
                            <div class="col-lg-11 col-md-10 col-sm-10 mb-3">
                                ` + data.fullname + `
                                <br>` + comment +
                `</div>`;
            comments[0].appendChild(node);
        },
        error: function() {
            console.log("error");
        }

    });
}