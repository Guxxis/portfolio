import nodemailer from 'nodemailer';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.7;

// Variáveis de ambiente
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';

export default async (req, res) => {

    const axiosModule = await import('axios');
    const axios = axiosModule.default || axiosModule;

    console.log("Axios carregado e função iniciada.");

    if (req.method !== 'POST') {
        return res.status(405).send('Método Não Permitido');
    }

    const { nome, email, telefone, mensagem, recaptchaToken } = req.body;

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

            let transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: 465, // Ou 587 (TLS)
                secure: true, // true para 465, false para outras portas
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS,
                },
            });

            let mailOptions = {
                from: `"${nome}" <${email}>`, // Remetente (quem preencheu o form)
                to: EMAIL_USER, // Seu e-mail (quem recebe)
                subject: `Novo Contato do Portfólio: ${nome}`,
                html: `
                    <h3>Detalhes do Contato</h3>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${telefone || 'Não Fornecido'}</p>
                    <hr>
                    <p><strong>Mensagem:</strong></p>
                    <p>${mensagem}</p>
                    <hr>
                    <p>Score reCAPTCHA: ${score}</p>
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`E-mail enviado com sucesso de ${email}.`);
                return res.status(200).json({ message: "Mensagem enviada com sucesso!" });
            } catch (error) {
                console.error("Erro ao enviar e-mail via Nodemailer:", error);
                // Retorne 500 para indicar que a falha foi no servidor (envio de email)
                return res.status(500).json({ error: "Mensagem validada, mas falha no envio do e-mail." });
            }
        } else {
            return res.status(401).json({ error: "Falha na validação reCAPTCHA. Score baixo." });
        }
    } catch (error) {
        console.error("Erro na comunicação Serverless <-> Google:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};