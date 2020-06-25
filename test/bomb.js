refreshBomb:function(){

    for(var i=0;i< this.tBomb.length;i++){
        var oBomb= this.tBomb[i];
        if(oBomb.life < 14){
            //pendant 14 iterations, on va alterner entre deux sprites
            if(oBomb.life % 2 ){
                oBomb.idImg='bomb-0';
            }else{
            oBomb.idImg='bomb-1';
            }
        }else if(oBomb.life < 17){
            //puis animation d'explosion
            if(oBomb.life % 2 ){
                oBomb.idImg='explosion';
            }else{
                oBomb.idImg='explosion-1';
            }
        }else if(oBomb.life < 19){
            oBomb.idImg='explosion-2';
        }else{
            oBomb.idImg='explosion-finish';
        }

        oBomb.life++;

        //on broadcast l'animation de la bombe
        oBomb.animateBroadcast(oBomb.idImg);
    }

},


build:function(){

    if(this.idImg=='explosion' || this.idImg=='explosion-1' || this.idImg=='explosion-2'){
        for(var i=-2;i< 3;i++){
            oLayer_bomb.clearRect(((this.x+i)*widthCase),(this.y*heightCase),widthCase,widthCase);
            oLayer_bomb.clearRect(((this.x)*widthCase),((this.y+i)*heightCase),widthCase,widthCase);

            if(map.tMap[this.y][this.x+i]==1){
                oImages.drawImageOnLayer(this.idImg,((this.x+i)*widthCase),(this.y*heightCase),widthCase,widthCase,'bomb');
            }
            if(map.tMap[this.y+i][this.x]==1){
                oImages.drawImageOnLayer(this.idImg,((this.x)*widthCase),((this.y+i)*heightCase),widthCase,widthCase,'bomb');
            }
        }

    }else if(this.idImg=='explosion-finish'){
        for(var i=-2;i< 3;i++){
            oLayer_bomb.clearRect(((this.x+i)*widthCase),(this.y*heightCase),widthCase,widthCase);
            oLayer_bomb.clearRect(((this.x)*widthCase),((this.y+i)*heightCase),widthCase,widthCase);

            var oPersoVictim=oGame.getPerso(this.x+i,this.y);
            if(oPersoVictim){
                oGame.removeBroadcastPersoById(oPersoVictim.id);
                console.log('remove '+oPersoVictim.id);
            }
            oPersoVictim=oGame.getPerso(this.x,this.y+i);
            if(oPersoVictim){
                oGame.removeBroadcastPersoById(oPersoVictim.id);
                console.log('remove '+oPersoVictim.id);
            }

        }

        oGame.removeBroadcastBombById(this.id);
        return;
    }else{
        oLayer_bomb.clearRect((this.x*widthCase),(this.y*heightCase),widthCase,widthCase);
    }

    oImages.drawImageOnLayer(this.idImg,(this.x*widthCase),(this.y*heightCase),widthCase,widthCase,'bomb');

    oGame.saveBomb(this);

},
