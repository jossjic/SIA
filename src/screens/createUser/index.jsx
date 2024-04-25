import React from "react";
import "./createUser.css"
import { CreateInput } from '../../components/createInput';
import { InfoBanner } from '../../components/guide';
import { GeneralButton } from '../../components/button';

export const CreateUser = () => {

    return(
        <div className="createUser">
            <InfoBanner message="No olvides llenar todos los campos para el registro"/>
            <CreateInput/>
            <GeneralButton textElement="Crear usuario"/>
        </div>
    );
}