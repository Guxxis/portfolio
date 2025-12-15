import fetch from 'node-fetch';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; 
const SCORE_THRESHOLD = 0.7;

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Método Não Permitido');
    }

    const { recaptchaToken } = req.body;

    console.log("Token recebido para validação.");

    if (!recaptchaToken) {
        return res.status(400).json({ error: "Token reCAPTCHA ausente." });
    }

    const validationUrl = 'https://www.google.com/recaptcha/api/siteverify';

    try {
        const response = await fetch(validationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        });

        const googleResponse = await response.json();
        const { success, score, action } = googleResponse;

        if (success && score >= SCORE_THRESHOLD && action === 'contact_form') {
            
            console.log(`Mensagem válida de ${nome}. Score: ${score}`);

            return res.status(200).json({ message: "Mensagem enviada com sucesso!" });

        } else {
            console.warn(`Tentativa de robô detectada. Score: ${score}`);
            return res.status(401).json({ error: "Falha na validação reCAPTCHA. Não foi possível verificar a autenticidade." });
        }
    } catch (error) {
        console.error("Erro na comunicação Serverless <-> Google:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};