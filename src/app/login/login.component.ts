import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Login } from '../login.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{


  private modo: string = "login";
  private idUsuario: string;
  public usuario: Usuario;
  public estaCarregando: boolean = false;
  public form: FormGroup;
  public falha: boolean = false;


  ngOnInit() {
    this.form = new FormGroup({
      usuario: new FormControl(null, {validators: [Validators.required]}),
      senha: new FormControl(null, {validators: [Validators.required]}),
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idUsuario")) {
        this.modo = "usuario";
        this.idUsuario = paramMap.get("idUsuario");
        this.estaCarregando = true;
        this.usuarioService.getUsuario(this.idUsuario).subscribe(dadosUsu => {
          this.estaCarregando = false;
          this.usuario = {
            id: dadosUsu._id,
            usuario: dadosUsu.usuario,
            senha: dadosUsu.senha,
          };


          this.form.setValue({
            usuario: this.usuario.login,
            senha: this.usuario.senha,
          })


          console.log(this.form);
        });
      }
      else {
        this.modo = "login";
        this.idUsuario = null;
      }
    });
  }
  constructor (
    public usuarioService: UsuarioService,
    public route: ActivatedRoute,
    private router: Router
  ){ }


  onEntrar() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    this.falha = false;


    this.usuarioService.login(this.form.get('usuario').value, this.form.get('senha').value )
    .subscribe((dados) => {
      console.log(dados.mensagem)


      if (dados.mensagem == 'Entrou'){
        this.router.navigate(['/criar']);
        this.usuarioService.setLogado(true)

      }else{
        this.falha = true;
        this.estaCarregando = false;
        this.usuarioService.setLogado(false)
      }


    })

    this.form.reset();
  }
}





