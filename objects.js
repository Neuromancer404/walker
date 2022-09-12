export default class{
    constructor(THREE){
        this.THREE = THREE;
    }
    floor(){
        const helper = new this.THREE.GridHelper(1000, 100, 50, 50);
        helper.position.x = 0;
        helper.position.y = 0;
        helper.position.z = 0;
    
        return( helper );
    }
}
