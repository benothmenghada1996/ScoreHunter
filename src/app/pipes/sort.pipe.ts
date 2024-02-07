import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  x : number;
  
  transform(T:any) {
    for (let i = 0; i < T.length-1; i++) {
      for (let j = i+1; j < T.length; j++) {
       if (T[i].scoreOne<T[j].scoreOne) {
        this.x=T[i];
        T[i]=T[j];
        T[j]=this.x;
       } 
      } 
    }
   return(T); 
   }
}
