converter = new showdown.Converter()
converter = new showdown.Converter()

function load() {
    q = window.location.hash
    if (!q || q == '') {
        q = '#Index'
    }
    q = q.toLowerCase().slice(1, 9999)

    $.ajax({
        url: q,
        dataType: "text",
        success: function (text) {
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
                this.href = '#' + s[s.length - 1]
            })
        }
    });
}


function save() {
    $.post(q, {
        markdown: simplemde.value(),
    }, function (data) {
        load();
    })
}

$('#search_input').keyup(function (e) {
    if (e.keyCode == 13) {
        search()
    }
});

$.getJSON('/_index.js', {}, function (data) {
    idx = lunr(function () {
        this.ref('name')
        this.field('text')

        data.forEach(function (doc) {
            this.add(doc)
        }, this)
    })
})

function editPage() {
    $("#editModal").modal("show")
}

function search() {
    $("#searchModal").modal("show")
    var results = idx.search($('#search_input').val())
    var container = $('#searchResults')
    container.text('')
    results.forEach(function (result) {
        container.append('<li><a href="' + result.ref + '">' + result.ref + '</a>')
    })
}

function newPage(){
    $("#newPageModal").modal("show")
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#editButton').addEventListener('click', editPage);
    document.querySelector('#newPageButton').addEventListener('click', newPage);
    document.querySelector('#saveButton').addEventListener('click', save);
    simplemde = new SimpleMDE({
        element: $("#editor")[0],
        autofocus: true,
        hideIcons: ['fullscreen', 'side-by-side']
    });
    load();
    $(window).bind('hashchange', load);
});