import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
class ReverseGuardService {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): boolean {
        if (this.authService.isUserLoggedIn()) {
            this.router.navigate(['/', 'pages', 'dashboard']);
            return false;
        } else {
            return true;
        }
    }
}

export const reverseGuard: CanActivateFn = (route, state) => {
    return inject(ReverseGuardService).canActivate();
};
