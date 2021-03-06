Test.Modules.MANUAL = {
    'EVENTS - mousedown mouseup mouseover mouseout mousemove click dblclick / touchstart touchend touchmove tap dbltap': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.on('mousedown', function() {
            log('mousedown');
        });

        circle.on('mouseup', function() {
            log('mouseup');
        });

        circle.on('mouseover', function() {
            log('mouseover');
        });

        circle.on('mouseout', function() {
            log('mouseout');
        });

        circle.on('mousemove', function() {
            log('mousemove');
        });

        circle.on('click', function() {
            log('click');
        });

        circle.on('dblclick', function() {
            log('dblclick');
        });
        /*
         * mobile
         */
        circle.on('touchstart', function() {
            log('touchstart');
        });

        circle.on('touchend', function() {
            log('touchend');
        });

        circle.on('touchmove', function() {
            log('touchmove');
        });

        circle.on('tap', function(evt) {
            log('tap');
        });

        circle.on('dbltap', function() {
            log('dbltap');
        });

        layer.add(circle);
        stage.add(layer);
    },
    'TRANSITION - transition position and rotation': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 100,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            shadow: {
                color: 'black',
                offset: {
                    x: 10,
                    y: 10
                },
                alpha: 0.5
            }
        });

        layer.add(rect);
        stage.add(layer);

        rect.transitionTo({
            duration: 2,
            shadow: {
                offset: {
                    x: 80
                }
            },
            x: 400,
            y: 30,
            rotation: Math.PI * 2,
            easing: 'bounce-ease-out'
        });
    },
    'TRANSITION - all transition types': function(containerId) {
        document.getElementById(containerId).style.height = '300px';

        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 300
        });
        var layer = new Kinetic.Layer();

        var easings = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'back-ease-in', 'back-ease-out', 'back-ease-in-out', 'elastic-ease-in', 'elastic-ease-out', 'elastic-ease-in-out', 'bounce-ease-out', 'bounce-ease-in', 'bounce-ease-in-out', 'strong-ease-in', 'strong-ease-out', 'strong-ease-in-out'];
        for(var n = 0; n < easings.length; n++) {
            var rect = new Kinetic.Rect({
                x: 10,
                y: 10 + (n * 200 / easings.length),
                width: 100,
                height: 10,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 2
            });

            layer.add(rect);

            rect.transitionTo({
                duration: 2,
                width: 500,
                easing: easings[n]
            });
        }

        stage.add(layer);
    },
    'ANIMATION - start and stop animation': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);

        var amplitude = 150;
        var period = 1000;
        // in ms
        var centerX = stage.getWidth() / 2 - 100 / 2;

        var anim = new Kinetic.Animation(function(frame) {
                rect.attrs.x = amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX;
            }, layer);

        anim.start();

        setTimeout(function() {
            anim.stop();
        }, 3000);
    },
    '*ANIMATION - test multiple animations': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var greenRect = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        var blueRect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(greenRect);
        layer.add(blueRect);
        stage.add(layer);

        var amplitude = 150;
        var period = 1000;
        // in ms
        var centerX = stage.getWidth() / 2 - 100 / 2;

        var greenAnim = new Kinetic.Animation(function(frame) {
            greenRect.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
        }, layer);
        var blueAnim = new Kinetic.Animation(function(frame) {
            blueRect.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
        }, layer);

        greenAnim.start();

        setTimeout(function() {
            blueAnim.start();
        }, 1000);
        setTimeout(function() {
            greenAnim.stop();
        }, 2000);
        setTimeout(function() {
            blueAnim.stop();
        }, 3000);
        setTimeout(function() {
            greenAnim.start();
        }, 4000);
        setTimeout(function() {
            greenAnim.stop();
        }, 5000);

    },
    'TRANSITION - ease-in, ease-out, ease-in-out hovers': function(containerId) {
        function addHovers(shape, easing) {
            shape.on("mouseover", function() {
                this.transitionTo({
                    scale: {
                        x: 1.5,
                        y: 1.5
                    },
                    duration: 1,
                    easing: easing
                });
            });
            shape.on("mouseout", function() {
                this.transitionTo({
                    scale: {
                        x: 1,
                        y: 1
                    },
                    duration: 1,
                    easing: easing
                });
            });
        }

        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var greenBox = new Kinetic.Rect({
            x: 50,
            y: stage.getHeight() / 2 - 25,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            offset: {
                x: 50,
                y: 25
            }
        });

        var blueBox = new Kinetic.Rect({
            x: stage.getWidth() / 2 - 50,
            y: stage.getHeight() / 2 - 25,
            width: 100,
            height: 50,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4,
            offset: {
                x: 50,
                y: 25
            }
        });

        var redBox = new Kinetic.Rect({
            x: 428,
            y: stage.getHeight() / 2 - 25,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            offset: {
                x: 50,
                y: 25
            }
        });

        addHovers(greenBox, "ease-in");
        addHovers(blueBox, "ease-out");
        addHovers(redBox, "ease-in-out");

        layer.add(greenBox);
        layer.add(blueBox);
        layer.add(redBox);
        stage.add(layer);
    },
    'EVENTS - modify fill stroke and stroke width on hover with star': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var star = new Kinetic.Star({
            x: 200,
            y: 100,
            numPoints: 10,
            innerRadius: 40,
            outerRadius: 70,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar'
        });

        star.on('mouseover', function() {
            this.setFill('yellow');
            this.setStroke('purple');
            this.setStrokeWidth(20);
            layer.draw();
        });

        star.on('mouseout', function() {
            this.setFill('green');
            this.setStroke('blue');
            this.setStrokeWidth(5);
            layer.draw();
        });

        layer.add(star);
        stage.add(layer);
    },
    'EVENTS - modify fill stroke and stroke width on hover with image': function(containerId) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = new Kinetic.Stage({
                container: containerId,
                width: 578,
                height: 200
            });
            var layer = new Kinetic.Layer();
            var darth = new Kinetic.Image({
                x: 60,
                y: 60,
                image: imageObj
            });

            darth.on('mouseover', function() {
                this.setStroke('purple');
                this.setStrokeWidth(20);
                layer.draw();
            });

            darth.on('mouseout', function() {
                this.setStroke(null);
                this.setStrokeWidth(0);
                layer.draw();
            });

            layer.add(darth);
            stage.add(layer);
            
             //document.body.appendChild(layer.bufferCanvas.element)
        };
        imageObj.src = '../assets/darth-vader.jpg';
    },
    'EVENTS - star pixel detection': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });

        var layer = new Kinetic.Layer({
            rotationDeg: 20
        });
        var star = new Kinetic.Star({
            x: 200,
            y: 100,
            numPoints: 10,
            innerRadius: 40,
            outerRadius: 70,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 20,
            draggable: true
        });

        star.on('mouseover', function() {
            log('mouseover');
        });

        star.on('mouseout', function() {
            log('mouseout');
        });

        layer.add(star);
        stage.add(layer);

        showHit(layer);
    },
    'EVENTS - drag events click': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: 380,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        Circle.setDraggable(true);

        Circle.on('dragstart', function() {
            log('dragstart');
        });

        Circle.on('dragmove', function() {
            log('dragmove');
        });

        Circle.on('dragend', function() {
            log('dragend');
        });

        Circle.on('click', function() {
            log('click');
        });

        layer.add(Circle);
        stage.add(layer);
    },
    'EVENTS - move mouse from shape to another shape in same layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var redCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        redCircle.on('mouseover', function() {
            log('mouseover red Circle');
        });
        redCircle.on('mouseout', function() {
            log('mouseout red Circle');
        });
        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black'
        });

        greenCircle.on('mouseover', function() {
            log('mouseover green Circle');
        });
        greenCircle.on('mouseout', function() {
            log('mouseout green Circle');
        });

        layer.add(redCircle);
        layer.add(greenCircle);

        stage.add(layer);

        //greenCircle.hide();
        layer.draw();

        //document.body.appendChild(layer.bufferCanvas.element);
    },
    'EVENTS - move mouse from shape in one group to shape in another group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var redGroup = new Kinetic.Group();
        var greenGroup = new Kinetic.Group();

        var redCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        redCircle.on('mouseover', function() {
            log('mouseover red Circle');
        });
        redCircle.on('mouseout', function() {
            log('mouseout red Circle');
        });
        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black'
        });

        greenCircle.on('mouseover', function() {
            log('mouseover green Circle');
        });
        greenCircle.on('mouseout', function() {
            log('mouseout green Circle');
        });

        redGroup.add(redCircle);
        greenGroup.add(greenCircle);

        layer.add(redGroup);
        layer.add(greenGroup);

        stage.add(layer);
    },
    'EVENTS - move mouse from shape in one layer to shape in another layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var redLayer = new Kinetic.Layer();
        var greenLayer = new Kinetic.Layer();

        var redCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        redCircle.on('mouseover', function() {
            log('mouseover red Circle');
        });
        redCircle.on('mouseout', function() {
            log('mouseout red Circle');
        });
        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black'
        });

        greenCircle.on('mouseover', function() {
            log('mouseover green Circle');
        });
        greenCircle.on('mouseout', function() {
            log('mouseout green Circle');
        });

        redLayer.add(redCircle);
        greenLayer.add(greenCircle);

        stage.add(redLayer);
        stage.add(greenLayer);
    },
    'EVENTS - mousemove from shape in one group to shape in another group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var redGroup = new Kinetic.Group();
        var greenGroup = new Kinetic.Group();

        var redCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        redCircle.on('mousemove', function() {
            log('mousemove red Circle');
        });
        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black'
        });

        greenCircle.on('mousemove', function() {
            log('mousemove green Circle');
        });

        redGroup.add(redCircle);
        greenGroup.add(greenCircle);

        layer.add(redGroup);
        layer.add(greenGroup);

        stage.add(layer);
    },
    'EVENTS - group mousemove events': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        group.on('mousemove', function() {
            log('mousemove group');
            //console.log(this);
        });
        var redCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 80,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        var greenCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 40,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black'
        });

        group.add(redCircle);
        group.add(greenCircle);

        layer.add(group);
        stage.add(layer);
    },
    'EVENTS - cancel event bubbling (only the red Circle should fire click event)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        layer.on('click', function() {
            log('click layer');
            //console.log(this);
        });
        group.on('click', function() {
            log('click group');
            //console.log(this);
        });
        var redCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 80,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black'
        });

        redCircle.on('click', function(evt) {
            log('click red Circle');
            evt.cancelBubble = true;
        });

        group.add(redCircle);
        layer.add(group);
        stage.add(layer);
    },
    'EVENTS - get currentTarget': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        layer.on('click', function(evt) {
            log(evt.shape.getName());

        });
        var redCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 80,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black',
            name: 'Circle'
        });

        group.add(redCircle);
        layer.add(group);
        stage.add(layer);
    },
    'EVENTS - shape mouseout handlers when mouse leaves stage': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var redCircle = new Kinetic.Circle({
            x: 550,
            y: stage.getHeight() / 2,
            radius: 80,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black',
            name: 'Circle'
        });

        redCircle.on('mouseout', function() {
            log('mouseout');
        });

        layer.add(redCircle);
        stage.add(layer);
    },
    'DRAG AND DROP - drag and drop elastic star with shadow': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var star = new Kinetic.Star({
            x: 200,
            y: 100,
            numPoints: 5,
            innerRadius: 40,
            outerRadius: 70,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            lineJoin: "round",
            shadow: {
                color: '#aaa',
                blur: 10,
                offset: {
                    x: 5,
                    y: 5
                }
            },
            draggable: true
        });

        layer.add(star);
        stage.add(layer);
        star.setLineJoin('bevel');
        layer.draw();

        var trans = null;

        star.on('dragstart', function() {
            if(trans) {
                trans.stop();
            }

            star.setAttrs({
                shadow: {
                    offset: {
                        x: 15,
                        y: 15
                    }
                },
                offset: {
                    x: 10,
                    y: 10
                }
            });
        });

        star.on('dragend', function() {
            trans = star.transitionTo({
                duration: 0.5,
                easing: 'elastic-ease-out',
                shadow: {
                    offset: {
                        x: 5,
                        y: 5
                    }
                },
                offset: {
                    x: 0,
                    y: 0
                }
            })
        });
        
        showHit(layer);
    },
    'DRAG AND DROP - two draggable shapes': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
        });

        Circle.setDraggable(true);

        var Circle2 = new Kinetic.Circle({
            x: 350,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        /*
         Circle.on('dragend', function() {
         Circle.savePixels();
         });
         */

        layer.add(Circle).add(Circle2);
        stage.add(layer);

        //Circle.savePixels();
    },
    'DRAG AND DROP - drag and drop stage': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200,
            draggable: true
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(Circle);
        stage.add(layer);
        
        showHit(layer)
    },
    'DRAG AND DROP - draggable true false': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.setDraggable(true);

        layer.add(Circle);
        stage.add(layer);

        Circle.setDraggable(false);
    },
    'DRAG AND DROP - scale and rotate stage after add layer then drag and drop shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 20,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
            //rotationDeg: 60
            //rotationDeg: Math.PI / 3
        });

        layer.add(rect);
        stage.add(layer);

        //stage.rotateDeg(20);

        //console.log(rect.getAbsoluteTransform().getTranslation())

        stage.rotate(Math.PI / 3);
        stage.setScale(0.5);

        stage.draw();
    },
    'DRAG AND DROP - scale stage before add shape then drag and drop shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.setDraggable(true);

        stage.setScale(0.5);
        layer.add(Circle);
        stage.add(layer);
    },
    'DRAG AND DROP - set stage scale to 1.5 after add layer then drag and drop shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.setDraggable(true);

        layer.add(Circle);
        stage.add(layer);

        stage.setScale(1.5);

        stage.draw();
    },
    'DRAG AND DROP - drag bound function': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rectHeight = 50;
        var rectWidth = 100;
        var rectY = (stage.getHeight() - rectHeight) / 2;

        var hbox = new Kinetic.Text({
            x: 380,
            y: 70,
            fill: "#00D2FF",
            strokeWidth: 4,
            fontSize: 18,
            fontFamily: "Calibri",
            text: "shiftKey",
            textFill: "black",
            padding: 15,
            draggable: true,
            dragBoundFunc: function(pos, evt) {
                var newPos = pos;
                if(evt.shiftKey) {
                    newPos.x = Math.round(pos.x / 20) * 20;
                    newPos.y = Math.round(pos.y / 20) * 20;
                }
                return pos;
            }
        });

        var vbox = new Kinetic.Text({
            x: 70,
            y: 70,
            fill: "yellow",
            strokeWidth: 4,
            draggable: true,
            fontSize: 18,
            fontFamily: "Calibri",
            text: "diagonal",
            textFill: "black",
            padding: 15,
            draggable: true,
            dragBoundFunc: function(pos) {
                p = (pos.y + pos.x) / 2;
                return {
                    y: p,
                    x: p
                };
            }
        });

        var circle = new Kinetic.Circle({
            x: 280,
            y: 45,
            radius: 50,
            fill: "red",
            strokeWidth: 4,
            draggable: true,
            fontSize: 18,
            draggable: true,
            dragBoundFunc: function(pos) {
                var circle = {
                    x: 280,
                    y: 95,
                    r: 50
                };
                var scale = circle.r / Math.sqrt(Math.pow(pos.x - circle.x, 2) + Math.pow(pos.y - circle.y, 2));
                if(scale < 1)
                    return {
                        y: Math.round((pos.y - circle.y) * scale + circle.y),
                        x: Math.round((pos.x - circle.x) * scale + circle.x)
                    };
                else
                    return pos;
            }
        });

        layer.add(hbox);
        layer.add(vbox);
        layer.add(circle);
        stage.add(layer);
    },
    'DRAG AND DROP - set stage scale to 1.5 before add layer then drag and drop shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.setDraggable(true);

        stage.setScale(1.5);

        layer.add(Circle);
        stage.add(layer);
    },
    'DRAG AND DROP - check that green events are ignored when dragging red Circle': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle1 = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        var Circle2 = new Kinetic.Circle({
            x: stage.getWidth() / 2 + 50,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle1.setDraggable(true);

        Circle2.on('mouseover', function() {
            log('mouseover green Circle');
        });

        layer.add(Circle1);
        layer.add(Circle2);
        stage.add(layer);
    },
    'DRAG AND DROP - drag and drop constrianed horizontally inside positioned group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group({
            x: 0,
            y: 10
        });
        var Circle = new Kinetic.Circle({
            x: 200,
            y: 100,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            dragBoundFunc: function(pos) {
            	return {x:pos.x, y:this.getAbsolutePosition().y};
            }
        });

        group.add(Circle);
        layer.add(group);
        stage.add(layer);
    },
    'DRAG AND DROP - drag and drop with left bounds': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            dragBoundFunc: function(pos) {
            	var newX = pos.x > 50 ? pos.x : 50;
            	return {x: newX, y:this.getY()}
            }
        });

        layer.add(Circle);
        stage.add(layer);
    },

    'DRAG AND DROP - drag and drop shape inside scrollable div': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 400
        });

        // make container scrollable
        var container = stage.getContainer();
        container.style.overflow = 'auto';

        var layer = new Kinetic.Layer();
        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: 100,
            radius: 50,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        layer.add(Circle);
        stage.add(layer);
    },
    'DRAG AND DROP - drag and drop shape inside scaled group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group({
            scale: {
                x: 2,
                y: 2
            }
        });

        var Circle = new Kinetic.Circle({
            x: 40,
            y: 40,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        group.add(Circle);
        layer.add(group);
        stage.add(layer);
    },
    'DRAG AND DROP - translate, rotate, and scale shape, and then drag and drop': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);
    },
    'DRAG AND DROP - translate, rotate, center offset, and scale shape, and then drag and drop': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            },
            offset: {
                x: 50,
                y: 25
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        var anim = new Kinetic.Animation(function() {
                rect.rotate(0.01);

            }, layer);
        anim.start();
    },
    'STAGE - hide stage': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        stage.hide();
        stage.draw();
    },
    'STAGE - hide layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        layer.hide();

        stage.draw();
    },
    'STAGE - hide group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            rotationDeg: 60,
            scale: {
                x: 2,
                y: 1
            }
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        group.hide();

        stage.draw();
    },
    'STAGE - save image as png (click on Circle to open new window)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'violet',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.on('click', function() {
            window.open(layer.toDataURL());
        });

        layer.add(Circle);
        stage.add(layer);
    },
    'STAGE - save image as low quality jpg (click on Circle to open new window)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'violet',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.on('click', function() {
            window.open(layer.toDataURL('image/jpeg', 0));
        });

        layer.add(Circle);
        stage.add(layer);
    },
    'STAGE - save image as high quality jpg (click on Circle to open new window)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var Circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'violet',
            stroke: 'black',
            strokeWidth: 4
        });

        Circle.on('click', function() {
            window.open(layer.toDataURL('image/jpeg', 1));
        });

        layer.add(Circle);
        stage.add(layer);
    }
};
