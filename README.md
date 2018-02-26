# Couscous Mintlook

![](https://static.mo-mar.de/couscous-mintlook-mockup.jpg)

[Live Example](https://moqmar.github.io/shell-setup/)

## Features

- Search function
- Language selection
- Pagination (previous/next)
- Syntax highlighting
- Customizable sidebar and footer
- Configurable accent color

## Usage

To use the template, set it up in your `couscous.yml` configuration file:

```yaml
template:
    url: https://github.com/moqmar/mintlook-couscous
```

You should also add the file [`404.md`](https://github.com/moqmar/mintlook-couscous/blob/master/404.md) to your documentation and configure your webserver to point to `/404.html` on missing pages.

A file `icon.png` in the project root (`baseUrl`) will be used as a favicon.

## Configuration
```yaml
title: Couscous # Page Title
logo: https://cdn0.iconfinder.com/data/icons/ie_Shine/128/shine_19.png # Icon URL
color: "#d21"   # Accent color

languages: ["en", "de"] # List of supported languages. Comment out to disable language selection.
defaultLanguage: world  # Default language icon, and the value of the html lang attribute. It is recommended to set this even (especially) if you're not using language selection.

search: true # Enable search
scripts:
    after:
        - php .couscous/generated/.scripts/generate-search-index.php # Required for search
        - rm -rf .couscous/generated/.scripts # Clean up unneccessary files

sidebar:
    - title: About mintlook
    - subtitle: Links
    - text: Homepage
      link: https://moqmar.github.io/mintlook # absolute link
    - text: Mintlook and Couscous
      page: / # relative link
    - line: true
    - html: |
            <p>Follow us on <a href="">Facebook</a>, <a href="">Twitter</a>, and other <a href="">social networks</a>.</p>
# you can also define the sidebar per language
sidebar:
  de:
    - title: Über mintlook
  default: # fallback for all other languages
    - title: About mintlook

footer: |
    Hello <strong>World</strong>
# you can also define the footer per language
footer: # fallback for all other languages
  de: Hallo <strong>Welt</strong>
  default: Hello <strong>World</strong>
```

### Language selection
If the `languages` configuration option is set, you should have a directory structure in the form of `/<language>/<...>`, with the pages in the `defaultLanguage` located at just `/<...>` - e.g. **/de/something.html** for the german version and **/something.html** for the english version.

Setting the `defaultLanguage` to `world`, enforces the `/<language>/<...>` structure for all sites, and shows a world map instead of a flag for the language selection on pages not adhering to that structure.

You can also override the displayed language for a single file using the `pageLanguage` metadata field.

If you want to automatically go to the user's browser language, you can use the following `index.html` file in your repository:

```html
<!doctype html>
<!-- default language -->
<meta http-equiv="refresh" content="1; URL=en/">
<!-- browser language -->
<script>
var supportedLanguages = ["en", "de"]; // Should be the same as in couscous.yml
for (var i in navigator.languages) if (supportedLanguages.indexOf(navigator.languages[i]) > -1) {
    location.replace(navigator.languages[i] + "/"); break;
}
</script>
```

### Document metadata
```yaml
noIndex: false              # if true, the document will be excluded from search index

description: A page.        # description as shown in search, also used for metaDescription if not explicitly set
metaDescription: A page.    # description as used for the <meta name="description"> content

pageLanguage: en            # language of the page

prev: /page-before.md       # previous page if pagination is used
prevTitle: The Page Before  # title of previous page (default would be "page-before" here)

next: /test/example.md      # next page if pagination is used
nextTitle: An example page  # title of next page (default would be "example" here)
```

## License
```
MIT License

Copyright (c) 2018 Moritz Marquardt

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
```
