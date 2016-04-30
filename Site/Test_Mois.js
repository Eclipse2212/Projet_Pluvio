$(document).ready(  //Dès que le document est prêt, on lance ce qui est en dessous
 function() 
 {
var Moment = moment();  //On charge la méthode princiupale de Moment.js
Moment.locale('fr');    //On règle la langue de la date en français au cas où
var Jour = Moment.format("D");//On récupère le jour 
var Mois = Moment.format("MM"); //On récupère le mois
var Annee = Moment.format("Y"); //On récupère l'année
var FormatFichier = Jour + '_' + Mois + '_' + Annee + '.xml';   //On concatène le tout en une variable qui correspond au nom du fichier d'hier

var NomJour = Moment.format("ddd"); //On récup' le jour sous forme 3lettres puis . (ex: "Lun.")
var JTable = NomJour + ' ' + Jour; // on assemble les deux
var Data = 0;
//alert(JTable);
     
while(Jour > 1)
    {
        FetchFile();
         $("#Pluvio > tbody:last").append('<tr><td>' + JTable + '</td><td>' + Data + 'mm</td></tr>'); //Ajoute du contenu juste avant la dernière balise <tbody>
        Data = 0;
        Jour = Moment.subtract(1, 'days').format("D");
        FormatFichier = Jour + '_' + Mois + '_' + Annee + '.xml';
        NomJour = Moment.format("ddd");
        var JTable = NomJour + ' ' + Jour;
        
    }


function FetchFile(){
  $.ajax( {
            type: "GET",
            url: FormatFichier,
            dataType: "xml",
            success: function(xml) 
                     {
                       $(xml).find('heure').each(   //Pour chaque balise <heure></heure>, faire
                         function()
                         {
//                            var id = $(this).attr('id');       //Pas besoin pour l'instant
                            var data = $(this).find('data').text();
                             Data= Data + parseInt(data);
                         });
//                         $("#Pluvio > tbody:last").append('<tr><td>' + JTable + '</td><td>' + Data + 'mm</td></tr>'); //Ajoute du contenu juste avant la dernière balise <tbody>
                      }
        });  
}
});