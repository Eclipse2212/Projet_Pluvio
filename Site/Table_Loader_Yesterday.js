$(document).ready(
 function() 
 {
var d = new Date(); // Récupère la date du jour via Internet et le stocke en d
var month = d.getMonth()+1; // Extrait le mois de d
var day = d.getDate();
day--; //Fonction embryonnaire permettant de reculer d'un jour
     alert(d);
var horodatage = d.getFullYear() + '_' + (('' + month).length<2 ? '0' : '') + month + '_' + (('' + day).length<2 ? '0' : '') + day;
var XMLFichier = horodatage + '.xml'
$('<p>' + month + '</p>').appendTo("#TEST")


$.ajax( {
            type: "GET",
            url: "Pluvio.xml",
            dataType: "xml",
            success: function(xml) 
                     {
                       $(xml).find('heure').each(   
                         function()
                         {
                            var id = $(this).attr('id');
                            var data = $(this).find('data').text();
                            $('<div class="items" id="link"></div>').html('<tr><td>' + id + '</td><td>' + data + '</td></tr>').appendTo("#Pluvio > tbody:last");
                         });
                      }
        });
 });