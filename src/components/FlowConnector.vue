<template>
  <svg  ref="svg" 
        :style="{top:connector.y,left:connector.x,position:'absolute'}"
        :width="connector.width"
        :height="connector.height"
        :viewBox="connector.x+' '+connector.y+' '+connector.width+' '+connector.height"
        >
    <path ref="path" :d="connector.path"/>
  </svg>
</template>

<style lang="scss" scoped>
  path {
    stroke:#d0d0d0;
    stroke-width:2;
    fill-opacity:0;
  }
</style>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    src: {
      type: Object,
      default :  { x: 30,   y: 30,   direction: "down" }
    },
    dst: {
      type: Object,
      default :  { x: 200,   y: 200,   direction: "up" }
    },
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
    }
  },
  computed: {
    connector : function(){
      let border = 5

      let v1 = this._directionToSvgDirection(this.src.direction)
      let v2 = this._directionToSvgDirection(this.dst.direction)

      let bezierBox = this.bezierMinMax(
                this.src.x,this.src.y,
                this.src.x + v1.x, this.src.y + v1.y,
                (this.dst.x+v2.x),(this.dst.y+v2.y),
                this.dst.x,this.dst.y)
      return {
        x : bezierBox.min.x - border,
        y : bezierBox.min.y - border,
        width: bezierBox.max.x - bezierBox.min.x + 2*border,
        height: bezierBox.max.y - bezierBox.min.y + 2*border,
        path:"M"+this.src.x+","+this.src.y+" C"+(v1.x+this.src.x)+","+(v1.y+this.src.y)+" "+(this.dst.x+v2.x)+","+(this.dst.y+v2.y)+" "+(this.dst.x)+","+(this.dst.y)
      }
    }
  }
}
</script>

