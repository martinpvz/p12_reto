class SceneB extends Phaser.Scene{
    constructor(){
        super({
            key: 'SceneB'
        });
    }

    init(data) {
        console.log('Escena SceneB');
        console.log('init', data);
        this.finalScore = data.score;
    }
    

    create() {
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.fadeIn(2000);
        //MÚSICA
        this.gong = this.sound.add('gong',{loop:false});
        this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        this.musicaFondo.play();
        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 395, 'fondo_opc1').setScale(1.1).setDepth(-3).setAlpha(0.8);
        this.end = this.add.image(250, 80, 'end').setScale(0.15).setDepth(4).setAlpha(0);
        this.javier = this.physics.add.image(50, 10, 'ninja').setScale(0.1);
        this.javier.body.setSize(200, 500);
        this.javier.body.setOffset(180,0);
        this.javier.body.setMass(1);
        
        //Picos
        this.picos = this.physics.add.staticGroup();
        this.picos.create(1000, 760, 'picos').setScale(0.15).refreshBody();
        this.picos.create(310, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        this.picos.create(660, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        this.picos.create(1340, 760, 'picos').setScale(0.15).refreshBody();
        this.picos.create(1690, 760, 'picos').setScale(0.15).refreshBody();
        this.picos.create(-20, 760, 'picos').setScale(0.15).setDepth(-1).refreshBody();
        this.picos.create(1440, 395, 'picos').setScale(0.13).setDepth(-1).refreshBody(); //Picos arriba
        
        //BarrasPicos
        this.barrasPicos = this.physics.add.staticGroup();
        this.barrasPicos.create(160,650, 'barraArriba2').setScale(0.6).refreshBody().disableBody(true,true); //BarraPicos1
        this.barrasPicos.create(480,550, 'barraArriba2').setScale(0.6).refreshBody(); //BarraPicos2
        this.barrasPicos.create(800,470, 'barraTiempo').setScale(0.6).refreshBody(); //BarraPicos3
        this.barrasPicos.create(1100,430, 'barraArriba2').setScale(0.6).refreshBody(); //BarraPicos4
        this.barrasPicos.create(1440,420, 'barraTiempo').setScale(2,1).refreshBody();  //BarraPicos5
        this.barrasPicos.create(1465,718, 'barraPuerta').setScale(0.8).refreshBody(); //Barra Picos6
        
        //Torres
        this.torres = this.physics.add.staticGroup();
        this.torres.create(900, 730, 'torre1').setScale(0.6).refreshBody().disableBody(true,true);
        this.torres.create(1110, 715, 'torre1').setScale(0.6).refreshBody().disableBody(true,true);
        this.torres.create(1305, 600, 'torre5').setScale(0.7).refreshBody();
        
        //Puerta
        this.puerta = this.physics.add.image(1460, 660, 'puerta').setScale(0.7);
        this.puerta.body.setAllowGravity(false);
        this.puerta.body.setImmovable(true);

        //GRUPO BARRAS ARRIBA
        this.barrasArriba = this.physics.add.staticGroup();
        this.barrasArriba.create(45,150, 'barraArriba1').setScale(0.6).refreshBody()
        this.barrasArriba.create(200,200, 'barraArriba1').setScale(0.6).refreshBody();
        this.barrasArriba.create(810,255, 'barraArriba1').setScale(0.8).refreshBody();
        this.barrasArriba.create(1450,200, 'barraArriba1').setScale(0.6).refreshBody();

        //ESCALAR
        this.escalar = this.add.image(450, 300, 'escalar').setScale(0.27);
        this.escalar2 = this.add.image(1375, 247, 'escalar').setScale(0.27);

        //CUERDA
        this.cuerda = this.add.image(590, 246, 'cuerda').setScale(0.75);

        //COLECCIONABLES
        this.objeto = this.physics.add.image(1400,100,'coleccionable').setScale(.3);
        this.objeto.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto, collectObjeto1, null, this);
        this.objeto2 = this.physics.add.image(1450,250,'coleccionable').setScale(.3);
        this.objeto2.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto2, collectObjeto2, null, this);
        this.objeto3 = this.physics.add.image(20,450,'coleccionable').setScale(.3);
        this.objeto3.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto3, collectObjeto3, null, this);
        
        function collectObjeto1 (jugador, objeto)
        {
            objeto.disableBody(true, true);
            console.log("Entro a collectObjeto");
            this.torres.getChildren()[0].enableBody(false,0,0,true,true);
            this.picos.getChildren()[6].disableBody(true,true);
            this.registry.events.emit('getStar',1);
        }
        

        function collectObjeto2(jugador, objeto)
        {
            objeto.disableBody(true, true);
            this.barrasPicos.getChildren()[0].enableBody(false,0,0,true,true);
            this.torres.getChildren()[1].enableBody(false,0,0,true,true);
            this.registry.events.emit('getStar',1);
        }
        
        function collectObjeto3(jugador, objeto)
        {
            objeto.disableBody(true, true);
            this.barrasPicos.getChildren()[2].disableBody(true,true);
            this.torres.getChildren()[2].disableBody(true,true);
            this.registry.events.emit('getStar',1);
        }


        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalar2, true );
        this.physics.add.existing(this.cuerda, true );
        
        //COLISIÓN ESCALAR 2
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });

        this.physics.add.collider(this.javier, this.escalar2, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        
        //COLISIÓN BARRAS PICOS
        this.physics.add.collider(this.javier, this.barrasPicos);

        //COLISIÓN TORRES
        this.physics.add.collider(this.javier, this.torres);

        //COLISIÓN BARRAS ARRIBA
        this.physics.add.collider(this.javier, this.barrasArriba);
        this.physics.add.collider(this.javier, this.cuerda, () => {
            this.javier.setVelocityX(0);
            this.javier.setAccelerationX(0);
        });
        
        //COLISIÓN CON PICOS
        this.physics.add.collider(this.javier, this.picos, () => {
            this.cameras.main.shake(500,0.008);
            this.finalScore -= 1;
            this.registry.events.emit('loseHeart',-1);
            this.javier.body.x=50;
            this.javier.body.y=10;
            if (this.finalScore==0){
                this.sound.pauseAll();
                this.scene.start('GameOver');
            }
        });

        //COLISIÓN CON PUERTA / FINAL DE NIVEL
        this.physics.add.collider(this.javier, this.puerta, () => {
            this.sound.pauseAll();
            this.registry.events.emit('YouWin');
            this.scene.start('Win');
        });
    }


    update(time, delta) {
        //MOVIMIENTOS
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

        if ((this.cursors.up.isDown && this.javier.body.onFloor()))
        {
            this.javier.setVelocityY(-500);
        }

        //PARA ESCALAR
        if (this.cursors.up.isDown && this.escalar.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.y -= 3;
        }

        if (this.cursors.up.isDown && this.escalar2.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.y -= 3;
        }

    }


}

export default SceneB;