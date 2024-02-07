import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'criptage'
})
export class CriptagePipe implements PipeTransform {
  res:string;
  transform(ch:string) {
    this.res="";
    for (let i = 0; i < ch.length; i++) {
      this.res=this.res+"*";
    }
    return this.res
  }

}
