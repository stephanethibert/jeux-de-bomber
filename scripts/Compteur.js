export class Compteur extends createjs.
    Container {

    constructor(quelJeu, atlas) {
        super(atlas);

        this.temps = 0;
        this.jeu = quelJeu;
        this.ajouterTimer();

        window.setInterval(this.modifierTemps.bind(this), 1000);
    }

    ajouterTimer() {
        this.seconde = new createjs.Text(this.temps, this.jeu.parametres.textes.format, "black");
        this.seconde.regX = this.seconde.getMeasuredWidth() / 2;
        this.seconde.x = 640;
        this.seconde.y = 25;
        this.seconde.cache(0, 0, this.seconde.getBounds().width + 500, this.seconde.getBounds().height);
        this.addChild(this.seconde);
    }

    modifierTemps() {
        this.seconde.text = this.temps++;
        this.seconde.updateCache();

        if (this.temps ===63) {
            this.jeu.terminer();


        }
    }

    detruire() {
        this.parent.removeChild(this);
    }


}