const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phoneclubapp@gmail.com',
    pass: '',
  },
});

exports.enviarEmailConfirmacao = functions.database
  .ref('/usuarios/{usuarioId}')
  .onCreate((snapshot, context) => {
    console.log('Função acionada com sucesso!');

    const usuario = snapshot.val();

    const mailOptions = {
      from: 'phoneclubapp@gmail.com',
      to: usuario.email,
      subject: 'Bem-vindo ao PhoneClub!',
      text: `Olá ${usuario.nomeCompleto},\n\nBem-vindo ao PhoneClub! Agradecemos por preencher o formulário.`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro no envio do email:', error.message);
        functions.logger.error('Erro no envio do email:', error.message); // Adicionando detalhes no log
        return;
      }

      console.log('Email enviado:', info.response);
      functions.logger.info('Email enviado:', info.response); // Adicionando detalhes no log
    });
  });

  
