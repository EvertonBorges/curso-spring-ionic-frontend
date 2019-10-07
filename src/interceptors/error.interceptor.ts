import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor (public storage: StorageService, public alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                catchError((error, caught) => {

                    let errorObj = error;
                    if (errorObj.error) {
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.status) {
                        errorObj = JSON.parse(errorObj);
                    }

                    console.log("Erro detectado pelo interceptor");
                    console.log(errorObj);

                    switch (errorObj.status) {
                        case 401:
                            this.handle401();
                            break;
                        case 403:
                            this.handle403();
                            break;
                        default:
                            this.handleDefault(errorObj);
                            break;
                    }

                    return throwError(errorObj);
                })
            ) as any;
    }

    async handle401() {
        let alert = await this.alertCtrl.create({
            header: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        await alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handleDefault(errorObj){
        let alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        await alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};