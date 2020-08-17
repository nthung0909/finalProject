tinymce.init({
    selector: '#tinymce',
    plugins: 'media image a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable',
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    height: 600,
});

function get_editor_content() {
    // Get the HTML contents of the currently active editor
    console.debug(tinyMCE.activeEditor.getContent());
    //method1 getting the content of the active editor
    alert(tinyMCE.activeEditor.getContent());
    //method2 getting the content by id of a particular textarea
    alert(tinyMCE.get('myarea1').getContent());
}