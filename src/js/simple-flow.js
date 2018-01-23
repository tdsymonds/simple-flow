;( function( $, window, document, undefined ) {
    "use strict";

    var pluginName = "SimpleFlow",
        defaults = {
            lineWidth: 2,
            lineSpacerWidth: 15,
            lineColour: '#91acb3',
            canvasElm: '.canvas'
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend( Plugin.prototype, {
        init: function() {
            this.drawLines();

            var that = this;

            // need to redraw after resize ends otherwise it can
            // happen too quickly
            $(window).resize(function() {
               if(this.resizeTO) clearTimeout(this.resizeTO);
               this.resizeTO = setTimeout(function() {
                   $(this).trigger('resizeEnd');
               }, 250);
            });

            $(window).bind('resizeEnd', function() {
               that.drawLines();
            });
        },

        drawLines: function() {
            // remove old svgs
            $(this.canvasElm + 'svg.simple-flow-line').remove();

            var $elements = $(this.element);

            for (var i = 0; i < $elements.length; i++){
                var thisElm =  $elements.eq(i),
                    nextElm = $elements.eq(i+1);
                this.drawLine(thisElm, nextElm);
            };
        },

        drawLine: function(thisElm, nextElm){
            var thisElmParent = thisElm.parent(),
                nextElmParent = nextElm.parent();

            // only continue if there's a next element.
            if (typeof nextElm.position() !== 'undefined') {
                // calculate all of the positions relative to the two objects
                var thisElmMiddle = thisElm.outerHeight(true) / 2,
                    nextElmMiddle = nextElm.outerHeight(true) / 2;

                var thisElmY = thisElmMiddle + thisElmParent.position().top,
                    nextElmY = nextElmMiddle + nextElmParent.position().top;

                var thisParentPadding = (thisElmParent.outerWidth(true) - thisElmParent.width()) / 2,
                    nextParentPadding = (nextElmParent.outerWidth(true) - nextElmParent.width()) / 2;

                var thisRight = thisElmParent.position().left + thisElm.outerWidth(true) + thisParentPadding,
                    nextLeft = nextElmParent.position().left + nextParentPadding;

                var farLeftX = nextLeft - this.settings['lineSpacerWidth'],
                    farRightX = thisRight + this.settings['lineSpacerWidth'],
                    lineInBetweenY = (thisElmY + nextElmY) / 2;

                // if the object is on the same line, the the coords are different
                // to if they're on separate lines.
                if (thisElmY == nextElmY) {
                    // same row
                    var coords = thisRight + ',' + thisElmY + ' ' + nextLeft + ',' + nextElmY;

                } else {
                    // differernt rows
                    var coords = thisRight + ',' + thisElmY + ' ' + farRightX + ',' + thisElmY +
                        ' ' + farRightX + ',' + lineInBetweenY + ' ' + farLeftX + ',' +
                        lineInBetweenY + ' ' + farLeftX + ',' + nextElmY + ' ' + nextLeft +
                        ',' + nextElmY;
                }

                var uuid = this.getUuid();

                // create line svg
                var line = '<svg class="simple-flow-line">' +
                    '<defs>' +
                      '<marker id="arrowhead-' + uuid + '" viewBox="0 0 10 10" refX="8" refY="5"' +
                          'markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">' +
                        '<path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="' + this.settings['lineColour'] + '"/>' +
                      '</marker>' +
                    '</defs>' +
                    '<path d="M' + coords +
                      '"style="fill:none;stroke:' + this.settings['lineColour'] + ';stroke-width:' + this.settings['lineWidth'] +
                      ';marker-end:url(#arrowhead-' + uuid + ');" />' +
                    '</svg>';

                // append to canvas
                $(this.settings['canvasElm']).append(line);
            }
        },
        getUuid: function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    });

    $.fn[ pluginName ] = function( options ) {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
        }
    };

} )( jQuery, window, document );
