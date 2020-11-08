export class Explosion extends createjs.Sprite {


    constructor(quelexplosion) {

        super(quelexplosion);

        this.gotoAndPlay("explosion");

        this.addEventListener('animationend', this.detruire.bind(this));


    }


    detruire() {

        this.removeAllEventListeners();
        window.setTimeout(() => {

            this.parent.removeChild(this);

        }, 300);

    }


}