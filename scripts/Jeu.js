
import {Heros} from './Heros.js';
import {Bombe} from './Bombe.js';
import {Explosion} from './Explosion.js';
import {Frapper} from './Frapper.js';
import {Compteur} from './Compteur.js';

export class Jeu {

    constructor() {
        console.log("hello")
        this.parametres = null;
        this.pointage = 0;
        this.canvas = document.querySelector('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;





        this.precharger("ressources/manifest.json")
            .then(this.initialiserCreateJs.bind(this))
            .then(this.demarer.bind(this))

    }

    precharger(manifeste) {


        return new Promise((resolve, reject) => {


            this.chargeur = new createjs.LoadQueue();
            this.chargeur.installPlugin(createjs.Sound);
            this.chargeur.addEventListener("complete", resolve);
            // this.chargeur.addEventListener("error",reject);
            this.chargeur.loadManifest(manifeste);
            this.parametres = {
                textes: {
                    format: "60px 'Pixel'",
                    couleur: '#bd7b0b'
                }
            };

        })



    }

    initialiserCreateJs() {

        this.stage = new createjs.StageGL(this.canvas)
        this.stage.setClearColor('#FFF');

        createjs.Ticker.on('tick', e => this.stage.update(e));

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

        createjs.Ticker.framerate = 60;



    }


    demarer() {



    this.stage.removeChild(this.menuintro);


    this.ajouterdecors();


    this.ajouteheros();

    this.bombeajouter2 =window.setInterval(this.actualiserajouterbombe.bind(this), 1000);

    this.quelleFonctionEcouteur = (this.detecter.bind(this));


    this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);


    window.addEventListener("keydown", this.ecouteurTouchePesee);
    this.quelleFonctionEcouteur2 = (this.actualiser.bind(this));

    createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur);
    createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur2);

    this.interface = new createjs.Container();
    this.interface.width = 200;
    this.compteur = new Compteur(this,this.chargeur.getResult(Compteur));
    this.interface.x = this.canvas.width / 2 - this.interface / 2;
    this.pointagePerso = new createjs.Text(this.pointage, this.parametres.textes.format, "#5fb2ce");
    this.pointagePerso.cache(0, 0, 200, this.pointagePerso.getBounds().height);
    this.pointagePerso.x = 200;
    this.pointagePerso.y = 25;

    this.interface.addChild(this.pointagePerso, this.compteur);
    this.stage.addChild(this.interface);
    createjs.Sound.play("music", {"loop": 0, "volume": 0.5});


}









    ajouterdecors() {


        this.background = [
            new createjs.Bitmap(this.chargeur.getResult("background0"), true),
            new createjs.Bitmap(this.chargeur.getResult("background1"), true)
        ];

        this.stage.addChild(this.background[0], this.background[1]);

        this.background[0].x = 0;
        this.background[1].x = 2478;


    }

    ajouteheros() {


        this.heros = new Heros(this.chargeur.getResult("heros"),this.capteur);
        this.stage.addChild(this.heros);
        this.heros.x = -500;
        this.heros.y = this.stage.canvas.height / 2;
    }

    actualiserajouterbombe(range) {


       this.bombeajouter=new Bombe(this.chargeur.getResult("bombe"));
        this.bombeajouter.x = Math.floor(Math.random() * this.stage.canvas.width);
        this.stage.addChild(this.bombeajouter);
    }

    actualiser(e) {
        if (this.mouvement === 'droite') {
            this.background.forEach(function (element) {
                element.x -= 20;
            });


            if (this.background[0].x + this.background[1].image.width < 0) {
                this.background[0].x = this.background[1].x + 2478;
                this.background.push(this.background.shift())

            }

        } else if (this.mouvement === 'gauche') {

            this.background.forEach(function (element) {
                element.x += 20;

            });
            if (this.background[0].x > 0) {

                this.background[1].x = this.background[0].x - this.background[1].image.width;
                this.background.unshift(this.background.pop())

            }
        }


    }

    gererTouchePesee(e) {

        if (e.key === 'ArrowRight') {
            this.mouvement = 'droite';


        } else if (e.key === 'ArrowLeft') {
            this.mouvement = 'gauche';

        }

    }





        ajusterPointagePerdants(points) {
        this.pointagePerso.text = parseInt(this.pointagePerso.text) + points;
        this.pointagePerso.updateCache();


    }


    detecter() {
        let bombe = this.stage.children.filter(item => item instanceof Bombe);


        bombe.forEach(bombe => {

            // Vérification d'une collision entre un heros et le bombe
            let point = this.heros.globalToLocal(bombe.x, bombe.y);
            if (this.heros.hitTest(point.x, point.y)) {
                bombe.detruire();
                const explosion = new Explosion(this.chargeur.getResult('explosion'));
                const frapper = new Frapper(this.chargeur.getResult('frapper'));
                explosion.x = this.heros.x;
                explosion.y = this.heros.y;
                frapper.y = this.heros.y;
                frapper.x = this.heros.x;

                this.stage.addChild(explosion);
                this.stage.addChild(frapper);
                this.ajusterPointagePerdants(-20);
                this.heros.detruire();
                window.setTimeout(this.bombeajouter, 4000);
                this.actualiserajouterbombe();
                this.ajouteheros();

                createjs.Sound.play("explosion1", {"loop": 0, "volume": 1});

            }


        })


    }


    terminer() {
        this.heros.detruire();
        this.compteur.detruire();

        clearInterval(this.bombeajouter2);
        createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
        createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur2);
        createjs.Sound.stop("explosion1", {"loop": 0, "volume": 1});
        createjs.Sound.stop("music", {"loop": 0, "volume": 1});



        this.demarer()

    }


}