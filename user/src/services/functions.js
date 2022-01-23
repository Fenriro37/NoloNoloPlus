// Metodo per incrementare una data
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// Metodo che converte una data in un oggetto JSON
export function convertDateToObject(date) {
    return {
        day: date.getDate().toString(),
        month: (date.getMonth() + 1).toString(),
        year: date.getFullYear().toString()
    }
}
  
// Metodo che calcola la differenza di due giorni
export function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
}

// Metodo che cerca se una data (date) è all'interno di un array di date
export function isInArray(array, date) {
    let element;
    return !!array.find(item => {
        element = new Date(item);
        return element.getTime() == date.getTime()
    });
}

// Metodo per convertire le prenotazioni (array) di un array (dates) di date
// nei quali il prodotto non è prenotato. Una prenotazione ha una data di
// inizio e di fine.
export function convertToDate(array) {
    let index = 0;
    let dates = [];
    // Cicla sulle prenotazioni di un prodotto
    for(index in array) {
        // Cattura la data d'inizio di una prenotazione
        const startDate = new Date(
        parseInt(array[index].startDate.year),
        parseInt(array[index].startDate.month) - 1,
        parseInt(array[index].startDate.day)
        );
        // Cattura la data di fine di una prenotazione
        const endDate = new Date(
        parseInt(array[index].endDate.year),
        parseInt(array[index].endDate.month) - 1,
        parseInt(array[index].endDate.day)
        );
        // Aggiunge nell'array le date nell'intervallo
        let currentDate = startDate;
        while (currentDate <= endDate) {
        dates.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
        }
    }
    return dates;
}