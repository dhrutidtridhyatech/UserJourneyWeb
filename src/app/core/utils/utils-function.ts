import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Just do @Injectable() if you're not on Angular v6+
})

export class UtilityService {
  constructor() { }

  FormatString(str: string, ...val: any[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

}
