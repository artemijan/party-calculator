import {Party} from '../party';
import * as $ from 'jquery';
import {PartyGood, User} from '../../member/user';
import {Good} from '../../good/good';
import * as _ from 'underscore';

const jsPlumb = require('jsplumb').jsPlumb;

export class PartyChart {
  private instance: any;
  private party: Party;
  private conteinerId: string;

  constructor(party: Party, containerId) {
    let me = this;
    this.party = party;
    this.conteinerId = containerId;
    jsPlumb.ready(function () {
      me.init();
    })
  }

  getInstance() {
    if (this.instance == null) {
      this.instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 5, cssClass: 'endpoint'}],
        Connector: "StateMachine",
        HoverPaintStyle: {strokeStyle: "#F15A29", lineWidth: 2},
        Anchors: ["TopCenter", "BottomCenter"],
        Container: this.conteinerId
      });
    }
    return this.instance;
  }

  initNode(el) {
    let instance = this.getInstance();
    // initialise draggable elements.
    instance.draggable(el);
  };

  newNode(s) {
    let instance = this.getInstance();
    let d = $(s.template);
    d.attr("id", s.name);
    d.css({left: s.position.x, top: s.position.y});
    instance.getContainer().appendChild(d[0]);
    this.initNode(d[0]);
    return d;
  };

  getConnectorOptions() {
    return {
      connector: "Bezier",
      paintStyle: {lineWidth: 5, strokeWidth: 2, strokeStyle: "#056", stroke: "black"},
      hoverPaintStyle: {strokeStyle: "#dbe300"},
      endpoint: "Blank",
      anchor: "Continuous",
      overlays: [["PlainArrow", {location: 1, width: 15, length: 12}]]
    }
  }

  getPredefinedPositions() {
    return [
      {x: 20, y: 20},
      {x: 80, y: 170},
      {x: 220, y: 20},
      {x: 20, y: 320},
      {x: 20, y: 420},
      {x: 320, y: 20}
    ];
  }

  convertMemberToSource(member: User, position) {
    return {
      name: this.generateId(member.id),
      position: position,
      template: "<div class='source-item'>" + member.nameFirst + ", " + member.nameLast + "</div>"
    };
  }

  connect = (connection) => {
    let instance = this.getInstance(), me = this;
    instance.connect({
      source: me.generateId(connection.from),
      label: connection.count + " $",
      target: me.generateId(connection.to)
    }, me.getConnectorOptions());
  };

  generateId(id) {
    return "chart-item-" + id;
  }

  init() {
    let me = this, sources = [], predefinedPositions = this.getPredefinedPositions(), goodsTotals = [],
      connections = [];
    this.party.members.forEach(function (member: User, index) {
      sources.push(me.convertMemberToSource(member, predefinedPositions[index]));
    });
    me.party.goods.forEach(function (good: Good) {
      goodsTotals.push(_.extend({
        totals: {
          spent: me.party.getTotalSpent(good),
          consumed: me.party.getTotalConsumed(good)
        }
      }, good));
    });

    me.party.members.forEach(member => {
      member.partyGoods.forEach(partyGood => {
        let good = _.findWhere(goodsTotals, {id: partyGood.goodId});
        let buyers = good.buyers.filter(function (buyer) {
          return buyer.userId !== member.id;
        });
        buyers.forEach(buyer => {
          let opposite = _.findWhere(connections, {from: buyer.userId, to: member.id}),
            currentCount = good.totals.spent * ((partyGood.goodCount / good.totals.consumed) * (buyer.totalPrice / good.totals.spent));
          if (opposite) {
            if (opposite.count - currentCount === 0) {
              connections = connections.filter(c => c !== opposite);
            } else if (opposite.count > currentCount) {
              opposite.count = opposite.count - currentCount;
            } else {
              connections = connections.filter(c => c !== opposite);
              connections.push({
                from: member.id,
                to: buyer.userId,
                count: currentCount - opposite.count
              });
            }
          } else {
            connections.push({
              from: member.id,
              to: buyer.userId,
              count: currentCount
            });
          }
        });
      });
    });
    sources.forEach(s => {
      me.newNode(s);
    });
    connections.forEach(c => {
      me.connect(c);
    });
  }
}
