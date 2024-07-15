import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

export function getParamsID() : Observable<string> {
  const activatedRoute = inject(ActivatedRoute)
  return activatedRoute.params.pipe(map(params => params['id']))
}
