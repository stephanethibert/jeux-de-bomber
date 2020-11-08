


export class Heros extends createjs.Sprite {


    constructor(quelsprite,capteur) {

        super(quelsprite,capteur);


        this.ecouteurTouchePesee = this.animer.bind(this);
        window.addEventListener("keydown", this.ecouteurTouchePesee);
        this.debutanimaiton();

    }



    debutanimaiton(){

        this.gotoAndPlay("droite");
        createjs.Tween
            .get(this)
            .to({x: 100}, 1500, createjs.Ease.linear)
            .call(this.arrteaniamiton)

    }
    arrteaniamiton(){


        this.animer.bind(this);



        this.gotoAndStop("droite")

    }




    animer(e) {



       if(e.key==='ArrowLeft'){

            if (this.currentAnimation === "droite") this.stop();
            if (this.paused) this.gotoAndPlay("gauche");

            createjs.Tween
                .get(this)
                .to({x: 10}, 1500, createjs.Ease.linear);


        }


       else  if(e.key==='ArrowRight'){
         if (this.currentAnimation === "gauche") this.stop();
         if (this.paused) this.gotoAndPlay("droite");

         createjs.Tween
                .get(this)
                .to({x: 1000}, 1500, createjs.Ease.linear);



        };





    }

    detruire(){


        this.removeAllEventListeners();
        window.setTimeout(() => {

            this.parent.removeChild(this);

        }, 300);

    }


}













