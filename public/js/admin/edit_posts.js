function removeTag(event) {
    console.log(event);
    var tag = event.innerText;
    tag = tag.replace(' ', '');
    tag = tag.substr(1);
    console.log(tag.length);
    var postsID = $('#postsID').val();
    postsID = JSON.stringify(postsID);
    tag = JSON.stringify(tag);
    $.ajax({
        type: "POST",
        url: "/admin/posts/removetag",
        dataType: "json",
        jsonpCallback: 'callback',
        data: {
            tagID: tag,
            postID: postsID
        },
        succes: () => {
            event.parentNode.removeChild(event);
        },
        error: () => {
            alert("Có lỗi xảy ra, xin thử lại sau");
        }
    });
}

function addTag() {
    var tagID = $('addtag').val;
    tagID = tagID.replace(" ", "");
    tagID = tagID.replace("#", "");
    console.log("tag add: ", tagID);
    var postID = $('#postsID').val();
    postID = JSON.stringify(postID);
    tagID = JSON.stringify(tagID);
    if (tagID.length > 0)
        $.ajax({
            type: "POST",
            url: "/admin/posts/addtag",
            dataType: "json",
            jsonpCallback: 'callback',
            data: {
                tagID,
                postsID
            },
            succes: () => {
                var node = document.createElement('button');
                node.addEventListener("onClick", removeTag)
                node.appendChild(node);
                var tags = document.getElementsByTagName('tag_list');
                tags.appendChild(node);
            },
            error: () => {
                alert("Có lỗi xảy ra, xin thử lại sau");
            }
        });
}