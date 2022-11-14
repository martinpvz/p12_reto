class HUD extends Phaser.Scene{
    constructor(){
        super({
            key: 'HUD'
        });
    }

    init() {
        console.log('Escena HUD');
    }

    create() {
        // IMAGEN CORAZONES
        this.cora= this.add.image(1450, 40, 'heart').setScale(.25).setDepth(10).setTint('0x943126');
        this.cora2= this.add.image(1500, 40, 'heart').setScale(.25).setDepth(10).setTint('0x943126');
        this.cora3= this.add.image(1550, 40, 'heart').setScale(.25).setDepth(10).setTint('0x943126');

        // IMAGEN INSTRUCCIONES
        //this.instrucciones = this.add.image(250,500, 'instrucciones').setDepth(4).setScale(0.15);
        
        // IMAGEN ESTRELLITA
        this.star = this.add.image(40, 40, 'coleccionable').setScale(.35).setDepth(10).setTint('0x943126');
       
        // VARIABLES de Estrellas
        this.data.set('estrellas',0);
        console.log(this.data.list);
        // TEXTO CONTADOR ESTRELLA
        this.starTexto = this.add.text(70,30,'0/4',{fontFamily: 'Consolas',color: '#f8f9f9',fontSize: '22px'}).setDepth(1);

        // VARIABLES de Datos
        this.data.set('vidas', 3);


        //  ESCUCHA EVENTO loseHeart perder una vida
        this.registry.events.on('loseHeart', (dato) => {
            this.data.list.vidas += dato;
            console.log(this.data.query('vidas'))
            if(this.data.list.vidas==2){
                this.cora.setAlpha(0);
            }
            if(this.data.list.vidas==1){
                this.cora2.setAlpha(0);
            }
            if(this.data.list.vidas==0){
                this.cora3.setAlpha(0);
                this.data.setValue('vidas', 3);
                this.data.set('estrellas',0);
                this.starTexto.text = this.data.list.estrellas + '/4';
                setTimeout(() => {
                    this.scene.pause('HUD');
                    console.log("Se pausó escena HUD");
                }, 1000);
                setTimeout(() => {
                        this.scene.resume('HUD');
                        console.log("Se reanudó escena HUD");
                        this.cora.setAlpha(1);
                        this.cora2.setAlpha(1);
                        this.cora3.setAlpha(1);
                }, 2000);     
            }
        });

        // Escucha EVENTO getStar obtener una estrella ninja
        this.registry.events.on('getStar', (dato) => {
            this.data.list.estrellas += dato;
            this.starTexto.text = this.data.list.estrellas + '/4';
            console.log(this.data.query('estrellas'));
        });
        
        // Escucha EVENTO de GANAR
        this.registry.events.on('YouWin', () => {
            setTimeout(() => {
                this.scene.pause('HUD');
                console.log("Se pausó escena HUD");          
            }, 1000);
            setTimeout(() => {
                this.scene.resume('HUD');
                console.log("Se reanudó escena HUD");
                this.cora.setAlpha(1);
                this.cora2.setAlpha(1);
                this.cora3.setAlpha(1);
            }, 2000);
            this.data.setValue('vidas', 3);
            this.data.set('estrellas',0);
            this.starTexto.text = this.data.list.estrellas + '/4';

        });


    }
    
    update(time, delta) {
    }
}

export default HUD;