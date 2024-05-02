import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { CodeInput } from "../../components/codeInput";
import './CodePage.css';

export const CodePage = () => {
    const { code, generationTime } = useParams(); // Obtiene el código generado y la hora de generación de los parámetros de ruta
    const [resetCode, setResetCode] = useState('');
    const [verificationError, setVerificationError] = useState('');

    useEffect(() => {
        const codeExpirationTime = new Date(Number(generationTime) + 5 * 60 * 1000); // Calcula la hora de expiración del código (5 minutos)
        const currentTime = new Date();

        if (currentTime > codeExpirationTime) {
            setVerificationError('El código ha expirado');
        }
    }, [generationTime]);

    const handleCodeComplete = (code) => {
      setResetCode(code);
      // Aqui codigo
    };

    const handleSubmitCode = () => {
      if (resetCode === code) {
        console.log('Código válido. Se puede restablecer la contraseña.');
        setVerificationError('');
      } else {
        console.log('Código inválido. No se puede restablecer la contraseña.');
        setVerificationError('El código de verificación es incorrecto. Por favor, inténtalo de nuevo.');
      }
    };

  return (
    <div className="code">
        <div className="mensaje">
            <Guide message="Ingresa el código de verificación. Revisa el apartado de 'Spam' o 'No deseados' en tu correo electrónico." size={130} />
        </div>
        <div className="code-container">
            <CodeInput onComplete={handleCodeComplete} />
            {verificationError && <p className="error-message">{verificationError}</p>}
            <GeneralButton textElement="Verificar" onClick={handleSubmitCode} label="Enviar código" />
        </div>
    </div>
  );
};
