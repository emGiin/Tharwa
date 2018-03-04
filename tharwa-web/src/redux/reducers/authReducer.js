export  function reducer (state={
    isLogged:false,
    userType:null,
    user: {
        name:"adel",
        email:"ea_djidjik@esi.dz"
    }
},action){
    switch(action.type){
        case "IS_ROOT":{
            return{isLogged:true , userType:'root'}
        }
        default :return state;
    }
}

export function listUsers (){
    return [
        {
            name:"adel",
            mail:"ea_djidjid",
            type:"user"

        },
        {
            name:"moulou",
            mail:"ea_moulou",
            type:"admin"
            
        }
    ]
}