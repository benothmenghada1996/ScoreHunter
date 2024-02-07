import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(objs:any,x:string) {
     if(x===undefined || x==""){return objs}
     return(objs.filter(obj=>{return obj.team1.toLowerCase().includes(x.toLowerCase())|| obj.team2.toLowerCase().includes(x.toLowerCase())}))
  }

}
