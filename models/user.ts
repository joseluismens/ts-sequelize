'use strict';

import {
    Model, UUIDV4, DataTypes
} from 'sequelize';
import * as bcrypt from "bcrypt";

interface UserAttributes {
    id: string;
    nombres: string;
    apellidos: string;
    tipo_identificacion: string;
    identificacion: string;
    correo: string;
    password: string;
    telefono: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes>

        implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: string;
        nombres!: string;
        apellidos!: string;
        tipo_identificacion!: string;
        identificacion!: string;
        correo!: string;
        password!: string;
        telefono!: string;
        //static associate(models: any) {
        // define association here
        //User.belongsToMany(models.Project, {
        //through: 'ProjectAssignments'
        //})
    //}
    
   
};

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    
    nombres: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo_identificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    identificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: any) {
            const hash = bcrypt.hashSync(value, 8);
            this.setDataValue('password', hash);
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'User',
   
});
return User;
};