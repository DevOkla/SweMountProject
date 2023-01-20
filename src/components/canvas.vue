<script>
const width = window.innerWidth;
const height = window.innerHeight;
//20mm
export default {
  props: {
    A: Number,
    B: Number,
    C: Number,
    shape: Number,
    bredd: Array,
    hojd: Array,
    pannorBredd: Number,
    pannorHöjd: Number,
    vikt: Array,
    nockhojd: Number,
    typTak: Number,
    canvasNum: Number,
  },

  data() {
    return {
      laglutandeCountMatrialsVChecker: [
        "LL1505",
        "LL1530",
        "KL3050",
        "TP3552",
        "GB0010",
        "VB1305",
        "VB1301",
        "MU1010",
        "MU1001",
        "MA1008",
        "MA5105",
      ],

      canvasSize: width < 1200 ? 95 : (1200 / width) * 95,

      scalePercentage: 1,

      panelar: [
        [
          {
            x:
              (width * (width < 1200 ? 95 : (1200 / width) * 95)) / 100 / 2 -
              this.bredd[0] / 20,
            y:
              (height * (width < 1200 ? 95 : (1200 / width) * 95)) / 100 / 2 -
              this.hojd[0] / 20,
            redOut: "#44444499",
            outSurf: false,
          },
        ],
      ],

      panelGrouper: [
        {
          x:
            (width * (width < 1200 ? 95 : (1200 / width) * 95)) / 100 / 2 -
            58.5,
          y:
            (height * (width < 1200 ? 95 : (1200 / width) * 95)) / 100 / 2 - 85,
        },
      ],

      scaleXG: [1],
      scaleYG: [1],
      mousePos: { x: 100, y: 50 },
      rulerXB: [],
      rulerYB: [],
      rulerXS: [],
      rulerYS: [],
      fixElement: true,
      rows: [1],
      columns: [1],
      mouseDistX: 0,
      mouseDistY: 0,
      //bredd1: this.bredd.map((x) => x / 10),

      //hojd1: this.hojd.map((x) => x / 10),
      breddToHojd: [false],
      fastTillBredd: [false],
      topLine: [[]],
      leftLine: [[]],
      topDist: [0],
      leftDist: [0],
      randUpDown: 50,
      randLeftRight: 50,
      imageTrash: null,
      imageCalc: null,
      imageBack: null,
      imageFullScreen: null,
      imageSmallScreen: null,

      markedGroup: 0,
      scaleShiftX: 0,
      scaleShiftY: 0,
      fullToSmall: false,
      shapesPoints: [],
      randzonPoints: [],
    };
  },

  created() {
    const imageTrash = new window.Image();
    imageTrash.src = "./icons/trash.png";
    imageTrash.onload = () => {
      // set image only when it is loaded
      this.imageTrash = imageTrash;
    };

    const imageCalc = new window.Image();
    imageCalc.src = "./icons/calculate.png";
    imageCalc.onload = () => {
      this.imageCalc = imageCalc;
    };
    const imageBack = new window.Image();
    imageBack.src = "./icons/back.png";
    imageBack.onload = () => {
      this.imageBack = imageBack;
    };
    const imageFullScreen = new window.Image();
    imageFullScreen.src = "./icons/fullScreen.png";
    imageFullScreen.onload = () => {
      this.imageFullScreen = imageFullScreen;
    };
    const imageSmallScreen = new window.Image();
    imageSmallScreen.src = "./icons/smallScreen.png";
    imageSmallScreen.onload = () => {
      this.imageSmallScreen = imageSmallScreen;
    };

    this.createShapesPoints();
    this.createRandzonPoints();
  },
  computed: {
    bredd1() {
      let arr = [];
      for (let i = 0; i < this.bredd.length; i++) {
        this.breddToHojd[i]
          ? arr.push(this.hojd[i] / 10)
          : arr.push(this.bredd[i] / 10);
      }

      return arr;
    },

    hojd1() {
      let arr = [];

      for (let i = 0; i < this.hojd.length; i++) {
        this.breddToHojd[i]
          ? arr.push(this.bredd[i] / 10)
          : arr.push(this.hojd[i] / 10);
      }

      return arr;
    },

    stageSize() {
      let obj = {
        width: (width * this.canvasSize) / 100,
        height: (height * this.canvasSize) / 100,
      };

      return obj;
    },

    w() {
      return (width * this.canvasSize) / 100;
    },
    h() {
      return (height * this.canvasSize) / 100;
    },

    distMellanFäst() {
      let arr = [];

      for (let i = 0; i < this.bredd1.length; i++) {
        this.fastTillBredd[i]
          ? arr.push(
              (this.hojd1[i] * 10 -
                Math.round((this.hojd1[i] * 6) / this.pannorHöjd) *
                  this.pannorHöjd) /
                20
            )
          : arr.push(
              (this.bredd1[i] * 10 -
                Math.round((this.bredd1[i] * 6) / this.pannorBredd) *
                  this.pannorBredd) /
                20
            );
      }

      return arr;
    },
  },
  mounted() {
    this.rulersCounter();
  },
  watch: {
    A() {
      this.createShapesPoints();
      this.createRandzonPoints();
    },
    B() {
      this.createShapesPoints();
      this.createRandzonPoints();
    },
    C() {
      this.createShapesPoints();
      this.createRandzonPoints();
    },
  },
  methods: {
    stopScrolling() {},

    createShapesPoints() {
      this.shapesPoints = [];
      this.shapesPoints.push(
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.A / 2,
          this.h / 2 + this.B / 2,
          this.w / 2 - this.A / 2,
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + (this.C - this.A / 2),
          this.h / 2 + this.B / 2,

          this.w / 2 - this.A / 2,
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2,
          this.h / 2 + this.B / 2,

          this.w / 2 - (this.C - this.A / 2),
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2 + Math.sqrt(this.C ** 2 - this.B ** 2),
          this.h / 2 + this.B / 2,

          this.w / 2 - this.A / 2 + Math.sqrt(this.C ** 2 - this.B ** 2),
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,

          this.w / 2 + this.A / 2 - Math.sqrt(this.C ** 2 - this.B ** 2),
          this.h / 2 + this.B / 2,

          this.w / 2 - this.A / 2 - Math.sqrt(this.C ** 2 - this.B ** 2),
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.C / 2,
          this.h / 2 + this.B / 2,
          this.w / 2 - this.C / 2,
          this.h / 2 + this.B / 2,
        ],
        [
          this.w / 2 - this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.A / 2,
          this.h / 2 - this.B / 2,
          this.w / 2 + this.C / 2,
          this.h / 2 + this.B / 2,
          this.w / 2 - this.C / 2,
          this.h / 2 + this.B / 2,
        ]
      );
    },
    createRandzonPoints() {
      this.randzonPoints = [];
      this.randzonPoints.push(
        [
          this.w / 2 - this.A / 2 + this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 + this.A / 2 - this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 + this.A / 2 - this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,
          this.w / 2 - this.A / 2 + this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 - this.A / 2 + this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 -
            (((this.A - this.C) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 -
            (((this.A - this.C) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,

          this.w / 2 - this.A / 2 + 50,
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 -
            this.A / 2 +
            (((this.A - this.C) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 + this.A / 2 - this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 + this.A / 2 - this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,

          this.w / 2 -
            this.A / 2 +
            (((this.A - this.C) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 -
            this.A / 2 +
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) * this.randUpDown +
            this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 +
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) * this.randUpDown -
            this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 +
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) *
              (this.B - this.randUpDown) -
            this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,

          this.w / 2 -
            this.A / 2 +
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) *
              (this.B - this.randUpDown) +
            this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 -
            this.A / 2 -
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) * this.randUpDown +
            this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 -
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) * this.randUpDown -
            this.randLeftRight,
          this.h / 2 - this.B / 2 + this.randUpDown,

          this.w / 2 +
            this.A / 2 -
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) *
              (this.B - this.randUpDown) -
            this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,

          this.w / 2 -
            this.A / 2 -
            (Math.sqrt(this.C ** 2 - this.B ** 2) / this.B) *
              (this.B - this.randUpDown) +
            this.randLeftRight,
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 -
            this.A / 2 +
            (((this.A / 2 - this.C / 2) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 +
            this.A / 2 -
            (((this.A / 2 - this.C / 2) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 +
            this.A / 2 -
            (((this.A / 2 - this.C / 2) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,
          this.w / 2 -
            this.A / 2 +
            (((this.A / 2 - this.C / 2) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,
        ],
        [
          this.w / 2 -
            this.A / 2 +
            (((this.A / 2 - this.C / 2) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 +
            this.A / 2 -
            (((this.A / 2 - this.C / 2) * this.randUpDown) / this.B +
              this.randLeftRight),
          this.h / 2 - this.B / 2 + this.randUpDown,
          this.w / 2 +
            this.A / 2 -
            (((this.A / 2 - this.C / 2) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,
          this.w / 2 -
            this.A / 2 +
            (((this.A / 2 - this.C / 2) * (this.B - this.randUpDown)) / this.B +
              this.randLeftRight),
          this.h / 2 + this.B / 2 - this.randUpDown,
        ]
      );
    },

    tester() {
      let eName = "shape" + this.shape;
      const shapeType = this.$refs.stage.getNode().findOne("." + eName);

      const shapeType1 = this.$refs.stage.getNode().findOne(".panelGroup0");

      console.log("shapePoint" + shapeType.points()[0]);

      console.log("pgX" + shapeType1.x());
      console.log("width" + this.w);
    },
    fullCanvas() {
      this.canvasSize = 100;
      this.fullToSmall = !this.fullToSmall;
      this.stopScrolling();
    },
    smallCanvas() {
      this.canvasSize = width < 1200 ? 95 : (1200 / width) * 95;

      this.fullToSmall = !this.fullToSmall;
    },

    deletePanelGroup(num) {
      this.$emit("deleteGroup", num);
      this.panelGrouper.splice(num, 1);

      this.panelar.splice(num, 1);

      this.scaleXG.splice(num, 1);
      this.scaleYG.splice(num, 1);
      this.rows.splice(num, 1);
      this.columns.splice(num, 1);
      this.breddToHojd.splice(num, 1);
      this.fastTillBredd.splice(num, 1);
      this.topLine.splice(num, 1);
      this.leftLine.splice(num, 1);
      this.topDist.splice(num, 1);
      this.leftDist.splice(num, 1);
    },

    addNewPanelGroup() {
      this.$emit("newGroup", 1);

      this.newPanelaGroup();
    },
    newPanelaGroup() {
      this.panelar.push([
        {
          x: this.w / 2 - 58.5,
          y: this.h / 2 - 85,
          redOut: "#44444499",
          outSurf: false,
        },
      ]);

      this.scaleXG.push(1);
      this.scaleYG.push(1);
      this.rows.push(1);
      this.columns.push(1);
      this.breddToHojd.push(false);
      this.fastTillBredd.push(false);
      this.topLine.push([]);
      this.leftLine.push([]);
      this.topDist.push(0);
      this.leftDist.push(0);

      this.panelGrouper.push({
        x: this.w / 2 - 58.5,
        y: this.h / 2 - 85,
      });
    },
    cursorMove() {
      document.getElementById("mCanvas" + this.canvasNum).style.cursor = "move";
    },
    cursorPoint() {
      document.getElementById("mCanvas" + this.canvasNum).style.cursor =
        "pointer";
    },

    cursorNorm() {
      document.getElementById("mCanvas" + this.canvasNum).style.cursor =
        "default";
    },
    rotateFaster() {
      if (this.fixElement) {
        this.fastTillBredd[this.markedGroup] =
          !this.fastTillBredd[this.markedGroup];
      }
    },

    rotatePaler(t) {
      if (this.fixElement) {
        /*let x1 = this.bredd1[t];
        let x2 = this.hojd1[t];
        this.bredd1[t] = x2;
        this.hojd1[t] = x1;*/
        let eName = "panelGroup" + t;
        const shapeType = this.$refs.stage.getNode().findOne("." + eName);

        this.breddToHojd[t] = !this.breddToHojd[t];
        this.drawPanelar(shapeType);
      }
    },
    backProcess() {
      this.fixElement = true;
    },
    distanceLines() {
      for (let i = 0; i < this.panelar.length; i++) {
        this.topLine = [
          this.panelar[i][0].x,
          this.panelar[i][0].y,
          this.panelar[i][0].x,
          this.panelar[i][0].y + this.topDist[i],
        ];
        this.leftLine = [
          this.panelar[i][0].x,
          this.panelar[i][0].y,
          this.panelar[i][0].x + this.leftDist[i],
          this.panelar[i][0].y,
        ];
      }
    },
    completeProcess() {
      this.deletRedPanel();

      this.fixElement = false;
      this.distanceLines();
      this.$emit("values", [this.panelar]);
    },

    rulersCounter() {
      let scaleA = this.A < 1000 ? 3 : 1.5;
      let scaleB = this.B < 1000 ? 3 : 1.5;

      this.rulerXB = [];
      this.rulerXS = [];
      this.rulerYB = [];
      this.rulerYS = [];

      let eName = "shape" + this.shape;
      const shapeType = this.$refs.stage.getNode().findOne("." + eName);
      let xB = shapeType.points()[0] + shapeType.getParent().getParent().x();

      let yB = shapeType.points()[1] + shapeType.getParent().getParent().y();

      this.scaleShiftX = -shapeType.points()[0] * (1 - this.scalePercentage);
      this.scaleShiftY = -shapeType.points()[1] * (1 - this.scalePercentage);

      for (
        let i = 0;
        i < this.A * scaleA * this.scalePercentage;
        i += 100 * this.scalePercentage
      ) {
        this.rulerXB.push(xB + i);
        if (i !== 0) {
          this.rulerXB.unshift(xB - i);
        }
      }
      for (
        let i = 0;
        i < this.A * scaleA * this.scalePercentage;
        i += 10 * this.scalePercentage
      ) {
        this.rulerXS.push(xB + i);
        if (i !== 0) {
          this.rulerXS.push(xB - i);
        }
      }

      for (
        let i = 0;
        i < this.B * scaleB * this.scalePercentage;
        i += 100 * this.scalePercentage
      ) {
        this.rulerYB.push(yB + i);
        if (i !== 0) {
          this.rulerYB.unshift(yB - i);
        }
      }
      for (
        let i = 0;
        i < this.B * scaleB * this.scalePercentage;
        i += 10 * this.scalePercentage
      ) {
        this.rulerYS.push(yB + i);
        if (i !== 0) {
          this.rulerYS.push(yB - i);
        }
      }
    },

    deletRedPanel() {
      //this.checkIfOut(e);

      for (let i = 0; i < this.panelar.length; i++) {
        for (let j = 0; j < this.panelar[i].length; j++) {
          if (this.panelar[i][j].outSurf == true) {
            this.panelar[i].splice(j, 1);
            j--;
          }
        }
      }
    },
    deletPanel(i, j) {
      this.panelar[j].splice(i, 1);
    },

    rulersLine() {
      const stage = this.$refs.stage.getNode();

      let mouse = stage.getPointerPosition();

      this.mousePos.x = mouse.x;
      this.mousePos.y = mouse.y;

      let eName = "shape" + this.shape;
      const zeroPoint = stage.findOne("." + eName);

      this.mouseDistX =
        Math.round(
          (mouse.x -
            zeroPoint.points()[0] -
            zeroPoint.getParent().x() -
            zeroPoint.getParent().getParent().x() -
            this.scaleShiftX) /
            this.scalePercentage
        ) / 100;
      this.mouseDistY =
        Math.round(
          (mouse.y -
            zeroPoint.points()[1] -
            zeroPoint.getParent().y() -
            zeroPoint.getParent().getParent().y() -
            this.scaleShiftY) /
            this.scalePercentage
        ) / 100;
    },

    distance12(x1, y1, x2, y2) {
      let r = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

      return r;
    },
    zoomIn() {
      this.scalePercentage += 0.1;
      // this.drawPanelar(this.$refs.panelarGrouper.getNode());

      /*  const pos = shape.getAbsolutePosition();

// Set the scale of the shape
shape.scaleX(2);
shape.scaleY(2);

// Set the position of the shape back to its original position,
// taking into account the change in scale
shape.setAbsolutePosition({
  x: pos.x / 2,
  y: pos.y / 2
});*/
    },
    zoomOut() {
      this.scalePercentage -= 0.1;
      // this.drawPanelar(this.$refs.panelarGrouper.getNode());
    },
    handleStageMouseUp(e) {
      this.scaleXG[e.target.id()] =
        Math.round(
          (this.rows[e.target.id()] +
            (2 * this.rows[e.target.id()]) / this.bredd1[e.target.id()] -
            2 / this.bredd1[e.target.id()]) *
            100
        ) / 100;

      this.scaleYG[e.target.id()] =
        Math.round(
          (this.columns[e.target.id()] +
            (2 * this.columns[e.target.id()]) / this.hojd1[e.target.id()] -
            2 / this.hojd1[e.target.id()]) *
            100
        ) / 100;

      this.checkIfOut(e);
    },
    handleDragStart(e) {
      this.drawPanelar(e.target);
      this.checkIfOut(e);
      this.distanceLines();
    },
    drawPanelar(e) {
      this.panelar[e.id()] = [];

      for (let i = 0; i < this.rows[e.id()]; i++) {
        for (let j = 0; j < this.columns[e.id()]; j++) {
          this.panelar[e.id()].push({
            x: e.x() + (this.bredd1[e.id()] + 2) * i,
            y: e.y() + (this.hojd1[e.id()] + 2) * j,
            redOut: "#44444499",
            outSurf: false,
          });
        }
      }
      this.panelGrouper[e.id()].x = e.x();
      this.panelGrouper[e.id()].y = e.y();
    },

    checkIfOut(e) {
      let eName = "shape" + this.shape;
      const shapeType = this.$refs.stage.getNode().findOne("." + eName);
      let A = this.A;
      let B = this.B;
      let C = this.C;
      let xB = shapeType.points()[0] + shapeType.getParent().x();
      let yB = shapeType.points()[1] + shapeType.getParent().y();

      for (let i = 0; i < this.panelar[e.target.id()].length; i++) {
        let checker = false;

        if (this.shape == 0) {
          checker =
            xB > this.panelar[e.target.id()][i].x ||
            xB + A <
              this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()] ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          this.leftDist[e.target.id()] = xB - this.panelar[e.target.id()][0].x;
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }

        if (this.shape == 1) {
          let tan = (A - C) / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()],
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj = this.distance12(
            xB + C,
            yB + B,
            xB + C,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let dist2 = tan * adj + C;

          checker =
            xB > this.panelar[e.target.id()][i].x ||
            dist2 < dist1 ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          this.leftDist[e.target.id()] = xB - this.panelar[e.target.id()][0].x;
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }

        if (this.shape == 2) {
          let tan = (A - C) / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB + A,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj = this.distance12(
            xB + A - C,
            yB + B,
            xB + A - C,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let dist2 = tan * adj + C;

          checker =
            dist1 > dist2 ||
            xB + A <
              this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()] ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          let adjLine = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][0].y
          );
          let dist3 = tan * adjLine;

          this.leftDist[e.target.id()] =
            -this.panelar[e.target.id()][0].x + (xB + dist3);
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }

        if (this.shape == 3) {
          let opp = Math.sqrt(C ** 2 - B ** 2);
          let tan = opp / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );

          let adj1 = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj2 = this.distance12(
            xB + A,
            yB,
            xB + A,
            this.panelar[e.target.id()][i].y
          );

          let dist2 = tan * adj1;
          let dist4 = tan * adj2;

          let dist3 = this.distance12(
            this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()],
            this.panelar[e.target.id()][i].y,
            xB + A,
            this.panelar[e.target.id()][i].y
          );

          checker =
            dist1 < dist2 ||
            (dist3 > dist4 &&
              this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()] >
                xB + A) ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          let adjLine = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][0].y
          );
          let dist5 = tan * adjLine;

          this.leftDist[e.target.id()] =
            -this.panelar[e.target.id()][0].x + (xB + dist5);
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }

        if (this.shape == 4) {
          let opp = Math.sqrt(C ** 2 - B ** 2);
          let tan = opp / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x,
            this.panelar[e.target.id()][i].y,
            xB,
            this.panelar[e.target.id()][i].y
          );
          let adj1 = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][i].y
          );
          let dist2 = tan * adj1;

          let dist3 = this.distance12(
            this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()],
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB + A,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj2 = this.distance12(
            xB + A,
            yB,
            xB + A,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let dist4 = tan * adj2;

          //console.log("1: " + dist1+" 2: " + dist2+" 3: " + dist3+" 4: " + dist4 );

          checker =
            (dist1 > dist2 && this.panelar[e.target.id()][i].x < xB) ||
            dist3 < dist4 ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          let adjLine = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][0].y
          );
          let dist5 = tan * adjLine;

          this.leftDist[e.target.id()] =
            -this.panelar[e.target.id()][0].x + xB - dist5;
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }
        if (this.shape == 5) {
          let tan = (A - C) / 2 / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()],
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB + A,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj = this.distance12(
            xB + A,
            yB,
            xB + A,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );

          let dist2 = tan * adj;

          let dist3 = this.distance12(
            this.panelar[e.target.id()][i].x,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()],
            xB,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );
          let adj2 = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()]
          );

          let dist4 = tan * adj2;

          checker =
            dist3 < dist4 ||
            dist2 > dist1 ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          let adjLine = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][0].y
          );
          let dist5 = tan * adjLine;

          this.leftDist[e.target.id()] =
            -this.panelar[e.target.id()][0].x + xB + dist5;
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }
        if (this.shape == 6) {
          let Cs = (C - A) / 2;
          let tan = Cs / B;

          let dist1 = this.distance12(
            this.panelar[e.target.id()][i].x + this.bredd1[e.target.id()],
            this.panelar[e.target.id()][i].y,
            xB - Cs + C,
            this.panelar[e.target.id()][i].y
          );
          let adj = this.distance12(
            xB - Cs + C,
            yB + B,
            xB - Cs + C,
            this.panelar[e.target.id()][i].y
          );

          let dist2 = tan * adj;

          let dist3 = this.distance12(
            this.panelar[e.target.id()][i].x,
            this.panelar[e.target.id()][i].y,
            xB - Cs,
            this.panelar[e.target.id()][i].y
          );
          let adj2 = this.distance12(
            xB - Cs,
            yB + B,
            xB - Cs,
            this.panelar[e.target.id()][i].y
          );

          let dist4 = tan * adj2;

          checker =
            dist3 < dist4 ||
            dist2 > dist1 ||
            yB > this.panelar[e.target.id()][i].y ||
            yB + B <
              this.panelar[e.target.id()][i].y + this.hojd1[e.target.id()];

          let adjLine = this.distance12(
            xB,
            yB,
            xB,
            this.panelar[e.target.id()][0].y
          );
          let dist5 = tan * adjLine;

          this.leftDist[e.target.id()] =
            -this.panelar[e.target.id()][0].x + xB - dist5;
          this.topDist[e.target.id()] = yB - this.panelar[e.target.id()][0].y;
        }

        if (checker) {
          this.panelar[e.target.id()][i].redOut = "#aa000077";
          this.panelar[e.target.id()][i].outSurf = true;
        }
      }
    },

    handleTransformEnd(e) {
      this.rows[e.target.id()] =
        Math.round(e.target.scaleX() + this.scalePercentage) > 1
          ? Math.round(
              (e.target.scaleX() * this.bredd1[e.target.id()]) /
                (this.bredd1[e.target.id()] + 2)
            )
          : 1;

      this.columns[e.target.id()] =
        Math.round(e.target.scaleY()) > 1
          ? Math.round(
              (e.target.scaleY() * this.hojd1[e.target.id()]) /
                (this.hojd1[e.target.id()] + 2)
            )
          : 1;
      this.panelGrouper[e.target.id()].x = e.target.x();
      this.panelGrouper[e.target.id()].y = e.target.y();

      this.drawPanelar(e.target);
    },

    handleStageMouseDown(e) {
      let clickedOnTransformer = false;
      if (e.target.className !== undefined) {
        if (e.target.getParent().className === "Transformer") {
          clickedOnTransformer = true;
        } else {
          clickedOnTransformer = false;
        }
      }
      if (e.target.name() == "panelGroup" + e.target.id()) {
        this.markedGroup = e.target.id();
        this.updateTransformer(e);
        return;
      } else if (clickedOnTransformer) {
        return;
      } else if (e.target.name() !== "panelGroup" + e.target.id()) {
        this.updateTransformer("");
      }
    },

    updateTransformer(e) {
      const eId = e.target ? e.target.id() : false;

      const transformerNode = this.$refs.transformer.getNode();

      const stage = transformerNode.getStage();

      const selectedNode =
        eId + 1 ? stage.findOne("." + "panelGroup" + eId) : "";

      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
        transformerNode.boundBoxFunc((oldBox, newBox) => {
          if (newBox.width / this.bredd1[e.target.id()] < 1) {
            newBox.width = this.bredd1[e.target.id()];
          }
          if (newBox.height / this.hojd1[e.target.id()] < 1) {
            newBox.height = this.hojd1[e.target.id()];
          }

          /*let r = Math.floor(newBox.width)>oldBox.width ? Math.floor(newBox.width):oldBox.width ;
         let c = Math.floor(newBox.height)>oldBox.height ? Math.floor(newBox.height):oldBox.height ;

         this.panelar=[];

         for (let i =0;i<r;i++){
            for(let j =0;j<c;j++) {
              this.panelar.push({x: newBox.x+(this.bredd1+2)*i, y: newBox.y+ (this.hojd1+2) *j});

            }

         }*/

          return newBox;
        });
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
    },
  },
};
</script>

