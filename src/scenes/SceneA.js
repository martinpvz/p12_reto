class SceneA extends Phaser.Scene{
    constructor(){
        super({
            key: 'SceneA'
        });
    }

    init() {
        console.log('Escena SceneA');
    }
    
    create() {
        //BANDERAS CONTROL DE PANEO
        this.paneo = 0;
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.fadeIn(1500);
        this.cameras.main.setBounds(0, 0, 1580, 780);
        
        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            this.cameras.main.pan(100, 702, 2000);
            this.cameras.main.setZoom(5);
        });
        
        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
            if(this.paneo == 0){
                setTimeout( () => {
                    // PANEO A LA PUERTA(GONG)
                    this.cameras.main.pan(this.puerta.x, this.puerta.y, 2000);
                }, 1000);
                setTimeout( () => {
                    this.cameras.main.setZoom(1);
                }, 5000);
                this.paneo = 1;
            }
        });
        // CONTADOR VIDAS
        this.contadorVidas=3;
        //console.log(this.scene.manager.scenes)
        //MANEJO DE SCENE
        this.scene.moveAbove('SceneA','HUD');
        //MÚSICA
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(0.8);
        this.javier = this.physics.add.image(50, 700, 'ninja').setScale(0.1);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);

        // IMAGEN INSTRUCCIONES
        this.instrucciones = this.add.image(750,25, 'instrucciones').setDepth(4).setScale(0.28);
        //LAS INSTRUCCIONES DESAPARECEN DESPUÉS DE 19 SEGUNDOS
        setTimeout(() => {
            this.instrucciones.setAlpha(0);
        }, 19000);

        //BARRA DIAGONAL
        this.barraDiagonal = this.add.image(1250, 400, 'barraDiagonal').setScale(0.6);
        // ESCALERA 
        this.escalera = this.add.image(300, 215, 'escalera').setScale(0.8);
        //CUERDA
        this.cuerda = this.add.image(500, 334, 'cuerda').setScale(0.8);

        //ESCALAR BOTE
        this.escalar = this.add.image(970, 335, 'escalar').setScale(0.27);

        //PICOS
        var picos = this.physics.add.staticGroup();
        picos.create(1000, 760, 'picos').setScale(0.15).refreshBody();
        picos.create(310, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        picos.create(660, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        picos.create(1340, 760, 'picos').setScale(0.15).refreshBody();
        picos.create(1690, 760, 'picos').setScale(0.15).refreshBody();

        //BARRAS 
        var barraTiempo = this.physics.add.staticGroup();
        barraTiempo.create(980, 670, 'barraTiempo').refreshBody();
        barraTiempo.create(1120, 620, 'barraTiempo').refreshBody();
        barraTiempo.create(1260, 570, 'barraTiempo').refreshBody();
        barraTiempo.create(1400, 520, 'barraTiempo').refreshBody();

        this.barraTorre = this.physics.add.group();
        this.barraTorre.create(820, 575, 'barraElevador').setDepth(-1).setScale(0.5).refreshBody();

        this.barrasArriba = this.physics.add.staticGroup();
        this.barrasArriba.create(370,150, 'barraArriba2').setScale(0.6).refreshBody();
        this.barrasArriba.create(1460,190, 'barraPuerta').setScale(0.8).refreshBody();
        this.barrasArriba.create(1230,155, 'barraArriba1').setScale(0.6).refreshBody().disableBody(true,true);
        this.barrasArriba.create(1060,155, 'barraArriba1').setScale(0.6).refreshBody().disableBody(true,true);
        this.barrasArriba.create(890,155, 'barraArriba1').setScale(0.6).refreshBody().disableBody(true,true);

        var barrasHielo = this.physics.add.staticGroup();
        barrasHielo.create(650,155, 'barraArriba2').setScale(0.6).refreshBody();

        var barrasCuerda = this.physics.add.staticGroup();
        barrasCuerda.create(720,340, 'barraCF1').setScale(0.6).refreshBody()
        barrasCuerda.create(260,340, 'barraCF2').setScale(0.6).refreshBody()
        
        // TORRES
        var torres = this.physics.add.staticGroup();
        torres.create(150, 730, 'torre1').setScale(0.6).refreshBody();
        torres.create(300, 715, 'torre2').setScale(0.6).refreshBody();
        torres.create(450, 715, 'torre3').setScale(0.6).refreshBody();
        torres.create(600, 715, 'torre4').setScale(0.6).refreshBody();
        torres.create(760, 715, 'torre5').setScale(0.6).refreshBody();
        
        // PUERTA
        this.puerta = this.physics.add.image(1460, 135, 'puerta').setScale(0.7);
        this.puerta.body.setAllowGravity(false);
        this.puerta.body.setImmovable(true);  

        // COLECCIONABLE
        this.objeto = this.physics.add.image(650,100,'coleccionable').setScale(.3);
        this.objeto.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);
        function collectObjeto (jugador, objeto)
        {
            objeto.disableBody(true, true);
            console.log("aparecer barras");
            console.log(this.barrasArriba);
            this.barrasArriba.getChildren()[2].enableBody(false,0,0,true,true);
            this.barrasArriba.getChildren()[3].enableBody(false,0,0,true,true);
            this.barrasArriba.getChildren()[4].enableBody(false,0,0,true,true);
            this.registry.events.emit('getStar',1);
        }

        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        this.barraTorre.children.iterate( (torreT) => {
            torreT.setCollideWorldBounds(true);
            torreT.body.setAllowGravity(false);
        } );  

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalera, true );
        this.physics.add.existing(this.cuerda, true );
        this.physics.add.existing(this.barraDiagonal, true );
        this.physics.add.existing(this.puerta, true );
        this.physics.add.collider(this.javier, torres);

        this.physics.add.collider(this.javier, barraTiempo, () => {});
        this.physics.add.collider(this.javier, this.barraTorre, () => {});
        this.physics.add.collider(this.javier, this.barraDiagonal);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.escalera, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.barrasArriba);
        this.physics.add.collider(this.javier, barrasHielo, () => {});
        this.physics.add.collider(this.javier, this.barraPuerta);
        this.physics.add.collider(this.javier, barrasCuerda);
        this.physics.add.collider(this.javier, this.cuerda, () => {});

        //COLISIÓN con picos
        console.log(this.contadorVidas)
        this.physics.add.collider(this.javier, picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            this.contadorVidas -= 1;
            this.registry.events.emit('loseHeart',-1);
            this.javier.body.x=50;
            console.log(this.contadorVidas)
            if (this.contadorVidas==0){
                this.musicaFondo.stop();
                this.scene.start('GameOver');
            }
        });

        //COLISIÓN CON PUERTA / FINAL DE NIVEL
        this.physics.add.collider(this.javier, this.puerta, () => {
            this.sound.pauseAll();
            this.scene.start('SceneB', { score: this.contadorVidas });
        });
    }

    update(time, delta) {
        //Movimientos
        if (this.cursors.left.isDown)
        {
            this.javier.setVelocityX(-160);

            this.javier.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.javier.setVelocityX(160);

            this.javier.flipX=0;
        }
        else
        {
            this.javier.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.javier.body.onFloor())||(this.cursors.up.isDown && this.barraTorre.getChildren()[0].body.touching.up))
        {
            this.javier.setVelocityY(-500);
        }
        if (this.cursors.up.isDown && this.escalar.body.touching.right && this.javier.body.touching.left)
        {
            this.javier.y -= 3;
        }
        if (this.cursors.up.isDown && this.escalera.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.y -= 3;
        }

        if(this.barraTorre.getChildren()[0].y>769){
            this.barraTorre.getChildren()[0].disableBody(true, true);
        }

    }
}

export default SceneA;