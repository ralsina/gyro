var extensions = function () {
    var WikiWords = {
        type: 'lang',
        regex: /(\b[A-Z][a-z]+[A-Z][A-Za-z]*\b)/,
        replace: '<a href="$1">$1</a>'
    };
    return [WikiWords]
}

converter = new showdown.Converter({
    extensions: [extensions]
})

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#editButton').addEventListener('click', function () {
        $("#editModal").modal("show")
    });
    document.querySelector('#settingsButton').addEventListener('click', function () {
        $("#settingsModal").modal("show")
    });

    // Configurable font handling
    function setFont(font) {
        if (!font || font == '') {
            font = localStorage.getItem('_prefs:font')
        }
        if (font && font !='null') {
            $('body')[0].style.fontFamily = font;
            localStorage.setItem('_prefs:font', font)
        }
    }

    $('#fontSelector').fontselect().change(function () {
        // replace + signs with spaces for css
        var font = $(this).val().replace(/\+/g, ' ');
        setFont(font)
    });

    setFont()

    /* When a theme-change item is selected, update theme */
    jQuery(function ($) {
        $('body').on('click', '.change-style-menu-item', function () {
            var theme_name = $(this).attr('rel');
            var theme = "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/" + theme_name + "/bootstrap.min.css";
            set_theme(theme);
        });
    });

    function set_theme(theme) {
        if (!theme || theme == 'null') {
            theme = localStorage.getItem('_prefs:theme')
        }
        if (theme && theme != 'null') {
            $('link[title="bootstrap"]').attr('href', theme);
            localStorage.setItem('_prefs:theme', theme)
        }
    }
    set_theme()

    document.querySelector('#newPageButton').addEventListener('click', function () {
        $('#newPageName').val('')
        $("#newPageModal").modal("show")
    });
    document.querySelector('#helpButton').addEventListener('click', function () {
        $.ajax({
            url: help_path,
            dataType: "text",
            success: function (text) {
                html = converter.makeHtml(text)
                $('#helpContent').html(html)
                $('#helpToc').html('')
                $("#helpModal").modal("show")
                var $helpNav = $('#helpToc');
                Toc.init($helpNav);
                $('#helpContent').scrollspy({
                    target: '#helpToc'
                })

                // For some reason, this also shows in the TOC headers from outside help
                // So clean that crap out
                $('#helpToc a').each(function (i) {
                    if ($('#helpContent ' + this.hash).length == 0) {
                        this.style.display = 'none'
                    }
                })
            }
        })
    });
    $('#newPageModal').on('shown.bs.modal', function () {
        $('#newPageName').focus();
    })
    document.querySelector('#saveButton').addEventListener('click', save);
    document.querySelector('#deletePageButton').addEventListener('click', deletePage);
    document.querySelector('#createPageButton').addEventListener('click', function newPage() {
        $("#newPageModal").modal("hide")
        window.location.hash = '#/' + $('#newPageName').val()
        // This would not be needed, but the modal is still 
        // "visible" when the hash change event is processed
        // so we need to force the load
        load()
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

    // Max height for the editor and help widgets
    // FIXME: 40em is bogus
    $('div.CodeMirror-scroll').height('40em')
    $('div#helpContent').height('40em')

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

    // Open a new page on hash changes
    $(window).bind('hashchange', function () {
        // If we are showing a modal, don't jump to a separate page
        if (!$('#editModal').is(':visible') &&
            !$('#helpModal').is(':visible') &&
            !$('#newPageModal').is(':visible')) {
            load()
        } else {
            // When a modal is shown, keep the hash fixed to the wiki page
            window.location.hash = q
        }
    });

    $('#search_input').keyup(function (e) {
        if (e.keyCode == 13) {
            search()
        }
    });
    if (window.location.hash == '') {
        window.location.hash = '#/index'
        load()
    }
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
    $("#settingsModal").modal("hide")
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
    path.split('/').forEach(function (crumb) {
        if (ac) {
            ac = ac + '/'
        }
        ac = ac + crumb
        $('ol#crumbs').append('<li class="breadcrumb-item"><a href="#/' + ac + '">' + crumb + '</a>')
    })
}