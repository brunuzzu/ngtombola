import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numeriTombola: numeroTombola[] = Array(90).fill(0).map((_, idx) => { return { value: 1 + idx, status: false } as numeroTombola })
  contaEstratti: number = 0;
  nonEstratti?: numeroTombola[];
  doc = new jsPDF();
  numeroCartelle: number = 5;
  nonStampati: numeroTombola[] = [];
  cartellePerPage: number = 5;
  intestazione: string = "";
  ultimoEstratto !: number;

  constructor() { }

  ngOnInit(): void {
  }

  public svuota() {
    this.numeriTombola.map(el => el.status = false);
    this.contaEstratti = 1;
  }

  public estrai() {
    this.nonEstratti = this.numeriTombola.filter(el => el.status == false);
    let posEstratto = (Math.floor(Math.random() * this.nonEstratti.length));
    this.nonEstratti[posEstratto].status = true;
    this.ultimoEstratto = this.nonEstratti[posEstratto].value;
    this.contaEstratti++;
  }

  public generaCartelle() {
    let contaCartelle: number = 0;

    for (let i = 0; i < this.numeroCartelle; i++) {

      let numeriSingolaCartella = this.generaNumeriCartelle();
      console.log(numeriSingolaCartella);

      autoTable(this.doc, {
        theme: 'grid',
        styles: { textColor: 20, minCellHeight: 5, lineColor: 20, fontSize: 15, cellPadding: 3 },
        body: [
          numeriSingolaCartella.slice(0, 5),
          numeriSingolaCartella.slice(5, 10),
          numeriSingolaCartella.slice(10, 15)
          // ...
        ]
      })

      if (i % this.cartellePerPage == 0) {
        contaCartelle++;
        this.doc.addPage();
        this.doc.text(this.intestazione + ` - Cartella n. ${contaCartelle} `, 10, 10);

      }
    }

    this.doc.save('CartelleTombola.pdf')
  }

  generaNumeriCartelle() {
    let tuttiNumeri: numeroTombola[] = Array(90).fill(0).map((_, idx) => { return { value: 1 + idx, status: false } as numeroTombola });
    let numeriCartella: number[] = [];
    for (let j = 0; j < 15; j++) {
      this.nonStampati = tuttiNumeri.filter(el => el.status == false);
      let estratto = Math.floor(Math.random() * this.nonStampati.length);
      this.nonStampati[estratto].status = true;
      numeriCartella.push(this.nonStampati[estratto].value);
    }
    return numeriCartella;
  }



}


export interface numeroTombola {
  value: number;
  status: boolean;
}