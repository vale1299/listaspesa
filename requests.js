var request = $.ajax({
  url: "http://api.jsonbin.io/b/5b1e20ca0fb4d74cdf23f984/latest",
  method: "GET",
  data: null,
  dataType: "json"
});
 
request.done(function( data ) {
    var arrayCaricato = data.articoli;
    caricaListaArticoli(arrayCaricato);
});
 
request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

function aggiornasulcloud() {
    console.log('cloud: ' + JSON.stringify(listaspesa));
    var requestSynchronize = $.ajax({
        url: "http://api.jsonbin.io/b/5b1e849b7a973f4ce5785a9f",
        method: "PUT",
        data: JSON.stringify(listaspesa),
        dataType: "json",
        contentType: 'application/json'
    });
}

function aggiornasuldevice() {
    var requestSynchronizedevice = $.ajax({
        url: "http://api.jsonbin.io/b/5b1e849b7a973f4ce5785a9f/latest",
        method: "GET",
        dataType: "json"
    });

    requestSynchronizedevice.done(function( data ) {
        var arrayCaricato = data;
        caricaListaSpesa(arrayCaricato);
        console.log('device: ' + JSON.stringify(data));
    });

    requestSynchronizedevice.fail(function( jqXHR, textStatus ) {
        alert("errore durante l'aggiornamento del device");
    });
}