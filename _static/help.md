# Intro

Gyro! is a personal Wiki. You can use it as a general note-taking app.

It's available in several different flavours:

* Client-server
* Chrome extension
* Desktop app

In all cases it should behave the same.

The basic concept is that you have as many pages as you want, with whatever content you want. Each page is identified by a *path* such as "/index" or "/expenses/may".

The content in the pages is written in a language called "Markdown", which aims to be simple to learn and can be easily converted to HTML or other formats you may find useful.

# Creating Pages

<button type="button" class="btn btn-info" aria-label="New Page"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button>

To create a new page, click on that button and write what the path of the new page is. Alternatively, if you create a link to a page that doesn't exist, you can follow that link and open the page. Then, if you put content there, it's created.

# Editing Pages

<button type="button" class="btn btn-info" aria-label="Edit Page"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>


## Markdown Syntax

Something like this [markdown reference](http://commonmark.org/help/) and [tutorial](http://commonmark.org/help/tutorial/)

# Keyboard Shortcuts

* To start searching, press "/"
* For help, press "?"
* To edit the current page, press "e"


# About Gyro

MIT License

Copyright (c) 2017 Roberto Alsina

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

All licenses for software shipped as part of Gyro are kept in [licenses](https://github.com/ralsina/gyro/tree/master/licenses) but here's a shorter version.

* The UI uses [Twitter Bootstrap](http://getbootstrap.com/), [LICENSE](https://github.com/twbs/bootstrap/blob/master/LICENSE)
* The editor is [SimpleMDE](https://github.com/sparksuite/simplemde-markdown-editor), [LICENSE](https://github.com/sparksuite/simplemde-markdown-editor/blob/master/LICENSE)
* To display Markdown, Gyro uses [Showdown](https://github.com/showdownjs/showdown), [LICENSE](https://github.com/showdownjs/showdown/blob/master/license.txt)
* For searching, Gyro uses [Lunr](https://lunrjs.com), [LICENSE](https://github.com/olivernn/lunr.js/blob/master/LICENSE)
* Icon made by [Retinaicons](http://www.flaticon.com/authors/retinaicons) from www.flaticon.com
* Autocomplete via [jQuery-autoComplete](https://github.com/Pixabay/jQuery-autoComplete), [LICENSE](http://www.opensource.org/licenses/mit-license.php)
* Table of Contents via [Bootstrap-Toc](https://github.com/afeld/bootstrap-toc), [LICENSE](https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md)
* Zip file support using [JSKit](https://stuk.github.io/jszip/), [LICENSE](https://github.com/Stuk/jszip/blob/master/LICENSE.markdown)
* Font selection using [JQuery fontselect](https://github.com/tommoor/fontselect-jquery-plugin), [LICENSE](http://en.wikipedia.org/wiki/MIT_License)
* Theme selector from a blog post by [Will Dietz](https://wdtz.org/bootswatch-theme-selector.html)