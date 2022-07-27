import  app  from "./app";
import db from './models';


const port = process.env.PORT || 3000;

async function main(){
    try{
        db.sequelize.sync().then(() => {
            app.listen(port, () => {
                console.log(`App listening on port ${port}`)
            })
        });
    }catch(error){
        throw new Error ("error in connection ");
    }
}
main();
