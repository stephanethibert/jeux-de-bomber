export class Bombe extends createjs.Bitmap {


    constructor(image) {

        super(image);
        this.addEventListener("added", this.animer.bind(this));



    }



    animer() {

        createjs.Tween
            .get(this)
            .to({y: this.stage.canvas.height+4500},5500 , createjs.Ease.cubicInOut)
    }
    detruire() {
        this.removeEventListener("added", this.animer.bind(this));

    }

}