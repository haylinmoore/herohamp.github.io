# (Ab)Using Caddy Rewrites and Filters

### Why is Caddy?

Caddy, is in my opinion one of the best if not the best web-server for plug and play hosting. The configuration files are simple and intuitive to use, with most site deploys being less than 7 lines. Caddy also includes auto SSL using Let's Encrypt. This makes Caddy a perfect fit for my ideal stack, a perfect stack just works and lets me easily deploy sites in less than a minute.

### Theming My Website Using Caddy Rewrites

<h4>THE RECENT CADDY UPDATE TO 1.0.0 HAS BROKEN FILTER, SO I NO LONGER USE THIS, THEME IS NOW CHOSEN BASED ON THE EPOCH AND RUN USING CSS VARIABLES</h4>

Recently I have wanted to add theming to my website and decided I should finally get around to doing it. When I started looking at the different ways I could do it, nothing was of my liking. I took a look at both changing CSS Variables and switching out the href in link tags, but I did not want the theme be applied after the website first loading, causing a weird flicker between themes. Then I had the idea of having the server send different CSS files to the user based on a cookie. After a quick glance at the Caddy docs, I saw how easy this would be to implement. For each theme I just need a block of Caddy configuration code like this.

```text
rewrite {
	if_op and
	if {~color} is purple
	if {file} is main.css
	to /styles/purple.css
}
```

All this does is check the cookie, color, to see if it is "purple" and if the current file being accessed is main.css if so it rewrites to purple.css. This means that the client gets the theme that they have selected, without having to use Javascript to change CSS Variables, or href tags. Since I use SASS to create all of my CSS files generating each of these CSS files is a simple task.

### Changing The Cookie

Since the theming is done based on cookies I needed a way to control cookies and change them. For this I wrote a short javascript snippet. Which just detects the users current theme, so that themes can be cycled through, then adds on event listener for my changeTheme button, which just cycles to the next theme and reloads the page.

```javascript
var themes = ["", "purple", "light"];
var colorIndex = themes.indexOf(
	("; " + document.cookie)
		.split("; color=")
		.pop()
		.split(";")
		.shift()
);

document.getElementById("changeTheme").addEventListener("click", function() {
	colorIndex++;
	colorIndex = colorIndex % themes.length;
	var e = new Date();
	e.setDate(e.getDate() + 365);
	document.cookie = "color=" + themes[colorIndex] + ";expires=" + e.toUTCString() + ";path=/;";
	document.location.reload(true);
});
```

### Caching

There was one issue with this _perfect_ solution, browsers were caching the CSS file meaning that even after the cookie was changed nothing changed as they never pinged my server. To fix this I simply had Caddy send do not cache headers on the theming CSS files. Caddy's rewrite system is run before headers are applied which is why it tells the user not to cache ANY css file in /styles/. This then meant vendor files were not being cached so I enabled caching for vendor files, by setting cache-control to a blank string.

```text
header /styles/ Cache-Control "no-cache, no-store, must-revalidate"
header /styles/vendor Cache-Control ""
```

### Maintaining Two Websites With The Time Of One

Recently a friend of mine got the domain https://is-dummy-thi.cc. He offered me a subdomain, from ther https://hampton.is-dummy-thi.cc was born. I wanted it to be a rethemed version of my site, but as stated when I was talking about my perfect stack I like for things to be easy to deploy and just work and managing two versions of my site just for a meme would not have been fun. Looking at the Caddy rewrites I had discovered before I was easily able to retheme the site using a even less Caddy code.

```text
rewrite /styles/main.css /styles/dummythicc.css
```

but this meant my site still had the "Change Theme" button which had to go as I only wanted it to have one theme, this is when I discovered Caddy filters. These let me on the fly edit any pages on my website as they were being sent to the viewer. I setup a filter for the UI element for Changing Theme and just replaced it with a blank string. After that I switched out all instances of Hampton Moore, with "Mr Hampton Dummy Thicc". This meant I could now run the joke website, without the hassle of maintaining two different websites

```text
filter rule {
	content_type text/html.*
	search_pattern "<li><a href=\"#\" id=\"changeTheme\">Change Theme</a></li>"
	replacement ""
}

filter rule {
	content_type text/html.*
	search_pattern "Hampton Moore"
	replacement "Mr. Hampton Dummy Thicc"
}
```
