# Simple Flow
A jQuery plugin that connects different Bootstrap columns to create a simple flow.

## Quick start
Link jQuery:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```
Link Bootstrap CSS:
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
```
Link Simple Flow CSS:
```
<link rel="stylesheet" type="text/css" href="css/simple-flow.min.css">
```
Link Simple Flow JS:
```
<script src="src/js/simple-flow.min.js"></script>
```
Example HTML:
```
<section class="container canvas">
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4">
      <div class="object"></div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <div class="object"></div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <div class="object"></div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <div class="object"></div>
    </div>
  </div>
</section>
```
Example usage:
```
<script type="text/javascript">
  $(function() {
    var settings = {
      lineWidth: 2,
      lineSpacerWidth: 15,
      lineColour: '#91acb3',
      canvasElm: '.canvas'
    }
    $('.object').SimpleFlow(settings);
  })
</script>
```
## API
The below are the default settings:
```
lineWidth: 2,           // the width of the connector line
lineSpacerWidth: 15,    // the width of the space at the end of the line
lineColour: '#91acb3',  // the colour of the line
canvasElm: '.canvas'    // the name of the canvas element
```

## Demos
There's a demo provided in the demo directory, an example can also be found on Code Pen at https://codepen.io/tdsymonds/pen/aEaMpp.
