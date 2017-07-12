const params = new URLSearchParams(location.search);
q = params.get('q')
if (!q || q == '') {
    q = 'Index'
}

var text = localStorage.getItem(q)
if (!text) {
    text = 'No content yet';
}
var converter = new showdown.Converter()
html = converter.makeHtml(text)
$('#content').html(html)
simplemde = new SimpleMDE({
    element: $("#editor")[0],
    autofocus: true,
    hideIcons: ['fullscreen', 'side-by-side']
});
simplemde.value(text)

function save() {
    localStorage.setItem(q, simplemde.value());
    $('#content').html(converter.makeHtml(simplemde.value()))
}

$('#search_input').keyup(function (e) {
    if (e.keyCode == 13) {
        search()
    }
});


function editPage() {
    $("#editModal").modal("show")
}

function search() {
    idx = lunr(function() {
        this.ref('name')
        this.field('text')
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            k = localStorage.key(i)
            v =  localStorage.getItem(k)
            this.add({name:k, text:v})
        }
    })
    $("#searchModal").modal("show")
    var results = idx.search($('#search_input').val())
    var container = $('#searchResults')
    container.text('')
    results.forEach(function (result) {
        container.append('<li><a href="' + result.ref + '">' + result.ref + '</a>')
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#editButton').addEventListener('click', editPage);
    document.querySelector('#saveButton').addEventListener('click', save);
});