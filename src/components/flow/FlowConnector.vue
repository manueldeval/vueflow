<template>
  <div :style="{display: 'inline-block',
                top:connector.y +'px',
                left:connector.x +'px',
                position:'absolute',
                width:connector.width,
                height:connector.height,
                zIndex: -100}">
    <svg  ref="svg" 
          id="svg"
          :width="connector.width"
          :height="connector.height"
          :viewBox="Math.round(connector.x)+' '+Math.round(connector.y)+' '+Math.round(connector.width)+' '+Math.round(connector.height)"
          >
      <path ref="path" :d="connector.path"/>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
  path {
    stroke:#d0d0d0;
    stroke-width:2;
    fill-opacity:0;
  }
  #svg {
    z-index: -1000
  }
</style>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    from: {
      type: Object,
      //The object is {node: "Node1" , output: "out2"}
    },
    to:{
      type: Object,
      //The object is {node: "Node2" , input: "in2"}
    }
  },
  methods:{
    _directionToSvgDirection: function(direction){
      let vectorScale = 75;
      switch (direction) {
        case 'right': return {x:vectorScale, y:0}
        case 'left' : return {x:-vectorScale, y:0}
        case 'up'   : return {x:0, y:-vectorScale}
        case 'down' : return {x:0, y:vectorScale}
        default: return "0,0"
      }
    },
    //(x0,y0) is start point; (x1,y1),(x2,y2) is control points; (x3,y3) is end point.
    bezierMinMax : function (x0, y0, x1, y1, x2, y2, x3, y3) {
        var tvalues = [], xvalues = [], yvalues = [], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
        for (var i = 0; i < 2; ++i) {
          if (i == 0) {
              b = 6 * x0 - 12 * x1 + 6 * x2;
              a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
              c = 3 * x1 - 3 * x0;
          } else {
              b = 6 * y0 - 12 * y1 + 6 * y2;
              a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
              c = 3 * y1 - 3 * y0;
          }
          if (Math.abs(a) < 1e-12) {
              if (Math.abs(b) < 1e-12) {
                  continue;
              }
              t = -c / b;
              if (0 < t && t < 1) {
                  tvalues.push(t);
              }
              continue;
          }
            b2ac = b * b - 4 * c * a;
            if (b2ac < 0) {
                continue;
            }
            sqrtb2ac = Math.sqrt(b2ac);
            t1 = (-b + sqrtb2ac) / (2 * a);
            if (0 < t1 && t1 < 1) {
                tvalues.push(t1);
            }
            t2 = (-b - sqrtb2ac) / (2 * a);
            if (0 < t2 && t2 < 1) {
                tvalues.push(t2);
            }
        }

        var j = tvalues.length, mt;
        while (j--) {
            t = tvalues[j];
            mt = 1 - t;
            xvalues[j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
            yvalues[j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
        }

        xvalues.push(x0,x3);
        yvalues.push(y0,y3);

        return {
            min: {x: Math.min.apply(0, xvalues), y: Math.min.apply(0, yvalues)},
            max: {x: Math.max.apply(0, xvalues), y: Math.max.apply(0, yvalues)}
        };
    },
    findBoxByName: function(name){
      return this.$parent.$refs[name][0]
    },
  },
  computed: {
    connector : function(){
      let src =  this.findBoxByName(this.from.node).getOutputConnectorPosition(this.from.output)
      let dst =  this.findBoxByName(this.to.node).getInputConnectorPosition(this.to.input)

      let border = 5

      let v1 = this._directionToSvgDirection(src.direction)
      let v2 = this._directionToSvgDirection(dst.direction)

      let bezierBox = this.bezierMinMax(
                src.x,src.y,
                src.x + v1.x, src.y + v1.y,
                (dst.x+v2.x),(dst.y+v2.y),
                dst.x,dst.y)
      return {
        x : bezierBox.min.x - border,
        y : bezierBox.min.y - border,
        width: bezierBox.max.x - bezierBox.min.x + 2*border,
        height: bezierBox.max.y - bezierBox.min.y + 2*border,
        path:"M"+src.x+","+src.y+" C"+(v1.x+src.x)+","+(v1.y+src.y)+" "+(dst.x+v2.x)+","+(dst.y+v2.y)+" "+(dst.x)+","+(dst.y)
      }
    }
  }
}
</script>

