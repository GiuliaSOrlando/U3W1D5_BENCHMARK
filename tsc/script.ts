// Creo una funzione che restituisce una data casuale
function getRandomDate() {
  return new Date(Math.random() * new Date().getTime())
}

// Creo il tipo dell'oggetto contenuto nell'array registroChiamate
interface InformazioniChiamata {
  id: number
  data: Date
}

//Creo un'interfaccia che rappresenta un smartphone
interface SmartphoneInterface {
  carica: number //Quantitativo di euro disponibile per chiamare
  numeroChiamate: number // Numero di chiamate effettuate su questo smartphone
  costoMinuto: number // Costo (fisso) al minuto della chiamata
  costoChiamata: number // Variabile per memorizzare il costo della chiamata
  registroChiamate: InformazioniChiamata[] // Array contenente informazioni sulle chiamate effettuate su questo smartphone
  ricarica(euro: number): void // Metodo che permette di aggiornare la quantità di euro disponibile per chiamare
  creditoResiduo(): string // Metodo che restituisce un messaggio che indica il credito residuo (in formato stringa, perché comprensivo di valuta)
  getNumeroChiamate(): number // Metodo che restituisce il numero di chiamate effettuate su questo
  chiamata(min: number): void // Metodo che permette virtualmente di effettuare una chiamata
  azzeraChiamate(): void // Metodo che permette di cancellare tutte le informazioni sulle chiamate effetuate
  mostraRegistroChiamate(): void // Metodo che permette di visualizzare il contenuto dell'array registroChiamate
  filtraChiamatePerDataOra(fromDate: Date, toDate: Date): void // Metodo che filtra le chiamate effettuate su questo smartphone per data e ora
}

// Creo una classe che implementa l'interfaccia SmartphoneInterface
class Smartphone implements SmartphoneInterface {
  costoMinuto: number = 0.2
  costoChiamata!: number
  carica: number = 0
  counter: number = 0
  fromDate!: Date
  toDate!: Date
  // Passo come parametri (utilizzando la sintassi abbreviata) i valori per effettuare la ricarica, del numero di chiamate e dei minuti
  constructor(
    public euro: number,
    public numeroChiamate: number,
    public min: number,
    public registroChiamate: InformazioniChiamata[]
  ) {
    this.ricarica(this.euro)
    this.creditoResiduo()
    this.chiamata(this.min)
    this.mostraRegistroChiamate()
    this.filtraChiamatePerDataOra(this.fromDate, this.toDate)
  }
  // Questo metodo permette di incrementare il credito residuo (passandolo come argomento quando la classe viene istanziata)
  ricarica(euro: number): void {
    this.carica += euro
  }

  // Questo metodo aggiorna il valore di carica, basandosi sul numero di minuti di chiamata (valore anch'esso passato come argomento)
  /*
  In questo metodo è stata anche inclusa la generazione delle chiamate (il numero delle quali è passato anch'esso come argomento),
  durante la quale viene richiamata la funzione getRandomDate() che restituisce una data casuale e il tutto viene poi
  pushato per popolare l'array registroChiamate.
  */
  chiamata(min: number): void {
    this.carica -= min * this.costoMinuto
    for (let i = 0; i < this.numeroChiamate; i++) {
      this.registroChiamate.push({
        id: this
          .counter++ /* L'id è autoincrementante e corrisponde all'ordine in cui sono state generate le chiamate fittizie
        Tuttavia, siccome le date sono state randomizzate, risulta controintuitivo.
        È stato lasciato comunque con l'incremento definito in questi termini, perché in un esempio reale (con date non randomizzate) avrebbe senso in questo modo.*/,
        data: getRandomDate(),
      })
    }
  }

  // Questo metodo mostra il credito residuo, mostrando il valore in euro
  creditoResiduo(): string {
    if (this.carica < 0) {
      return "Non hai credito residuo"
    } else {
      return "Hai un credito residuo di " + this.carica.toFixed(2) + "€"
    }
  }
  // Questo metodo ritorna il numero di chiamate effettuate su questo smartphone
  getNumeroChiamate(): number {
    return this.numeroChiamate
  }

  // Questo metodo permette di azzerare il numero di chiamate effettuate su questo smartphone
  azzeraChiamate(): void {
    this.numeroChiamate = 0
  }

  // Questo metodo mostra il contenuto dell'array registroChiamate, ordinato per data
  mostraRegistroChiamate(): void {
    this.registroChiamate.sort((a, b) => a.data.getTime() - b.data.getTime())
  }

  /* 
    Questo metodo filtra le chiamate effettuate su questo smartphone per data e ora.
    Il filtro è stato anch'esso creato in modo che fosse randomico. Questa randomizzazione
    comporta che alcune volte l'array restituito sia completamente vuoto (perché non è presente nessuna
    data compresa tra i valori di fromDate e toDate randomizzati).
    */
  filtraChiamatePerDataOra(fromDate: Date, toDate: Date): any {
    return this.registroChiamate.filter(
      (chiamata) => chiamata.data >= fromDate && chiamata.data <= toDate
    )
  }
}

