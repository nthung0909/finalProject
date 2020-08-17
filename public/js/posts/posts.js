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
    var postsID = document.forms['commentForm']['postsID'].value;
    cmt = JSON.stringify(comment);
    postsID = JSON.stringify(postsID);
    $.ajax({
        type: "POST",
        url: "/posts",
        dataType: "json",
        jsonpCallback: 'callback',
        data: {
            content: cmt,
            postID: postsID
        },
        success: function(data) {
            console.log(data);
            document.forms['commentForm']['comment'].value = '';
            var comments = document.getElementsByClassName("comment");
            var node = document.createElement('div');
            node.setAttribute('class', 'row');
            node.setAttribute('min-height', '18vh');
            node.innerHTML =
                `<div class="col-lg-1 col-md-2 col-sm-2 p-0">
                        <img src="` + data.avatar + `" class="avatarUS" alt="">
                    </div>
                    <div class="col-lg-11 col-md-10 col-sm-10 mb-3 pb-3 rounded" style="background-color: #eaecf4;">
                        <b>` + data.fullname + `</b>
                        <br><br>
                        ` + comment + `
                    </div>`;
            comments[0].appendChild(node);
        },
        error: function() {
            console.log("error");
        }

    });
}

function getQuery() {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var params = [];
    hashes.forEach(item => {
        let arr = item.split('=');
        let tmp = {};
        tmp[arr[0]] = arr[1];
        params.push(tmp);
    });
    return params;
}