import {insertAfterLastOccurrence} from '@angular/cli/lib/ast-tools';
import {Party} from '../party';

const jsPlumb = require('jsplumb').jsPlumb;
const jsPlumbUtil = require('jsplumb').jsPlumbUtil;

export class PartyChart {
  private instance: any;
  private party: Party;
  private conteinerId: string;

  constructor(party: Party, conteinerId) {
    let me = this;
    this.party = party;
    this.conteinerId = conteinerId;
    jsPlumb.ready(function () {
      me.init();
    })
  }

  getInstance() {
    if (this.instance == null) {
      this.instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 2}],
        Connector: "StateMachine",
        HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2},
        ConnectionOverlays: [
          ["Arrow", {
            location: 1,
            id: "arrow",
            length: 14,
            foldback: 0.8
          }],
          ["Label", {label: "FOO", id: "label", cssClass: "aLabel"}]
        ],
        Container: this.conteinerId
      });
    }
    return this.instance;
  }

  initNode(el) {
    let instance = this.getInstance();
    // initialise draggable elements.
    instance.draggable(el);

    instance.makeSource(el, {
      filter: ".ep",
      anchor: "Continuous",
      connectorStyle: {stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4},
      connectionType: "basic",
      extract: {
        "action": "the-action"
      },
      maxConnections: 2,
      onMaxConnections: function (info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });

    instance.makeTarget(el, {
      dropOptions: {hoverClass: "dragHover"},
      anchor: "Continuous",
      allowLoopback: true
    });

    // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
    // version of this demo to find out about new nodes being added.
    //
    instance.fire("jsPlumbDemoNodeAdded", el);
  };

  newNode(x, y) {
    let instance = this.getInstance();
    let d = document.createElement("div");
    let id = jsPlumbUtil.uuid();
    d.className = "w";
    d.id = id;
    d.innerHTML = id.substring(0, 7) + "<div class=\"ep\"></div>";
    d.style.left = x + "px";
    d.style.top = y + "px";
    instance.getContainer().appendChild(d);
    this.initNode(d);
    return d;
  };

  init() {
    let instance = this.getInstance();
    let me = this;
    instance.registerConnectionType("basic", {anchor: "Continuous", connector: "StateMachine"});
    let canvas = document.getElementById("canvas");
    let windows = jsPlumb.getSelector(".w");
    instance.bind("click", function (c) {
      instance.deleteConnection(c);
    });
    instance.bind("connection", function (info) {
      info.connection.getOverlay("label").setLabel(info.connection.id);
    });

    // bind a double click listener to "canvas"; add new node when this occurs.
    jsPlumb.on(canvas, "dblclick", function (e) {
      me.newNode(e.offsetX, e.offsetY);
    });

    // suspend drawing and initialise.
    instance.batch(function () {
      windows.forEach(function (w) {
        me.initNode(w);
      });
      // and finally, make a few connections
      instance.connect({source: "opened", target: "phone1", type: "basic"});
      instance.connect({source: "phone1", target: "phone1", type: "basic"});
      instance.connect({source: "phone1", target: "inperson", type: "basic"});
      instance.connect({
        source: "phone2",
        target: "rejected",
        type: "basic"
      });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
  }
}
