class Win extends Phaser.Scene{
    constructor(){
        super({
            key: 'Win'
        });
    }

    init() {
        console.log('Escena Win');
    }
    
    create(){
        //CAMARA INICIAL EFECTO FLASH
        this.cameras.main.flash(2000);
        //IMÁGENES
        this.fondo = this.add.image(775, 395, 'winBack').setScale(.37,.33);
        this.menu = this.add.image(800, 650, 'botonMenu').setScale(.25).setInteractive();
        //SONIDOS
        this.pop = this.sound.add('pop', {loop:false,volume: 0.3});
        this.winMusic = this.sound.add('win', {loop:false});
        this.winMusic.play();
        //CONSTANTE EVENTOS
        const eventos = Phaser.Input.Events;
        //EVENTOS PARA MOUSE
        this.input.on(eventos.GAMEOBJECT_OVER,(event,gameObject)=>{
            gameObject.setScale(.3);
        });
        this.input.on(eventos.GAMEOBJECT_OUT,(event,gameObject)=>{
            gameObject.setScale(.25);
        });
        this.input.on(eventos.GAMEOBJECT_DOWN,(event,gameObject)=>{
            this.pop.play();
        });
        //EVENTO CLICK MENU
        this.menu.on(eventos.POINTER_DOWN, function () {
            this.sound.pauseAll();
            this.scene.start("Menu");         
        }, this);
    }

    update(time, delta) {
    }
}

export default Win;