"use strict";
cc._RFpush(module, '3ee3eXYdUxGyp3lPj2plkSQ', 'WaitScript');
// Script/WaitScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.angle = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.angle += dt * 360;

        if (this.angle > 360) {
            this.angle -= 360;
        }

        this.node.rotation = this.angle;
    }
});

cc._RFpop();