<template>
  <div
    :class="['canvas', fullToSmall ? ' fullCanvas' : '']"
    :id="'mCanvas' + canvasNum"
  >
    <v-stage
      ref="stage"
      @mousemove="rulersLine"
      @mousedown="handleStageMouseDown"
      @touchstart="handleStageMouseDown"
      :config="stageSize"
    >
      <v-layer>
        <v-line
          :config="{
            points: [0, mousePos.y, w, mousePos.y],
            closed: false,
            stroke: '#0005',
            strokeWidth: 1,
          }"
        />
        <v-line
          :config="{
            points: [mousePos.x, 0, mousePos.x, h],
            closed: false,
            stroke: '#0005',
            strokeWidth: 1,
          }"
        />
        <v-ellipse
          :config="{
            x: mousePos.x,
            y: 60,
            fill: 'black',
            radiusX: 40,
            radiusY: 20,
          }"
        />
        <v-ellipse
          :config="{
            x: 80,
            y: mousePos.y,
            fill: 'black',
            radiusX: 40,
            radiusY: 20,
          }"
        />

        <v-text
          :config="{
            offsetX: 27,
            x: mousePos.x,
            y: 50,
            text: mouseDistX + 'm',
            textAlign: 'center',
            fill: 'white',
            fontSize: 20,
          }"
        />
        <v-text
          :config="{
            offsetY: 8,

            x: 50,
            y: mousePos.y,
            text: mouseDistY + 'm',
            textAlign: 'center',
            fill: 'white',
            fontSize: 20,
          }"
        />
      </v-layer>

      <v-layer
        @dragmove="rulersCounter"
        :config="{
          draggable: true,
          scaleX: scalePercentage,
          scaleY: scalePercentage,
        }"
      >
        <v-group
          :config="{
            visible: shape == 0 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[0],
              name: 'shape0',
              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />

          <v-line
            :config="{
              points: randzonPoints[0],
              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>
        <v-group
          :config="{
            visible: shape == 1 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[1],
              name: 'shape1',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />
          <v-line
            :config="{
              points: randzonPoints[1],
              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>
        <v-group
          :config="{
            visible: shape == 2 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[2],
              name: 'shape2',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />

          <v-line
            :config="{
              points: randzonPoints[2],

              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>

        <v-group
          :config="{
            visible: shape == 3 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[3],
              name: 'shape3',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />
          <v-line
            :config="{
              points: randzonPoints[3],

              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>
        <v-group
          :config="{
            visible: shape == 4 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[4],
              name: 'shape4',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />
          <v-line
            :config="{
              points: randzonPoints[4],

              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>
        <v-group
          :config="{
            visible: shape == 5 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[5],
              name: 'shape5',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />
          <v-line
            :config="{
              points: randzonPoints[5],
              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>
        <v-group
          :config="{
            visible: shape == 6 ? true : false,
          }"
        >
          <v-line
            :config="{
              points: shapesPoints[6],
              name: 'shape6',

              closed: true,
              fill: '#fff',
              shadowBlur: 100,
              shadowOffset: { x: 5, y: 5 },
            }"
          />
          <v-line
            :config="{
              points: randzonPoints[6],

              closed: true,
              stroke: '#ffda2a',
            }"
          />
        </v-group>

        <v-group v-for="(j, indexj) in panelar" v-bind:key="indexj">
          <v-rect
            ref="panels"
            v-for="(i, index) in j"
            v-bind:key="index"
            :config="{
              x: i.x,
              y: i.y,
              width: bredd1[indexj],
              height: hojd1[indexj],
              fill: i.redOut,
              draggable: false,
              moveToTop: true,
            }"
          />

          <v-rect
            ref="panelsLefter"
            v-for="(i, index) in panelar[indexj]"
            v-bind:key="index"
            :config="{
              x: fastTillBredd[indexj]
                ? i.x - 5
                : i.x - 3 + distMellanFäst[indexj],
              y: fastTillBredd[indexj]
                ? i.y - 3 + distMellanFäst[indexj]
                : i.y - 5,
              width: fastTillBredd[indexj] ? bredd1[indexj] + 10 : 6,
              height: fastTillBredd[indexj] ? 6 : hojd1[indexj] + 10,
              fill: '#ddd',
              draggable: false,
              stroke: '#777',
              strokeWidth: 1,
              moveToTop: true,
            }"
          />

          <v-rect
            ref="panelsRighter"
            v-for="(i, index) in panelar[indexj]"
            v-bind:key="index"
            :config="{
              x: fastTillBredd[indexj]
                ? i.x - 5
                : i.x - 3 - distMellanFäst[indexj] + bredd1[indexj],
              y: fastTillBredd[indexj]
                ? i.y - 3 - distMellanFäst[indexj] + hojd1[indexj]
                : i.y - 5,
              width: fastTillBredd[indexj] ? bredd1[indexj] + 10 : 6,
              height: fastTillBredd[indexj] ? 6 : hojd1[indexj] + 10,
              fill: '#ddd',
              draggable: false,
              stroke: '#777',
              strokeWidth: 1,
              moveToTop: true,
            }"
          />

          <v-rect
            @mousedown="cursorMove"
            @mouseup="cursorNorm"
            @dragmove="handleDragStart"
            @transform="handleTransformEnd"
            @transformend="handleStageMouseUp"
            :config="{
              x: panelGrouper[indexj].x,
              y: panelGrouper[indexj].y,
              scaleX: scaleXG[indexj],
              scaleY: scaleYG[indexj],
              width: bredd1[indexj],
              height: hojd1[indexj],
              fill: '#00000055',
              draggable: true,
              name: 'panelGroup' + indexj,
              id: indexj,
              visible: fixElement,
            }"
          />

          <v-group
            @mouseover="cursorPoint"
            @mouseleave="cursorNorm"
            @click="deletePanelGroup(indexj)"
            :config="{
              x: j[0].x,
              y: j[0].y,
              visible: fixElement,
            }"
          >
            <v-circle
              :config="{
                x: bredd1[indexj],
                y: 0,
                radius: 15,
                fill: '#ff0000',
                moveToTop: true,
              }"
            />

            <v-image
              :config="{
                image: imageTrash,
                x: bredd1[indexj] - 9,
                y: -10,
                width: 20,
                height: 20,
              }"
            />
          </v-group>

          <v-group>
            <v-line
              :config="{
                points: topLine[indexj],
                closed: false,
                stroke: '#0005',
                strokeWidth: 1,
              }"
            />
            <v-line
              :config="{
                points: leftLine[indexj],
                closed: false,
                stroke: '#0005',
                strokeWidth: 1,
              }"
            />
          </v-group>
        </v-group>
        <v-transformer
          ref="transformer"
          :config="{
            keepRatio: false,
            rotateEnabled: false,
            flipEnabled: false,
            anchorCornerRadius: 100,
          }"
        />
        <v-group
          v-for="(j, indexj) in panelar"
          v-bind:key="indexj"
          :config="{
            visible: fixElement,
          }"
        >
          <v-group
            @mouseover="cursorPoint"
            @mouseleave="cursorNorm"
            v-for="(i, index) in j"
            v-bind:key="index"
            @click="deletPanel(index, indexj)"
            :config="{
              x: i.x,
              y: i.y,
            }"
          >
            <v-circle
              :config="{
                x: bredd1[indexj] / 2,
                y: hojd1[indexj] / 2,
                width:
                  bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 2
                    : hojd1[indexj] / 2,
                height:
                  bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 2
                    : hojd1[indexj] / 2,
                fill: '#ff0000',
                draggable: false,
                moveToTop: true,
              }"
            />

            <v-image
              :config="{
                image: imageTrash,
                x:
                  bredd1[indexj] / 2 -
                  (bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 7
                    : hojd1[indexj] / 7),
                y:
                  hojd1[indexj] / 2 -
                  (bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 7
                    : hojd1[indexj] / 7),
                width:
                  bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 3.5
                    : hojd1[indexj] / 3.5,
                height:
                  bredd1[indexj] < hojd1[indexj]
                    ? bredd1[indexj] / 3.5
                    : hojd1[indexj] / 3.5,
              }"
            />
          </v-group>
   
        </v-group>
        <v-group v-for="(j, indexj) in panelar" v-bind:key="indexj">
          <v-line
            :config="{
              points: [
                fastTillBredd[indexj]
                  ? j[0].x + 5
                  : j[0].x + 6 + distMellanFäst[indexj],
                fastTillBredd[indexj]
                  ? j[0].y + distMellanFäst[indexj] + 3
                  : j[0].y + 16,
                fastTillBredd[indexj]
                  ? j[0].x + 5
                  : j[0].x -
                    6 +
                    distMellanFäst[indexj] +
                    ((fastTillBredd[indexj] ? hojd1[indexj] : bredd1[indexj]) -
                      distMellanFäst[indexj] * 2),
                fastTillBredd[indexj]
                  ? j[0].y +
                    distMellanFäst[indexj] -
                    3 +
                    ((fastTillBredd[indexj] ? hojd1[indexj] : bredd1[indexj]) -
                      distMellanFäst[indexj] * 2)
                  : j[0].y + 16,
              ],
              closed: false,
              stroke: '#22326C',
              strokeWidth: 1,
            }"
          />

          <!--((fastTillBredd[indexj]?hojd1[indexj]:bredd1[indexj]) - distMellanFäst[indexj]*2)-->
          <v-ellipse
            :config="{
              x: fastTillBredd[indexj]
                ? j[0].x + 5
                : j[0].x + bredd1[indexj] / 2,
              y: fastTillBredd[indexj]
                ? j[0].y + hojd1[indexj] / 2
                : j[0].y + 16,
              fill: '#22326C',
              radiusX: 20,
              radiusY: 10,
            }"
          />

          <v-text
            :config="{
              offsetX: fastTillBredd[indexj] ? 10 : 8,
              offsetY: fastTillBredd[indexj] ? 6 : 6,
              x: fastTillBredd[indexj]
                ? j[0].x + 5
                : j[0].x + bredd1[indexj] / 2,
              y: fastTillBredd[indexj]
                ? j[0].y + hojd1[indexj] / 2
                : j[0].y + 16,
              text:
                (fastTillBredd[indexj] ? hojd1[indexj] : bredd1[indexj]) -
                distMellanFäst[indexj] * 2,
              textAlign: 'center',
              fill: 'white',
              fontSize: 15,
            }"
          />



        </v-group>

      </v-layer>

      <v-layer>
        <v-rect
          :config="{
            x: 0,
            y: 0,
            width: w,
            height: 30,
            fill: '#fff',
            stroke: '#0005',
            strokeWidth: 1,
          }"
        />
        <v-rect
          :config="{
            x: 0,
            y: 0,
            width: 30,
            height: h,
            fill: '#fff',
            stroke: '#0005',
            strokeWidth: 1,
          }"
        />
        <v-text
          :config="{
            x: w - 150,
            y: h - 75,
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 9,
            offsetY: 10,
            fill: 'black',
            text: Math.round(scalePercentage * 100) + '%',
            fontSize: 30,
          }"
        />
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="zoomIn"
        >
          <v-circle
            :config="{
              x: w - 50,
              y: h - 100,
              width: 50,
              height: 50,
              fill: 'black',
            }"
          />
          <v-line
            :config="{
              points: [w - 50, h - 90, w - 50, h - 110],
              closed: false,
              stroke: '#fff',
              strokeWidth: 2,
            }"
          />
          <v-line
            :config="{
              points: [w - 40, h - 100, w - 60, h - 100],
              closed: false,
              stroke: '#fff',
              strokeWidth: 2,
            }"
          />
        </v-group>

        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="zoomOut"
        >
          <v-circle
            :config="{
              x: w - 50,
              y: h - 40,
              width: 50,
              height: 50,
              fill: 'black',
            }"
          />
          <v-line
            :config="{
              points: [w - 40, h - 40, w - 60, h - 40],
              closed: false,
              stroke: '#fff',
              strokeWidth: 2,
            }"
          />
        </v-group>

        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="addNewPanelGroup"
        >
          <v-circle
            :config="{
              x: w - 50,
              y: 120,
              width: 50,
              height: 50,
              fill: 'black',
            }"
          />

          <v-rect
            :config="{
              x: w - 63,
              y: 102,
              width: 26,
              height: 36,
              fill: '#fff',
            }"
          />

          <v-line
            :config="{
              points: [w - 50, 110, w - 50, 130],
              closed: false,
              stroke: '#000',
              strokeWidth: 2,
            }"
          />
          <v-line
            :config="{
              points: [w - 40, 120, w - 60, 120],
              closed: false,
              stroke: '#000',
              strokeWidth: 2,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="rotatePaler(markedGroup)"
        >
          <v-circle
            :config="{
              x: w - 110,
              y: 120,
              radius: 25,
              fill: 'black',
            }"
          />

          <v-rect
            :config="{
              x: w - 127,
              y: 118,
              width: 20,
              height: 30,
              fill: '#fff',
              rotation: -50,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="rotateFaster"
        >
          <v-circle
            :config="{
              x: w - 170,
              y: 120,
              radius: 25,
              fill: 'black',
            }"
          />

          <v-rect
            :config="{
              x: w - 187,
              y: 118,
              width: 20,
              height: 30,
              fill: '#fff',
              rotation: -50,
            }"
          />
          <v-rect
            :config="{
              x: w - 187,
              y: 115,
              width: 15,
              height: 35,
              fill: '#000',
              rotation: -50,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="deletRedPanel"
          :config="{
            x: w - 50,
            y: 180,
          }"
        >
          <v-circle
            :config="{
              radius: 25,
              fill: 'red',
            }"
          />
          <v-image
            :config="{
              image: imageTrash,
              x: -15,
              y: -15,
              width: 30,
              height: 30,
            }"
          />
        </v-group>

        <v-group :config="{}">
          <v-line
            v-for="i in rulerXB"
            v-bind:key="i"
            :config="{
              points: [i, 0, i, 30],
              closed: false,
              stroke: '#0005',
              strokeWidth: 1,
              x: scaleShiftX,
            }"
          />
          <v-line
            v-for="i in rulerXS"
            v-bind:key="i"
            :config="{
              points: [i, 0, i, 10],
              closed: false,
              stroke: '#0005',
              strokeWidth: 1,
              x: scaleShiftX,
            }"
          />
          <v-line
            v-for="i in rulerYB"
            v-bind:key="i"
            :config="{
              points: [0, i, 30, i],
              closed: false,
              stroke: '#0005',
              strokeWidth: 1,
              y: scaleShiftY,
            }"
          />
          <v-line
            v-for="i in rulerYS"
            v-bind:key="i"
            :config="{
              points: [0, i, 10, i],
              closed: false,
              stroke: '#0005',
              strokeWidth: 1,
              y: scaleShiftY,
            }"
          />
          <v-text
            v-for="(i, index) in rulerYB"
            v-bind:key="index"
            :config="{
              x: 15,
              y: i + 3 + scaleShiftY,
              text: index - (rulerYB.length - 1) / 2,
            }"
          />

          <v-text
            v-for="(i, index) in rulerXB"
            v-bind:key="index"
            :config="{
              x: i + 3 + scaleShiftX,
              y: 15,
              text: index - (rulerXB.length - 1) / 2,
            }"
          />
        </v-group>
        <v-rect
          :config="{
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            fill: '#fff',
            stroke: '#ccc',
            strokeWidth: 1,
          }"
        />
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="backProcess"
          @touchstart="backProcess"
          :config="{
            x: w - 50,
            y: 240,
            visible: !fixElement,
          }"
        >
          <v-circle
            :config="{
              radius: 25,
              fill: 'blue',
            }"
          />
          <v-image
            :config="{
              image: imageBack,
              x: -18,
              y: -15,
              width: 35,
              height: 35,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="completeProcess"
          @touchstart="completeProcess"
          :config="{
            x: w - 50,
            y: 240,
            visible: fixElement,
          }"
        >
          <v-circle
            :config="{
              radius: 25,
              fill: 'green',
            }"
          />
          <v-image
            :config="{
              image: imageCalc,
              x: -18,
              y: -15,
              width: 35,
              height: 35,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="fullCanvas"
          @touchstart="fullCanvas"
          :config="{
            x: w - 50,
            y: h - 160,
            visible: !fullToSmall,
          }"
        >
          <v-circle
            :config="{
              radius: 25,
              fill: 'black',
            }"
          />
          <v-image
            :config="{
              image: imageFullScreen,
              x: -22,
              y: -17,
              width: 45,
              height: 35,
            }"
          />
        </v-group>
        <v-group
          @mouseover="cursorPoint"
          @mouseleave="cursorNorm"
          @click="smallCanvas"
          @touchstart="smallCanvas"
          :config="{
            x: w - 50,
            y: h - 160,
            visible: fullToSmall,
          }"
        >
          <v-circle
            :config="{
              radius: 25,
              fill: 'black',
            }"
          />
          <v-image
            :config="{
              image: imageSmallScreen,
              x: -18,
              y: -17,
              width: 35,
              height: 35,
            }"
          />
        </v-group>
        <v-group
          :config="{
            x: w - 50,
            y: 300,
          }"
        >
          <v-text
            :config="{
              x: 0,
              y: 0,
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 100,
              offsetY: 12,
              fill: 'black',
              text: 'To top: ' + Math.round(-topDist[markedGroup]) + 'cm',
              fontSize: 15,
            }"
          />
          >
          <v-text
            :config="{
              x: 0,
              y: 0,
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 100,
              offsetY: -20,
              fill: 'black',
              text: 'To left: ' + Math.round(-leftDist[markedGroup]) + 'cm',
              fontSize: 15,
            }"
          />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<style>
.canvas {
  background-color: #ccc;
  margin: 2vw auto;
  box-shadow: 0px 0px 10px 5px #555;
}
.fullCanvas {
  position: fixed;
  width: 100vw;
  margin: 0;
  z-index: 5;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>