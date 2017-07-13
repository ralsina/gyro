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
        success: actual_load
    });
}


function save() {
    $.post(q, {
        markdown: simplemde.value(),
    }, function (data) {
        load();
    })
}

function deletePage() {
    $.ajax({
        url: q,
        type: 'DELETE',
        success: load
    });
}

function search() {
    $.getJSON('/_index.js', {}, function (data) {
        idx = lunr(function () {
            this.ref('name')
            this.field('text')
            this.field('name')
            data.forEach(function (doc) {
                this.add(doc)
            }, this)
        })
        $("#searchModal").modal("show")
        var results = idx.search($('#search_input').val())
        var container = $('#searchResults')
        container.text('')
        results.forEach(function (result) {
            container.append('<li><a href="#' + result.ref + '">' + result.ref + '</a>')
        })
    })
}

function titleSuggestions(term, suggest) {
    term = term.toLowerCase();
    $.ajax({
        url: '_title_list',
        dataType: "json",
        success: function (choices) {
            var matches = [];
            for (i = 0; i < choices.length; i++) {
                if (~choices[i].toLowerCase().indexOf(term)) {
                    matches.push(choices[i]);
                }
            }
            suggest(matches)
        }
    })
}
