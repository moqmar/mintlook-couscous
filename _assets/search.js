function search(self) {
    if (search.working) { search.queue = true; return; }

    if (self) search.form = self;
    search.working = true;
    if (!search.engine) {
        fetch(search.form.getAttribute("data-baseurl") + "/search-index.json").then(function(r) { return r.json() }).then(function(data) {
            search.engine = new JsSearch.Search("url");
            search.engine.addIndex("title");
            search.engine.addIndex("description");
            search.engine.addIndex("content");

            search.engine.addDocuments(data);

            search.working = false;
            search.queue = false;
            search();
        })
        return;
    }

    var result = search.engine.search(search.form.getElementsByClassName("search-query")[0].value);
    search.result = result; // For debugging purposes
    
    var output = "";

    for (var i = 0; i < result.length; i++) {
        var el = document.createElement("a");
        el.href = search.form.getAttribute("data-baseurl") + result[i].url;
        
        var title = document.createElement("strong");
        title.textContent = result[i].title;

        var match = document.createElement("small");
        match.innerHTML = result[i].description ||
            (result[i].content.substr(0, 250).trim()
            .replace(/\n+/g, "<br>")
            .replace(/((?:(?:(?!<br>)(?:.|\n))+<br>){5})(?:.|\n)*/, "$1").replace(/<br>$/, "") + "…");

        el.appendChild(title);
        el.appendChild(match);

        output += el.outerHTML;
    }

    search.form.nextElementSibling.innerHTML = output;

    search.working = false;
    if (search.queue) search();
}

window.addEventListener("mousedown", function(event) {
    if (!event.target.P(".search")) document.getElementsByClassName("results")[0].innerHTML = "";
});
