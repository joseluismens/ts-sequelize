import { Response, Request } from "express";
import { validate } from "uuid";
import db from "../models";

export default class UserController {

    static listAll = (req: Request, res: Response) => {
        db.User.findAll().then((result: object) => res.json(result)).catch((err: object) => console.error(err));
    };

    static newUser = (req: Request, res: Response) => {
        const { nombres, apellidos, tipo_identificacion, identificacion, correo, telefono, password } = req.body;

        db.User.findOne({ where: { correo: correo } })
            .then((result: object) => {
                if (result) {
                    console.log(result);

                } else {

                    db.User.create({
                        ...req.body
                    }).then((result: object) => res.status(200).json(result)).catch((err: object) => console.error(err));
                }




            }).catch((err: object) => console.error(err));

    }

    static getUser = (req: Request, res: Response) => {

        const { id } = req.params;
        db.User.findByPk(id)
            .then((result: object) => {
                if (result) {
                    return res.status(200).json(result);
                }
                return res.status(500).json({ message: "Usuario no encontrado" });
            }).catch((err: object) => console.error(err));


    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        db.User.destroy({
            where: {
                id: id
            }
        }).then((result: object) => {
            if (result) return res.status(200).json({ message: "Usuario eliminado exitosamente" });

            return res.status(404).json({ message: "Usuario no encontrado" });


        }).catch((err: object) => console.error(err))

    };

    static updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nombres,apellidos, tipo_identificacion,identificacion,correo,telefono } = req.body;

        
        const user = db.User.findOne({
            where:{
              id:parseInt(id)
            }
          }).then(
            (result:object)=>{
                if (!result) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
          })
          .catch((error:object)=>console.error(error));
        
         const errors= validate(user);
        if (errors) return res.status(400).send(errors);

        db.User.update(
            {
              nombres:nombres,
              apellidos:apellidos,
              tipo_identificacion:tipo_identificacion,
              identificacion:identificacion,
              correo:correo,
              telefono:telefono,
              
            },
            {where:{
              id:id
            }
          }).then((result:object)=>{
            if (result) {
                return res.status(200).json({message:"usuario actualizado"});
            }else{
                return res.status(500).json({message:"error al actualizar"});
            }
          }).catch((error:object)=>console.error(error))
        
        
      };



}