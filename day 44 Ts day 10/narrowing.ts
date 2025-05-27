function detectType(val: number | string) {
    if (typeof val === 'string') {
        return  val.toLowerCase();
    }
    return val + 3;
}

function  provideId (id:  string | null ) {
    if(!id )  {
        console.log("Please provide an id");
        return  null;
    }  
   id.toLocaleLowerCase();
    }

function  printAll(strs: string | string [] | null) {
    if (strs)
        if(typeof strs === "object"){
            for (const str of strs) {
                console.log(str);
        }
        } else  if(typeof strs === "string"){
            console.log(strs);
            }

        }
