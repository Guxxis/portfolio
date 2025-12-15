const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; 
const SCORE_THRESHOLD = 0.7;

export default async (req, res) => {

    const axiosModule = await import('axios');
    const axios = axiosModule.default || axiosModule;

    console.log("Axios carregado e função iniciada.");

    if (req.method !== 'POST') {
        return res.status(405).send('Método Não Permitido');
    }

    const { recaptchaToken } = req.body;

    console.log("Token recebido para validação.");

    if (!recaptchaToken) {
        return res.status(400).json({ error: "Token reCAPTCHA ausente." });
    }

    const validationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
        const googleResponse = await axios.post(validationUrl); // <- Agora usando o axios importado dinamicamente
        const { success, score, action } = googleResponse.data;

        // ... lógica de validação de score ...
        if (success && score >= SCORE_THRESHOLD && action === 'contact_form') {
            return res.status(200).json({ message: "Mensagem enviada com sucesso!" });
        } else {
            return res.status(401).json({ error: "Falha na validação reCAPTCHA. Score baixo." });
        }
    } catch (error) {
        console.error("Erro na comunicação Serverless <-> Google:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};