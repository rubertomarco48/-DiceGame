const queue = [];
let isTyping = false;
import figlet from "figlet";

figlet.text(
    "TIRO DEI DADI",
    {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 70,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );

// Funzione per simulare l'effetto di macchina da scrivere
function typeWriterConsoleLog(text) {
    queue.push(text);
    if (!isTyping) {
        processQueue();
    }
}

function processQueue() {
    if (queue.length === 0) {
        isTyping = false;
        return;
    }

    isTyping = true;
    const text = queue.shift();
    let index = 0;

    const interval = setInterval(() => {
        if (text[index] === '\n') {
            console.log();
        } else {
            process.stdout.write(text[index]);
        }
        index++;
        if (index === text.length) {
            clearInterval(interval);
            console.log(); // Aggiungi una nuova riga alla fine
            processQueue(); // Processa il prossimo elemento nella coda
        }
    }, 50);
}

// Importa il pacchetto typewriter-effect per ogni console.log
typeWriterConsoleLog('TIRO DEI DADI');
setTimeout(() => typeWriterConsoleLog('\nPremi il tasto Invio per iniziare il gioco. Oppure "c" per uscire dal gioco'), 1000);
let counter=0;
// Funzione per il tiro dei dadi
function tiroDadi() {
    let dadoUno = Math.round(Math.random() * 5 + 1);
    let dadoDue = Math.round(Math.random() * 5 + 1);
    if (dadoUno === dadoDue) {
        counter++;
        typeWriterConsoleLog(`WINNER, i due dadi hanno lo stesso valore ovvero ${dadoUno}`);
        typeWriterConsoleLog(`Dopo ${counter} tentativi.`)
        setTimeout(()=>process.exit(0),5000);
    } else if (dadoUno > dadoDue) {
        counter++;
        typeWriterConsoleLog(`LOSE, i due dadi non sono uguali. Il primo dado è maggiore e come risultato ha dato ${dadoUno}, l'altro invece ${dadoDue}`);
    } else {
        counter++;
        typeWriterConsoleLog(`LOSE, i due dadi non sono uguali. Il secondo dado è maggiore e come risultato ha dato ${dadoDue}, l'altro invece ${dadoUno}`);
    }
}

// Imposta l'ascolto degli eventi per l'input da tastiera
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

// Funzione per gestire l'input da tastiera
process.stdin.on('data', (key) => {
    if (key === '\r' || key === '\n') {
        typeWriterConsoleLog('\nOK si inizia');
        setTimeout(() => tiroDadi(), 1500);
    } else if (key === 'c') {
        typeWriterConsoleLog('\nHai terminato il gioco dei dadi.');
        setTimeout(()=>process.exit(0),3000);
    } else {
        process.stdout.write(key);
        typeWriterConsoleLog('\nHAI INSERITO UN CARATTERE NON RICONOSCIUTO, RIPROVA');
    }
});
