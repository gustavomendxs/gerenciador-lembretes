export class LoginService {

}
public logado: BehaviorSubject <boolean>;
constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.logado = new BehaviorSubject<boolean>(false);
  }
estaLogado(): Observable<boolean>{

      return this.logado.asObservable();
    }


    setLogado(valor): void {
      this.logado.next(valor);
    }



  login(usuario: string, senha: string) {
    const login: Login = {
      id: null,
      usuario: usuario,
      senha: senha,
    }
    return this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/login',
      usuario
    )
  }

