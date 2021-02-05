# Update your package.json scripts
"start-js": "react-scripts start",
"start": "gulp styles && npm-run-all -p start-js",
"build": "gulp styles && react-scripts build",
"test": "react-scripts test --env=jsdom",
"mocha": "mocha --recursive ./src/components/**/*.mocha.js",
"eject": "react-scripts eject",
"deploy": "gulp styles && gulp dato && react-scripts build && now --alias <% siteName %>",
"surge": "gulp styles && react-scripts build && surge build/ <% siteName %>.surge.sh"

### If Dato

"dump": "./node_modules/.bin/dato dump"

# Meta tags to add

```html
<meta content="IE=edge" http-equiv="X-UA-Compatible">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title><%= siteName %></title>
<meta property="og:title" content="<%= siteName %>"/>

<meta name="description" content="<%= siteDescription %>">
<meta property="og:description" content="<%= siteDescription %>" />

<meta property="og:url" content="http://google.com.au" />

<meta property="og:image" content="http://placehold.it/1200/630" />

<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta property="og:site_name" content="<%= siteName %>"/>
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="http://placehold.it/1200/630" />
```

# Analytics

```html
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', '<%= gaID %>', 'auto');
  ga('send', 'pageview');
</script>
```
