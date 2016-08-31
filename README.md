# hubski-markdown

Complete implementation of Hubski's markdown in javascript, based on markdown-it.

* Shit
* Yeah, it's shit
* It doesn't even do these lists
* One day

## Install

**node**

```
npm install hubski-markdown --save
```

**browser (CDN)**

* [unpkg CDN](https://unpkg.com/hubski-markdown@1.0.1)

## Usage

In the browser you can access it with ```hubskimd()```

``` javascript
var md = hubskimd();
var result = md.render('*this is actually italics*');
```

Otherwise, just require it like usual

``` javascript
var md = require('hubski-markdown')();
var result = md.render('+this is actually bold+');