// Utenti istanziati dalle classi: i nomi assegnati si riferiscono al modello dello smartphone
const Honor = new Smartphone(50, 5, 12.4, [])
const Samsung = new Smartphone(18, 15, 3, [])
const iPhone = new Smartphone(34, 2, 23, [])

let honorModel = document.createElement("div")
let samsungModel = document.createElement("div")
let iPhoneModel = document.createElement("div")
let divContainer = document.getElementById("container")

honorModel.innerHTML = `
  <h2>Honor</h2>
  <h4>Status attuale</h4>
  <p>Numero di chiamate: ${Honor.numeroChiamate}</p>
  <p>Credito residuo: ${Honor.creditoResiduo()}</p>
  <p>Costo minuto: ${Honor.costoMinuto}</p>
  <p>Numero di chiamate effettuate: ${Honor.numeroChiamate}</p>
  <h4>Bottoni</h4>
  <label for="inputRicaricaHonor">Valore ricarica</label>
  <input type="number" id="inputRicaricaHonor"></input>
  <button id="ricaricaHonor">Ricarica</button>
  <label for="inputMinutiChiamataHonor">Minuti di chiamata</label>
  <input type="number" id="inputMinutiChiamataHonor"></input>
  <button id="chiamataHonor">Durata chiamata</button>
  <button id="mostraRegistroHonor">Mostra Registro</button>
`
samsungModel.innerHTML = `
  <h2>Samsung</h2>
  <h4>Status attuale</h4>
  <p>Numero di chiamate: ${Samsung.numeroChiamate}</p>
  <p>Credito residuo: ${Samsung.creditoResiduo()}</p>
  <p>Costo minuto: ${Samsung.costoMinuto}</p>
  <p>Numero di chiamate effettuate: ${Samsung.numeroChiamate}</p>
  
  <h4>Bottoni</h4> 
  <label for="inputRicaricaSamsung">Valore ricarica</label>
  <input type="number" id="inputRicaricaSamsung"></input>
  <button id="ricaricaSamsung">Ricarica</button>
  <label for="inputMinutiChiamataSamsung">Minuti di chiamata</label>
  <input type="number" id="inputMinutiChiamataSamsung"></input>
  <button id="chiamataSamsung">Durata chiamata</button>
  <button id="mostraRegistroSamsung">Mostra Registro</button>
`

divContainer?.appendChild(honorModel)
divContainer?.appendChild(samsungModel)

let ricaricaButtonHonor = document.getElementById("ricaricaHonor")
let chiamataButtonHonor = document.getElementById("chiamataHonor")
let mostraRegistroButtonHonor = document.getElementById("mostraRegistroHonor")

// Questo bottone permette di ricaricare il credito residuo
ricaricaButtonHonor?.addEventListener("click", () => {
  let inputRicarica = document.getElementById(
    "inputRicaricaHonor"
  ) as HTMLInputElement
  let inputRicaricaValue = parseInt(inputRicarica.value)
  Honor.ricarica(inputRicaricaValue)
  alert(`${Honor.carica} €`)
})

// Questo bottone genera un numero di chiamate pari all'argomento passato quando la classe è stata istanziata
// I minuti di chiamata sono invece mostrati come alert
chiamataButtonHonor?.addEventListener("click", () => {
  let inputMinutiChiamata = document.getElementById(
    "inputMinutiChiamataHonor"
  ) as HTMLInputElement
  let inputMinutiChiamataValue = parseInt(inputMinutiChiamata.value)
  Honor.chiamata(inputMinutiChiamataValue)
  console.log(Honor.registroChiamate)
  alert(`${inputMinutiChiamataValue} minuti di chiamata`)
})

// Questo bottonne mostra il contenuto dell'array registroChiamate
mostraRegistroButtonHonor?.addEventListener("click", () => {
  Honor.mostraRegistroChiamate()
  console.log(Honor.registroChiamate)
})

let ricaricaButtonSamsung = document.getElementById("ricaricaSamsung")
let chiamataButtonSamsung = document.getElementById("chiamataSamsung")
let mostraRegistroButtonSamsung = document.getElementById(
  "mostraRegistroSamsung"
)

// Questo bottone permette di ricaricare il credito residuo
ricaricaButtonSamsung?.addEventListener("click", () => {
  let inputRicarica = document.getElementById(
    "inputRicaricaSamsung"
  ) as HTMLInputElement
  let inputRicaricaValue = parseInt(inputRicarica.value)
  Samsung.ricarica(inputRicaricaValue)
  alert(`${Samsung.carica} €`)
})

// Questo bottone genera un numero di chiamate pari all'argomento passato quando la classe è stata istanziata
chiamataButtonSamsung?.addEventListener("click", () => {
  let inputMinutiChiamata = document.getElementById(
    "inputMinutiChiamataSamsung"
  ) as HTMLInputElement
  let inputMinutiChiamataValue = parseInt(inputMinutiChiamata.value)
  Samsung.chiamata(inputMinutiChiamataValue)
  console.log(Samsung.registroChiamate)
  alert(`${inputMinutiChiamataValue} minuti di chiamata`)
})

// Questo bottonne mostra il contenuto dell'array registroChiamate
mostraRegistroButtonSamsung?.addEventListener("click", () => {
  Samsung.mostraRegistroChiamate()
  console.log(Samsung.registroChiamate)
})
