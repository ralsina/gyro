converter = new showdown.Converter()

function load() {
    q = window.location.hash
    if (!q || q == '') {
        q = '#Index'
    }
    q = q.toLowerCase()

    var text = localStorage.getItem(q)
    if (!text) {
        text = 'No content yet';
    }
    html = converter.makeHtml(text)
    $('#content').html(html)
    simplemde.value(text)
    $("#editModal").modal("hide")
    $("#searchModal").modal("hide")

    // Fix links in content to point to the right place
    $('div#content a').each(function (index) {
        s = this.href.split('/')
        this.href = '#' + s [s.length - 1]
    })

}

function save() {
    var text = simplemde.value()
    localStorage.setItem(q, text);
    load();
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
    idx = lunr(function () {
        this.ref('name')
        this.field('text')
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            k = localStorage.key(i)
            v = localStorage.getItem(k)
            this.add({ name: k, text: v })
        }
    })
    $("#searchModal").modal("show")
    var results = idx.search($('#search_input').val())
    var container = $('#searchResults')
    container.text('')
    results.forEach(function (result) {
        container.append('<li><a href=index.html' + result.ref + '">' + result.ref.slice(1, 9999) + '</a>')
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#editButton').addEventListener('click', editPage);
    document.querySelector('#saveButton').addEventListener('click', save);
    simplemde = new SimpleMDE({
        element: $("#editor")[0],
        autofocus: true,
        hideIcons: ['fullscreen', 'side-by-side']
    });
    load();
    $(window).bind('hashchange', load);
});