const axios = require('axios');

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; 
const SCORE_THRESHOLD = 0.7;

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Método Não Permitido');
    }

    const { nome, email, mensagem, recaptchaToken } = req.body;

    if (!recaptchaToken) {
        return res.status(400).json({ error: "Token reCAPTCHA ausente." });
    }

    const validationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
        const googleResponse = await axios.post(validationUrl);
        const { success, score, action } = googleResponse.data;

        if (success && score >= SCORE_THRESHOLD && action === 'contact_form') {
            
            console.log(`Mensagem válida de ${nome}. Score: ${score}`);

            return res.status(200).json({ message: "Mensagem enviada com sucesso!" });

        } else {
            console.warn(`Tentativa de robô detectada. Score: ${score}`);
            return res.status(401).json({ error: "Falha na validação reCAPTCHA. Não foi possível verificar a autenticidade." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor ao validar o reCAPTCHA." });
    }
};