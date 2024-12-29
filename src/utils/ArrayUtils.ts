export const distinctList = (list: any[], property:string, compareFn?:(a: any, b: any) => number): any[]=>{

    const newDistinct: any[] = [];

    [...list].forEach((_channel)=>{
      const i = newDistinct.findIndex(chat => chat[property] ===_channel[property]);
      if(i === -1){
        newDistinct.push(_channel);
      }else{
        newDistinct[i] = _channel;
      }
    })
    
    if(compareFn){
        newDistinct.sort(compareFn);
    }

    return newDistinct;

}