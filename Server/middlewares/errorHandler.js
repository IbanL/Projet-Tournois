// middleware pour traiter les erreurs
const errorHandler = (err, req, res, next) => {
    //log l'erreur dans la console
    console.error(`errorHandler: ${err.stack}`);

    //determine le code d'erreur, par défaut 500
    const statusCode = err.statusCode || 500;

    //déterminer le messagee d'erreur
    const message = err.message || "erreur interne du serveur"

    //déterminer le code d'erreur (utile pour les erreurs spécifiques comme mongo)
    const errorCode = err.code || "SERVER_ERROR";

    //response JSON
    res.status(statusCode).json({
        success : false,
        message,
        code: errorCode,
        stack: err.stack,
    })
}

export default errorHandler