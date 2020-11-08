export class Frapper extends createjs.Sprite {


    constructor(frapper) {

        super(frapper);

        this.gotoAndPlay("frapper");

        this.addEventListener('animationend', this.detruire.bind(this));


    }


    detruire() {

        this.removeAllEventListeners();
        window.setTimeout(() => {

            this.parent.removeChild(this);

        }, 300);

    }


}