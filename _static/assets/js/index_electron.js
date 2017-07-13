converter = new showdown.Converter()

function load() {
    q = window.location.hash
    if (!q || q == '') {
        q = '#Index'
    }
    q = q.toLowerCase().slice(1, 9999)

    var text = localStorage.getItem(q)
    actual_load(text)
}

function save() {
    var text = simplemde.value()
    localStorage.setItem(q, text)
    load()
}

function deletePage() {
    localStorage.removeItem(q)
    load()
}

function search() {
    idx = lunr(function () {
        this.ref('name')
        this.field('text')
        this.field('name')
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            k = localStorage.key(i)
            v = localStorage.getItem(k)
            this.add({ name: k, text: k })
        }
    })
    $("#searchModal").modal("show")
    var results = idx.search($('#search_input').val())
    var container = $('#searchResults')
    container.text('')
    results.forEach(function (result) {
        container.append('<li><a href="#' + result.ref + '">' + result.ref + '</a>')
    })
}

function titleSuggestions(term, suggest) {
    term = term.toLowerCase();
    choices = localStorage.keys
    var matches = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        if (~localStorage.key(i).toLowerCase().indexOf(term)) {
            matches.push(localStorage.key(i));
        }
    }
    suggest(matches)
}