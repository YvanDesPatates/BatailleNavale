//finioler placement bateau (pas à coté d'un autre bateau)
//mettre règle : ne pouvoir cliquer q'une seule fois sur la même case (pas pressé)

$(document).ready(function(){

  
  //déroulé du jeux----------------------------------------------------------------------------------------
  B1J1 = 2
  B2J1 = 2
  B3J1 = 3
  B4J1 = 4
  B1J2 = 2
  B2J2 = 2
  B3J2 = 3
  B4J2 = 4 // variables utiles pour connaitres le nombre de case d'un bateau pas encore touché !
  peutTirer = false; //pour la gestion de quand les joueurs peuvent tirer ou non

  var nbJ1touche = 0;//pour savoir combien de bateau de J1 ou J2 à été touché
  var nbJ2touche = 0;

  var quoiAfficher = 1;
  var quelTableauAfficher = 0;
  $('#switch').click(function(){//appuie sur switch bouton-------------------------------------------------------------------
    if(!peutTirer){//on ne peut changer de tableau que lorsqu'on à épuisé tout ses coups (pour le placement bateau peut tirer est sur false)
      quoiAfficher++;
      if (quoiAfficher==2 || quoiAfficher==4){//pour obliger le J1 et J2 à placer tout ses bateaux
        quoiAfficher--;
        tousPlaces = Bateau_tous_placé();
        quoiAfficher++;
        //tousPlaces = true;//à enlever pour forcer les joueurs à placer tout les bateaux §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
        if(tousPlaces){//si tous les beateaux sont placé on affiche l'image
            $('#t1Bateau').css({'display':'none'});
            $('#t2Bateau').css({'display':'none'});
            $('#tImage').css({'display':'block'});
            //on réinitialise les bateaux après les placement J1 et J2 puis on les caches
            for(var i=1; i<=4;i++){
              for (var j=1; j<=4; j++){
                if (!(i<=2&&j>=3 || i==3&&j==4)) {
                  $("#b"+i+"-"+j).css({'background-color':'rgba(0, 0, 0, 0)'});
                  $("#b"+i).addClass("pasPlacé");
                }
              }
              $("#b"+i).css({'display':'none'});//on cache les bateau b1,b2,b3 et b4
            }
            B3dir=''
            B4dir=''//pour placement bateau horizontal ou vertical
            if(quoiAfficher==4){//on supprime les consignes pour placer les bateaux
            $('#infoBateau').html('Les bateaux qu\'il vous reste sont affichés sur les cotés <br> choisissez une case sur laquelle vous pensez que l\'un des bateaux adverse se trouve !<br>légende : # -> votre bateau est touché | X -> bateau adverse touché | O -> tiré dans l\'eau');
            $('#rmBateau').css({'display':'none'});
          }
        }else { //sinon on affiche une erreur et on remet quoiAfficher à 1
          alert("vous devez placer tout vos bateaux avant de passer votre tour !")
          quoiAfficher--;
        }
      } else {
      if (quoiAfficher%2==0) {
        for(i=1;i<=4;i++){$('#b'+i).css({'display':'none'});}//cacher les bateaux entre deux
        $('#t1Bateau').css({'display':'none'});
        $('#t2Bateau').css({'display':'none'});
        $('#tImage').css({'display':'block'});
      }else {
        $("#carre_tournant").css({'transform':'rotate(0deg)'});
        $("#carre_tournant").css({'animation-play-state':'paused'});
        if(quoiAfficher>4){peutTirer = true;}//dès qu'on affiche le tableau d'un joueur on lui accorde le droit de tirer
        for(var i=1; i<=4;i++){
              for (var j=1; j<=4; j++){
                if (!(i<=2&&j>=3 || i==3&&j==4)) {
                  $("#b"+i+"-"+j).css({'background-color':'rgba(0, 0, 0, 0)'});
                }
              }
            }
        for(i=1;i<=4;i++){$('#b'+i).css({'display':'block'});}//on réinitialise puis on affiche les bateaux quel que soit le joueur
        if(quelTableauAfficher%2!=0){//afficher tableau J1
          $('#tImage').css({'display':'none'});
          $('#t1Bateau').css({'display':'block'});
          B1=B1J1;
          B2=B2J1;
          B3=B3J1;
          B4=B4J1;
          quelTableauAfficher++;
        } else {//afficher tableau J2
        $('#tImage').css({'display':'none'});
        $('#t2Bateau').css({'display':'block'});
          B1=B1J2;
          B2=B2J2;
          B3=B3J2;
          B4=B4J2;

        quelTableauAfficher++;
      }
      if (quoiAfficher>=5){// à chaque affichage de tableau J1 ou J2
        for(i=1; i<=2-B1; i++){ // pour chaque case bateau touché par l'adversaire, on la colorie en gris sur notre map
            $('#b1-'+i).css({'background-color':'grey'});
        }
        for(i=1; i<=2-B2; i++){
          $('#b2-'+i).css({'background-color':'grey'});
        }
        for(i=1; i<=3-B3; i++){
          $('#b3-'+i).css({'background-color':'grey'});
        }
        for(i=1; i<=4-B4; i++){
          $('#b4-'+i).css({'background-color':'grey'});
        }
      }
    }
  }
}









//clique sur cellule pour toucher bateau adverse---------------------------------------------------------------------
   $(".cellule").click(function(event){
      if (peutTirer){//on vérifie si on est après le placement des bateaux et si le joueur à encore le droit de tirer
        idCellule = $(this).attr('id');
        x = idCellule.charAt(0);
        y = idCellule.charAt(1);
        if(quelTableauAfficher%2 == 0){//c'est le tour de J1
          idCelluleTouché = x+y+"J"+"2"//transforme 53J1 en 53J2 par ex.
          classCelluleTouché = $("#"+idCelluleTouché).attr('class');
          if(classCelluleTouché!="cellule"){
            $(this).append('X');
            nbJ2touche++;
            testjoueurgagne(1);
            bateauTouché = classCelluleTouché.charAt(9);//récupère dans la classe le numéro du bateau ex classe : "celluleB1touche"
            if (bateauTouché=='1'){B1J2--;}
            if (bateauTouché=='2'){B2J2--;}
            if (bateauTouché=='3'){B3J2--;}
            if (bateauTouché=='4'){B4J2--;}
            $("#"+idCelluleTouché).append('#');
            $("#"+idCelluleTouché).addClass("touché");
          }else{
            $(this).append("O");
            peutTirer=false
            $("#carre_tournant").css({'animation-play-state':'running'});
          }
        }else{//c'est le tour de J2
          idCelluleTouché = x+y+"J"+"1"//transforme 53J2 en 53J1 par ex.
          classCelluleTouché = $("#"+idCelluleTouché).attr('class');
          if(classCelluleTouché!="cellule"){
            $(this).append('X');
            nbJ1touche++;
            testjoueurgagne(2);
            bateauTouché = classCelluleTouché.charAt(9);//récupère dans la classe le numéro du bateau ex classe : "celluleB1touche"
            if (bateauTouché=='1'){B1J1--;}
            if (bateauTouché=='2'){B2J1--;}
            if (bateauTouché=='3'){B3J1--;}
            if (bateauTouché=='4'){B4J1--;}
            $("#"+idCelluleTouché).append('#');
            $("#"+idCelluleTouché).addClass("touché");
          }else{
            $(this).append("O");
            peutTirer=false
            $("#carre_tournant").css({'animation-play-state':'running'});
          }
        }
              event.stopImmediatePropagation();
      }


  });//fin clique sur cellule pour toucher bateau adverse ------------------------------------------------







}); //fin click sur bouton switch












//fonction de placement des bateaux----------------------------------------------------------------------------
  B3dir=''
  B4dir=''
  var peutCliquer=true;
  $('.b1,.b2,.b3,.b4').click(function(){
    if(peutCliquer && quoiAfficher<=3){//marche avec peutCliquer=false et true
      var pris=$(this).css('background-color');//vérif on ne place une case bateau qu'une fois
      if (pris=='rgb(128, 128, 128)'){
        alert('vous avez déjà placé cette case');//fin vérif
      }
      else{
          peutCliquer=false;//on empêche de recliquer sur une case de bateau avant d'avoir placé la précédente
          var idParent = $(this).parent().attr('id');
          var idBateau = $(this).attr('id');//pour pouvoir resest la couleur de la case si il y'as une erreur ensuite

          var classParent = $(this).parent().attr('class');
          if (classParent=='1placé'){
            deuxiemeCase = true;
            $(this).parent().removeAttr('class');
          }
          if (classParent == "pasPlacé"){
            premiereCase = true;
            $(this).parent().removeAttr('class');
            $(this).parent().addClass('1placé');//pour savoir qu'on est la deuxième case
          }

          $('.cellule').click(function(){ //active le clique sur cellule

            var id=$(this).attr('id');
            var x=parseInt(id.charAt(0));
            var y=parseInt(id.charAt(1));

            var cellulePrise = $(this).attr('class');
            if(cellulePrise!='cellule'){//si la case est prise on annule
              alert('vous devez choisir une cellule libre !');
              $('#'+idBateau).removeAttr('style');
            }
            else{ //si la case est libre
              quoiAfficher==1? joueurNum="J1" : joueurNum="J2";
              var classHaut = $('#'+x+(y-1)+joueurNum).attr('class');
              var classBas =  $('#'+x+(y+1)+joueurNum).attr('class');
              var classGauche = $('#'+(x-1)+y+joueurNum).attr('class');
              var classDroite = $('#'+(x+1)+y+joueurNum).attr('class');
              if(premiereCase){//si c'est la première case du bateau c'est bon
                premiereCase=false;
                //les id ne changent pas, on ajoute la classe B1place pour une case du bateau 1 par exemple.
                $(this).addClass(idParent+'place');
                //si c'est la deuxième case et qu'on la place en dessous ou au dessus. (pour b1 et b2 c'est bon car ils n'ont que 2cases donc pas de pb)
              }else if(deuxiemeCase && (classHaut=='cellule '+idParent+'place' || classBas=='cellule '+idParent+'place')) {
                deuxiemeCase = false;
                if(idParent.charAt(1)==3){B3dir='vertical';}
                if(idParent.charAt(1)==4){B4dir='vertical';}
                $(this).addClass(idParent+'place');
              //pareil que pour le if au dessus mais pour horizontal
              }else if(deuxiemeCase && (classDroite=='cellule '+idParent+'place' || classGauche=='cellule '+idParent+'place')){
                deuxiemeCase=false
                if(idParent.charAt(1)==3){B3dir='horizontal';}
                if(idParent.charAt(1)==4){B4dir='horizontal';}
                $(this).addClass(idParent+'place');
                //condition qui vérifi pour bateau b3 et b4, à partir de la troisième cellule placé, qu'elle est bien dans la continuité vertical ou horizontal des autres
              }else if((idParent.charAt(1)==3 && B3dir=='vertical'&&(classHaut=='cellule '+idParent+'place' || classBas=='cellule '+idParent+'place')) || (idParent.charAt(1)==3 && B3dir=='horizontal' && (classDroite=='cellule '+idParent+'place' || classGauche=='cellule '+idParent+'place')) || (idParent.charAt(1)==4 && B4dir=='vertical'&&(classHaut=='cellule '+idParent+'place' || classBas=='cellule '+idParent+'place')) || (idParent.charAt(1)==4 && B4dir=='horizontal' && (classDroite=='cellule '+idParent+'place' || classGauche=='cellule '+idParent+'place'))){
                $(this).addClass(idParent+'place');
              }
              else {//si on clique sur une case pas à coté d'une case bateau déjà placé ça annule
                  alert(' vous devez posez cette case à coté de celles du même bateau !\n en horizontal ou vertical !');
                  $('#'+idBateau).removeAttr('style');
                }             
                

                $('.cellule').off('click'); //désactive le clique sur cellule
              }
            if(Bateau_tous_placé()){$("#carre_tournant").css({'animation-play-state':'running'});}
            peutCliquer=true;//on peut cliquer à nouveau après avoir choisi une case;

          });//fin click sur cellule

          $(this).css({'background-color':'grey'}); 

      }
    }
  });//fin de clique sur bateau


  $('#rmBateau').click(function(){
    $('.cellule').click(function(){
          $('.cellule').off('click');

          var id=$(this).attr('id');
          var x=parseInt(id.charAt(0));
          var y=parseInt(id.charAt(1));
          var classHaut = $('#'+x+(y-1)+joueurNum).attr('class');
          var classBas =  $('#'+x+(y+1)+joueurNum).attr('class');
          var classGauche = $('#'+(x-1)+y+joueurNum).attr('class');
          var classDroite = $('#'+(x+1)+y+joueurNum).attr('class');

          classeCelulle = $(this).attr('class');
          numBateau = classeCelulle.charAt(9);

          nbCaseBateauVoisine = 0;
          if (classHaut.charAt(9)==numBateau){nbCaseBateauVoisine++}
          if(classBas.charAt(9)==numBateau){nbCaseBateauVoisine++}
          if(classDroite.charAt(9)==numBateau){nbCaseBateauVoisine++}
          if(classGauche.charAt(9)==numBateau){nbCaseBateauVoisine++}
          if(nbCaseBateauVoisine<2){//si la case est entre 2 case du même bateau on empêche
            nbCaseRestante=0;
            reset=false;
            for (i=1; i<=4; i++){
              if( !(numBateau<=2&&i>2 || numBateau==3&&i>3) ) {//on évite de tester sur b1-4 par ex qui existe pas
                couleur = $('#b'+numBateau+'-'+i).css('background-color');
                if( couleur=='rgb(128, 128, 128)' && reset==false){
                  $(this).removeAttr('class');
                  $(this).addClass('cellule');
                  $('#b'+numBateau+'-'+i).css({'background-color':'rgba(0,0,0,0)'});
                  reset=true;
                }
                couleur = $('#b'+numBateau+'-'+i).css('background-color');
                if(couleur=='rgba(0, 0, 0, 0)'){nbCaseRestante++;console.log("a")}
              }
            }
            //pour chaque bateau, on remet la classe pas placé si on à enlever toutes ses cases
            if(nbCaseRestante==2 && numBateau==1){$('#b1').removeAttr('class'); $('#b1').addClass('pasPlacé');}
            if(nbCaseRestante==2 && numBateau==2){$('#b2').removeAttr('class'); $('#b2').addClass('pasPlacé');}
            if(nbCaseRestante==3 && numBateau==3){$('#b3').removeAttr('class'); $('#b3').addClass('pasPlacé');}
            if(nbCaseRestante==4 && numBateau==4){$('#b4').removeAttr('class'); $('#b4').addClass('pasPlacé');}

            //pareil mais avec la classe 1placé pour la deuxième case
            if(nbCaseRestante==3-1 && numBateau==3){$('#b3').removeAttr('class'); $('#b3').addClass('1placé');}
            if(nbCaseRestante==4-1 && numBateau==4){$('#b4').removeAttr('class'); $('#b4').addClass('1placé');}
          }
          else if(numBateau!=""){//condition pour ne pas afficher de messages quand on clique sur une case vide
            alert("vous ne pouvez enlever que un extrémitée d'un bateau");
          }

    })

 })// fin remove bateau


  function Bateau_tous_placé(){
    var tousPlaces=false;
        var bplace=0;
        for (var i=0; i<10 && !tousPlaces; i++) {//on parcours toute la grille et on compte le nombre de case avec le mot "place" dans sa classe
          for (var j=0; j<10 && !tousPlaces; j++) {
            if(quoiAfficher==1){ numJoueur="J1"; }
            if(quoiAfficher==3){ numJoueur="J2"; }
            var classCase=$('#'+i+j+numJoueur).attr('class');
            var regex= /place/;
            var ok = regex.exec(classCase);//on vérifie si la cellule à le mot "place" dans sa classe
            if(ok){
              bplace++;
              if (bplace==11){tousPlaces=true;}//car 11 bateaux sur la grille
            }
          }
        }
        return tousPlaces;
  }

  function testjoueurgagne(numJoueur){
    tousTouche=false
    if (numJoueur==1){
      if(nbJ2touche==11){console.log("J1 gagne !"); tousTouche=true}
    }
    if (numJoueur==2){
      if(nbJ1touche==11){console.log("J2 gagne !"); tousTouche=true}
    }
    if(tousTouche){
      $('#switch').off('click');
      $('.cellule').off('click');
      $("#boite_victoire").css({'z-index':'1'})
    }
  }


  









}); //fin de document ready















 