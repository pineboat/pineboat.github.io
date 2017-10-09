+++
author = "vijayabharathib"
date = "2017-11-08T10:30:07+05:30"
publishdate = "2017-11-08T10:30:07+05:30"
subtitle = ""
tags = []
title = "scary d3 courageous dimple"
draft=true
+++

## Add a title to your chart

credit;
https://stackoverflow.com/questions/25416063/title-for-charts-and-axes-in-dimple-js-charts

1. Create a text element
2. Set x coordinates
3. Set y coordinates
4. Set style
5. Append text to chart / svg

```js
svg.append("text")
   .attr("x", c._xPixels() + c._widthPixels() / 2)
   .attr("y", c._yPixels() - 20)
   .style("text-anchor", "middle")
   .style("font-family", "sans-serif")
   .style("font-weight", "bold")
   .text("Chart title");
```
