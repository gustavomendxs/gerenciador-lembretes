import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Login } from '../login.model';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit{


  private modo: string = "cadastro";
  private idUsuario: string;
  public usuario: Usuario;
  public estaCarregando: boolean = false;
  public form: FormGroup;


  ngOnInit() {
    this.form = new FormGroup({
      usuario: new FormControl(null, {validators: [Validators.required]}),
      senha: new FormControl(null, {validators: [Validators.required]})
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idUsuario")) {
        this.idUsuario = paramMap.get("idUsuario");
        this.estaCarregando = true;
        this.usuarioService.getUsuario(this.idUsuario).subscribe(dadosUsu => {
          this.estaCarregando = false;
          this.usuario = {
            id: dadosUsu._id,
            usuario: dadosUsu.usuario,
            senha: dadosUsu.senha
          };


          this.form.setValue({
            usuario: this.usuario.login,
            senha: this.usuario.senha
          })


          console.log(this.form);
        });
      }
      else {
        this.modo = "cadastro";
        this.idUsuario = null;
      }
    });
  }
  constructor (
    public loginService: LoginService,
    public route: ActivatedRoute
  ){ }


  onCadastrar() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "cadastro") {
      this.loginService.adicionarLogin(
        this.form.value.usuario,
        this.form.value.senha
      );
    }

    this.form.reset();
  }
}
