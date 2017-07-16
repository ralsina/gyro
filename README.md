# Gyro
How easy to run can a wiki be? Let's see.


## How to try it

Easiest way: `fades -r requirements.txt gyro.py`

Not so easy way: create a virtualenv manually, install dependencies from `requirements.txt`, run `gyro.py` with Python3

![alt text](http://ralsina.me/images/gyro-1.png)

### Docker

1. Build the image

  ```
  docker build -t gyro .
  ```
  
2. Run the image

  ```
  docker run -p 80:80 gyro
  ```

## Credits

All licenses for software shipped as part of Gyro are kept in licenses/ but here's a shorter version.

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
