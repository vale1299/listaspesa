var listaspesa = [];
var articoli = [];

var templateRiga =
    '<div class="riga">' +
    '<input type="button" id="btn_##ID##" value="X" onclick="cancellariga(##ID##)">' +
    '<span class="titolo"> <input type="label" id="tit_##ID##" value="##NOME##" onBlur=blurnome(##ID##) onFocus="svuota(##ID##)"> </span>' +
    '<span class="quantita"> Qtà: <input type="text" id="##ID##" value="##QUANTITA##" onBlur="blurModale(##ID##)"> </span>' +
    '<span class="prezzo">_' +
    '<label class="container">' +
    '<input type="checkbox" id="chk_##ID##" ##COMPRATO## onclick="salvacheck(##ID##)" />' +
    '<span class="checkmark"></span>' + 
    '</label>' + 
    '</div>';

var templateArticoli = 
    '<a href="#" class="close">&times;</a> </br>' +
    '<a href="#" class="listapopup" id="##ID##" onclick="aggiungiArticolo(##ID##)"> ##NAME## </a> </br>';

function caricaListaSpesa(arrayCaricato) {
    $('#contenitore').empty();
    listaspesa = [];
    jQuery.each(arrayCaricato, function(i, articolo) {
        articolo.id = i;
        listaspesa.push(articolo);
        caricaArticolo(articolo.id, articolo.descrizione, articolo.prezzo, articolo.comprato, articolo.quantita);
    });
}

function caricaListaArticoli(arrayCaricato) {
    $('#popup1').empty();
    articoli = [];
    jQuery.each(arrayCaricato, function(i, articolo) {
        articolo.id = i;
        articoli.push(articolo);
        caricaArticoloListaArticoli(articolo.id, articolo.descrizione);
    });
}

function caricaArticolo(i, descrizione, prezzo, comprato, quantita) {
    var riga = templateRiga;
    riga = riga.replace(/##ID##/g, i)
    riga = riga.replace('##NOME##', descrizione);
    riga = riga.replace('##PREZZO##', prezzo);
    riga = riga.replace('##QUANTITA##', quantita);
    if(comprato) {
        riga = riga.replace('##COMPRATO##','checked');
    }
    else {
        riga = riga.replace('##COMPRATO##','');
    }
    $('#contenitore').append(riga);
}

function caricaArticoloListaArticoli(i, descrizione) {
    var rigaArticoli = templateArticoli;
    rigaArticoli = rigaArticoli.replace('##NAME##', descrizione);
    rigaArticoli = rigaArticoli.replace(/##ID##/g, i);
    $('#popup1').append(rigaArticoli);
}

function salva() {
    localStorage.setItem('listaspesa', JSON.stringify(listaspesa));
}

function carica() {
    listaspesa = JSON.parse(localStorage.getItem('listaspesa'));
    caricaListaSpesa(listaspesa);
}

function cancellariga(clicked_id) {
    listaspesa.splice(clicked_id, 1);
    salva();
    carica();
}

function salvacheck(id) {
    if(document.getElementById("chk_" + id).checked) {
        listaspesa[id].comprato = true;
    }
    else {
        listaspesa[id].comprato = false;
    }
    salva();
    carica();
}

function aggiungiArticolo(id_aggiungi) {
    listaspesa.push(articoli[id_aggiungi]);
    salva();
    carica();
}

function blurModale(id_blur) {
    listaspesa[id_blur].quantita = document.getElementById(id_blur).value;

    var requestSynchronize = $.ajax({
        url: "http://api.jsonbin.io/b/5b1e849b7a973f4ce5785a9f",
        method: "PUT",
        data: JSON.stringify(listaspesa),
        dataType: "json",
        contentType: 'application/json'
    });

    salva();
    carica();
}

function blurnome(id_nome) {
    listaspesa[id_nome].descrizione = document.getElementById("tit_" + id_nome).value;

    var requestSynchronize = $.ajax({
        url: "http://api.jsonbin.io/b/5b1e849b7a973f4ce5785a9f",
        method: "PUT",
        data: JSON.stringify(listaspesa),
        dataType: "json",
        contentType: 'application/json'
    });

    salva();
    carica();
}

function svuota(id_svuota) {
    if(document.getElementById("tit_" + id_svuota).value == "AGGIUNGI") {
        document.getElementById("tit_" + id_svuota).value = "";
    }
    else {}
}