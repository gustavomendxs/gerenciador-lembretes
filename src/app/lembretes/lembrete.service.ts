import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';

import { Lembrete } from './lembrete.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LembreteService {

  constructor(private httpClient: HttpClient) {}

  private lembretes: Lembrete[] = [];

  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  atualizarLembrete(id: string, datacadastro: string, datarealizar: string, descricao: string) {
    const lembrete: Lembrete = { id, datacadastro, datarealizar, descricao };
    this.httpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
    .subscribe(res => console.log(res));
  }

  getLembrete(idLembrete: string) {
    return {
      ...this.lembretes.find((cli) => cli.id === idLembrete)
    };
  }

  getLembretes(): void {
    this.httpClient
      .get<{
        mensagem: string;
        lembretes: any;
      }>('http://localhost:3000/api/lembretes')
      .pipe(
        map((dados) => {
          return dados.lembretes.map((lembrete) => {
            return {
              id: lembrete._id,
              datacadastro : lembrete.datacadastro,
              datarealizar: lembrete.datarealizar,
              descricao: lembrete.descricao,
            };
          });
        })
      )
      .subscribe((lembretes) => {
        this.lembretes = lembretes;
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  removerLembrete(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/lembretes/${id}`)
      .subscribe(() => {
        this.lembretes = this.lembretes.filter((cli) => {
          return cli.id !== id;
        });
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  adicionarLembrete(datacadastro: string, datarealizar: string, descricao: string): void {
    const lembrete: Lembrete = {
      id: null,
      datacadastro: datacadastro,
      datarealizar: datarealizar,
      descricao: descricao,
    };

    this.httpClient
      .post<{ mensagem: string, id: string }>('http://localhost:3000/api/lembretes', lembrete)
      .subscribe(
        (dados) => {
          lembrete.id = dados.id;
          this.lembretes.push(lembrete);
          this.listaLembretesAtualizada.next([...this.lembretes]);
        }
      );
  }

  /**
   * Devolve um objeto "Observable"
   * para que os componentes se registrem
   * como observadores.
   */
  getListaLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }
}
