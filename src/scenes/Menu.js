class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: 'Menu'
        });
    }

    init() {
        console.log('Escena Inicio');
    }

    create(){
        this.scene.moveAbove('Bootloader','HUD');
        // Banderas
        this.click1 = false;
        this.click2 = false;
        this.noSound = false;
        // IMÁGENES DE MENÚ
        this.fondo = this.add.image(800,400, 'fondo2').setScale(.37,.33);
        this.logo = this.add.image(450,320, 'logo2').setScale(1).setDepth(4);
        this.noobLovers = this.add.image(420,100, 'noobLovers').setScale(.5).setDepth(4);
        this.play = this.add.image(430,600, 'play').setScale(.25).setInteractive().setDepth(4);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0,0,1580,780);
        this.cameras.main.fadeIn(1500);
        // MÚSICA DE FONDO
        this.mainmenu = this.sound.add('InicioM', {loop:false,volume: 0.8});
        this.mainmenu.play();
        // SONIDO CLICK SOBRE BOTÓN
        this.pop = this.sound.add('pop', {loop:false,volume: 0.3});
        // CONSTANTE EVENTOS
        const eventos = Phaser.Input.Events;
        // Nubes derecha
        this.nube1 = this.add.image(-200,150, 'nube').setAlpha(0.2).setScale(0.6);
        this.nube2 = this.add.image(50,150, 'nube').setAlpha(0.2).setScale(0.3);
        this.nube3 = this.add.image(200,600, 'nube').setAlpha(0.2).setScale(0.6);
        this.nube6 = this.add.image(90,580, 'nube').setAlpha(0.2).setScale(0.2);
        this.nube7 = this.add.image(-90,580, 'nube').setAlpha(0.2).setScale(0.8);
        this.nube9 = this.add.image(-50,460, 'nube').setAlpha(0.2).setScale(0.3);

        //Nube izquierda
        this.nube4 = this.add.image(1800,580, 'nube').setAlpha(0.2);
        this.nube5 = this.add.image(1500,360, 'nube').setAlpha(0.2).setScale(0.5);
        this.nube8 = this.add.image(1600,50, 'nube').setAlpha(0.2).setScale(0.3);
        this.timeline = this.tweens.createTimeline(); 
        this.timeline2 = this.tweens.createTimeline(); 

        // TIMELINES NUBES DERECHA
        this.timeline = this.tweens.timeline({
            targets: [this.nube1,this.nube2,this.nube3,this.nube6,this.nube7,this.nube9],
            paused: true,
            loop: -1,
            totalDuration: 80000,
            tweens: [
                {
                    x: 1800,
                    yoyo:true,
                    repeat:-1,
                },
            ]
        });
        this.timeline.play();

        // TIMELINES NUBES IZQUIERDA
        this.timeline2 = this.tweens.timeline({
            targets: [this.nube4,this.nube5,this.nube8],
            paused: true,
            loop: -1,
            totalDuration: 90000,
            tweens: [
                {
                    x: -300,
                    yoyo:true,
                    repeat:-1,
                },
            ]
        });
        this.timeline2.play();
        
        //EVENTOS PARA MOUSE
        this.input.on(eventos.GAMEOBJECT_OVER,(event,gameObject)=>{
            gameObject.setScale(.3);
        });
        this.input.on(eventos.GAMEOBJECT_OUT,(event,gameObject)=>{
            gameObject.setScale(.25);
        });
        this.input.on(eventos.GAMEOBJECT_DOWN,(event,gameObject)=>{
            if(this.noSound == false){
                this.pop.play();
            }
        });
        // EVENTO SÓLO PARA PLAY
        this.play.on(eventos.POINTER_DOWN, function () {
            this.sound.pauseAll();
            this.scene.start("SceneA");         
        }, this);
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Menu;