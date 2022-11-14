class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }
    preload() {
        //PARA MENU
        this.load.path = './assets/';
        this.load.image(['nube','fondo2','play','info','conf','logo2','sound','noSound','infoCuadro','noobLovers']);
        this.load.audio('pop', ['./pop.mp3']);
        this.load.audio('InicioM', ['./InicioM2.mp3']);
        //PARA ESCENA A
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        'escalera', 'ninja','fondo_opc1','coleccionable','end','instrucciones']);
        this.load.audio('gong', ['./gong.mp3']);
        this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA B
        this.load.image(['barraArriba1', 'barraArriba2', 'barraArriba3', 'barraArriba4', 'barraPuerta', 'puerta', 'barraCF1', 'barraCF2', 
        'cuerda', 'torre1', 'torre2', 'torre3', 'torre4', 'torre5', 'barraElevador', 'picos', 'barraTiempo', 'escalar', 'barraDiagonal',
        'escalera', 'ninja','fondo_opc1','coleccionable','end']);
        this.load.audio('gong', ['./gong.mp3']);
        this.load.audio('musicaFondo', ['./musicaFondo.mp3']);
        //PARA ESCENA GAMEOVER
        this.load.image(['gameOverBack','botonMenu2']);
        this.load.audio('gameOver', ['./game_over.mp3']);
        //PARA ESCENA YOU WIN
        this.load.image(['winBack','botonMenu']);
        this.load.audio('win', ['./winner.mp3']);
        //PARA ESCENA HUD
        this.load.image(['heart'])
    }

    create(){
        this.scene.start('Menu');
        this.scene.launch('HUD');
        console.log(this.scene.manager.scenes)
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Bootloader;