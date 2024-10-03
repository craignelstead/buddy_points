//js module template

//Imports here
// import { whatever } from './whereever';

export const myModule = (function() {

    //
    function myFunction () {
        //Do some stuff here
    }

    //
    async function myAsyncFunction () {
        try {
            //API call here
            //const response = await fetch('URL', {mode: 'cors'});
            //const data = await response.json();
        } catch(Error) {
            //Handle that error
        } //finally {}
    } 

    return {
        //Thing 1,
        //Thing 2,
        //Thing 3,
    }
})();
