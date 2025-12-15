// api/contato.js
const axios = require('axios');
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; 
const SCORE_THRESHOLD = 0.7; 

export default async (req, res) => {
    // Adicionar esta linha para ver se a chave está sendo lida (O VALOR SERÁ 'undefined' se falhar!)
    console.log("Secret Key Status:", RECAPTCHA_SECRET_KEY ? "Loaded" : "FAILED TO LOAD"); // [1]

    if (req.method !== 'POST') {
        return res.status(405).send('Método Não Permitido');
    }

    const { recaptchaToken } = req.body;
    
    // Adicionar este log para ver o token recebido
    console.log("Token recebido:", recaptchaToken ? "Recebido" : "Ausente"); // [2]

    if (!recaptchaToken) {
        return res.status(400).json({ error: "Token reCAPTCHA ausente." });
    }

    // A URL de validação
    const validationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
        // ... sua lógica de chamada ao axios ...

    } catch (error) {
        // [3] Se o erro ocorrer dentro do try/catch, ele deve ser capturado aqui.
        // Se a requisição para o Google falhar, vamos logar a URL
        console.error("Erro interno na API/Google:", error.message); 
        
        // Em vez de só 500, retorne algo mais informativo no log:
        return res.status(500).json({ error: "Erro na comunicação Serverless <-> Google." });
    }
};