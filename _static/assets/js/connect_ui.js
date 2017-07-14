document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#editButton').addEventListener('click', function () {
        $("#editModal").modal("show")
    });

    document.querySelector('#newPageButton').addEventListener('click', function () {
        $('#newPageName').val('')
        $("#newPageModal").modal("show")
    });
    $('#newPageModal').on('shown.bs.modal', function () {
        $('#newPageName').focus();
    })
    document.querySelector('#saveButton').addEventListener('click', save);
    document.querySelector('#deletePageButton').addEventListener('click', deletePage);
    document.querySelector('#createPageButton').addEventListener('click', function newPage() {
        $("#newPageModal").modal("hide")
        window.location.hash = '#' + $('#newPageName').val()
    });
    $('#search_input').autoComplete({
        source: titleSuggestions
    })
    $('#newPageName').autoComplete({
        source: titleSuggestions
    })
    simplemde = new SimpleMDE({
        element: $("#editor")[0],
        autofocus: true,
        hideIcons: ['fullscreen', 'side-by-side']
    });

    // Avoid "empty editor until you click" bug
    $('#editModal').on('shown.bs.modal', function () {
        simplemde.codemirror.refresh()
    })

    $(document).keypress(function (e) {
        focused = document.activeElement
        // Don't switch focus when in textarea or input widgets
        if ($('input, textarea').index(focused) == -1) {

            if (e.which === 47) {
                // "/" shortcut to search
                $('#search_input').focus()
                return false
            } else if (e.which === 101) {
                // "e" shortcut to edit
                $("#editModal").modal("show")
                return false
            }
        }
    });

    load();
    $(window).bind('hashchange', load);
    $('#search_input').keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    });
});

function actual_load(text) {
    if (!text) {
        text = 'No content yet';
    }
    html = converter.makeHtml(text)
    $('#content').html(html)
    simplemde.value(text)
    $("#editModal").modal("hide")
    $("#searchModal").modal("hide")
    $('#search_input').val('')

    // Fix links in content to point to the right place
    $('div#content a').each(function (index) {
        if (this.protocol == window.location.protocol && this.host == window.location.host) {
            // This is inside gyro
            href = this.getAttribute('href') // This is the actual href in the tag, not the resolved one
            if (!href.startsWith('/')) {
                // Relative URL inside gyro
                base = window.location.hash.slice(1, 999)
                if (!base.startsWith('/')) {
                    base = '/' + base
                }
                relative = href
                var stack = base.split("/"),
                    parts = relative.split("/");
                stack.pop(); // remove current file name (or empty string)
                // (omit if "base" is the current folder without trailing slash)
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i] == ".")
                        continue;
                    if (parts[i] == "..")
                        stack.pop();
                    else
                        stack.push(parts[i]);
                }
                href = stack.join("/");
            }
            this.href = window.location.href.split('#')[0] + '#' + href
        } else {
            // outside gyro
            this.target = '_blank'
        }
    })

    // Set crumbs
    ac = ''
    $('ol#crumbs').text('')
    path = q
    if (path.startsWith('/') && !path.startsWith('/index')) {
        path = 'index' + path
    }
    path.split('/').forEach(function (crumb) {
        if (ac) {
            ac = ac + '/'
        }
        ac = ac + crumb
        $('ol#crumbs').append('<li class="breadcrumb-item"><a href="#' + ac + '">' + crumb + '</a>')
    })
}