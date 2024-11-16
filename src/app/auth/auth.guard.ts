import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      if (next.url[0].path === 'login' || next.url[0].path === 'register') {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (next.url[0].path === 'login' || next.url[0].path === 'register') {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
