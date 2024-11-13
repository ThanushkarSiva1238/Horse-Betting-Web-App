var IDs = 
    {
        Chit : "",
        Race : ""
    };


function betting(Hs, Amount, Times, Total){
     this.Hs = Hs;
     this.Amount = Amount;
     this.Times = Times
     this.Total = Total;

}
const BettingList = [];

const Single = {
    HorseNo : ["1-0", "2-0", "3-0", "4-0", "5-0", "6-0", "7-0", "8-0",
               "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "0-7", "0-8"],
    Times : [3, 4, 6, 7, 8, 10, 29, 43,
             3, 4, 6, 7, 8, 10, 29, 43]
};

const All = {
    HorseNo : [ "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", 
                "2-3", "2-4", "2-5", "2-6", "2-7", "2-8",
                "3-4", "3-5", "3-6", "3-7", "3-8",
                "4-5", "4-6", "4-7", "4-8",
                "5-6", "5-7", "5-8",
                "6-7", "6-8",
                "7-8",
                "2-1", "3-1", "4-1", "5-1", "6-1", "7-1", "8-1",
                "3-2", "4-2", "5-2", "6-2", "7-2", "8-2",
                "4-3", "5-3", "6-3", "7-3", "8-3",
                "5-4", "6-4", "7-4", "8-4",
                "6-5", "7-5", "8-5",
                "7-6", "8-6",
                "8-7"],
    Times : [6, 9, 10, 11, 17, 47, 67,
             11, 13, 15, 23, 59, 89,
             19, 21, 29, 83, 123,
             27, 37, 103, 156,
             41, 113, 171,
             159, 239,
             1319,
             6, 9, 10, 11, 17, 47, 67,
             11, 13, 15, 23, 59, 89,
             19, 21, 29, 83, 123,
             27, 37, 103, 156,
             41, 113, 171,
             159, 239,
             1319]
}



function addValue(){
    let chitID = document.getElementById("Chit").value;
    let raceID = document.getElementById("RaceID").value;

    IDs.Chit = chitID;
    IDs.Race = raceID;

    document.getElementById("ID").reset();
    show();
}


function SingleChit(){
    BettingList.length = 0;
    let cash = document.getElementById("cash").value;

    for (let i = 0; i < (Single.HorseNo.length/2); i++) {
            var total = cash * Single.Times[i];
            var add = new betting(Single.HorseNo[i], cash, Single.Times[i], total);
            BettingList.push(add);
    }
    addTable();
    document.getElementById("but").reset();
}

function AllChit(){
    BettingList.length = 0;
    let cash = document.getElementById("cash").value;

    for (let i = 0; i < (All.HorseNo.length/2); i++) {
            var total = cash * All.Times[i];
            var add = new betting(All.HorseNo[i], cash, All.Times[i], total);
            BettingList.push(add);
    }
    addTable();
    document.getElementById("but").reset();
}

function addManual(){
    let H1 = document.getElementById("Horse1").value;
    let H2 = document.getElementById("Horse2").value;
    let Amount = document.getElementById("Amount").value;

    let Horse = String(H1) + "-" + String(H2);

    for (let i = 0; i < Single.HorseNo.length; i++) {
        if (Horse === Single.HorseNo[i]){
            var total = Amount * Single.Times[i];
            var add = new betting(Horse, Amount, Single.Times[i], total);
            BettingList.push(add);
        }
    }

    for (let i = 0; i < All.HorseNo.length; i++) {
        if (Horse === All.HorseNo[i]){
            var total = Amount * All.Times[i];
            var add = new betting(Horse, Amount, All.Times[i], total);
            BettingList.push(add);
        }
    }
    addTable();
    document.getElementById("manual").reset();
}


function remove(rem){
    if (rem > -1 && rem < BettingList.length) {
        BettingList.splice(rem, 1);
    }
    addTable();
}



function show(){
    document.getElementById("ChitNo").innerHTML = IDs.Chit;
    document.getElementById("Race").innerHTML = IDs.Race;
}

function addTable(){
    let tableRows = '';
    for (var i = 0; i < BettingList.length; i++) {
        tableRows += `
            <tr><td>${i+1}</td>
            <td>${BettingList[i].Hs}</td>
            <td>${BettingList[i].Amount} x ${BettingList[i].Times} = ${BettingList[i].Total}</td>
            <td>${BettingList[i].Amount}</td>
            <td id='action'><button onclick="remove(${i})"><span class='material-symbols-outlined'>cancel</span></button></td></tr>`;
    }

    var total = 0;
    for (var i = 0; i < BettingList.length; i++){
        total += parseInt(BettingList[i].Amount);
    }
    document.getElementById("added").innerHTML = tableRows;
    document.getElementById("GrandTotal").innerHTML = `Grand Total : Rs. ${total}.00`;
}

function reset(){
    BettingList.length = 0;
    addTable();
}

function drawDottedLine(doc, xStart, y, xEnd, spacing) {
    const lineLength = 1; // Length of each dot
    const gapLength = spacing; // Space between dots
    const totalLength = xEnd - xStart;
    const numDots = Math.floor(totalLength / (lineLength + gapLength));

    for (let i = 0; i < numDots; i++) {
        const x = xStart + i * (lineLength + gapLength);
        doc.line(x, y, x + lineLength, y); // Draw the dot
    }
}

function generateReceipt() {
    if (BettingList.length > 0) {
        const { jsPDF } = window.jspdf;

        const maxHeight = 240;
        const baseHeight = 40;
        const itemHeight = 8;

        const totalHeight = Math.min(baseHeight + 40 + (BettingList.length * itemHeight), maxHeight);

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [80, totalHeight]
        });

        let y = 15;

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);

        now.setHours(now.getHours() + 4); // Adds 4 hours to the current time
        const expireTime = now.toTimeString().split(' ')[0].substring(0, 5);

        const issueDateTime = `${formattedDate}   ${formattedTime}`;
        const expireDateTime = `${formattedDate}   ${expireTime}`;

        var title = `SKT_Ginigathhena ${formattedTime}`;

        // Header
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("BBC_2", 40, y, { align: "center" });
        y += 8;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`${title}`, 40, y, { align: "center" });
        y += 10;

        // Receipt details
        const details = [
            { label: "Chit No", value: `${IDs.Chit}` },
            { label: "Date", value: `${formattedDate}` },
            { label: "Round No", value: `${IDs.Race}` },
            { label: "Issue Date", value: `${issueDateTime}` },
            { label: "Expire Date", value: `${expireDateTime}` }
        ];
                
        doc.setFontSize(10);
        details.forEach(detail => {
            doc.text(detail.label, 10, y);
            doc.text(`:   ${detail.value}`, 36, y);
            y += 6;
        });

        // Divider
        drawDottedLine(doc, 8, y, 72, 0.5);
        y += 8;

        var total = 0;
        for (var i = 0; i < BettingList.length; i++) {
            var label = `${BettingList[i].Hs} \t ( ${BettingList[i].Amount} x ${BettingList[i].Times} = ${BettingList[i].Total} )`;
            var value = `${BettingList[i].Amount}`;

            total += parseInt(BettingList[i].Amount);

            doc.text(`${label}`, 10, y);
            doc.text(`${value}`, 68, y, { align: "right" });
            y += 5;
        }

        // Divider
        drawDottedLine(doc, 8, y, 72, 0.6);
        y += 8;

        let grand = total;
        doc.setFont("helvetica", "bold");
        doc.text(`Amount: Rs. ${grand}/=`, 10, y);


        BettingList.length = 0;

        let parts = IDs.Chit.split("_", 2);
        var no = parseInt(parts[1]);
        var newNo = no + 1;
        var ID = parts[0] + "_" + String(newNo);
        IDs.Chit = ID;

        show();
        addTable();

        document.getElementById("Chit").value = IDs.Chit;
        document.getElementById("RaceID").value = IDs.Race;


        // Open the PDF in a new window to print
        const pdfDataUri = doc.output('dataurlstring');
        const pdfWindow = window.open();
        pdfWindow.document.write(`<iframe src="${pdfDataUri}" width="100%" height="100%"></iframe>`);

        // Trigger print on the new window
        pdfWindow.onload = function() {
            pdfWindow.print();
        };
    }
}