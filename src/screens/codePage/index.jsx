import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { CodeInput } from "../../components/codeInput";
import './CodePage.css';

export const CodePage = () => {
    const { generationTime } = useParams(); // Obtiene la hora de generación del código de los parámetros de ruta
    const [verificationError, setVerificationError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const codeExpirationTime = new Date(Number(generationTime) + 5 * 60 * 1000); // Calcula la hora de expiración del código (5 minutos)
        const currentTime = new Date();

        if (currentTime > codeExpirationTime) {
            setVerificationError('El código ha expirado');
        }
    }, [generationTime]);

    const handleSubmitCode = () => {
        navigate("/newPass");
    };

    return (
        <div className="code">
            <div className="mensaje">
                <Guide message="Ingresa el código de verificación. Revisa el apartado de 'Spam' o 'No deseados' en tu correo electrónico." size={130} />
            </div>
            <div className="code-container">
                <CodeInput />
                {verificationError && <p className="error-message">{verificationError}</p>}
                <GeneralButton textElement="Verificar" onClick={handleSubmitCode} />
            </div>
        </div>
    );
};
