import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// correo

import sgMail from '@sendgrid/mail';
import { marked } from 'marked'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendNewPostEmails({ emails, post }) {

  const pendRequests = emails.map((recipient) => {
    const aiResponseHTML = post.ai_response ? marked(post.ai_response) : '';

    const msg = {
      to: recipient.email,
      from: 'VillavoAlertas<jcmfotosyvideos2012@gmail.com>',
      subject: post.title,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 850px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; padding-bottom: 20px;">
        <img src="https://res.cloudinary.com/ddxmom2c3/image/upload/f_auto,q_auto/qfxnpgpto5ytir0xsrkg" alt="VillavoAlertas" style="width: 200px; height: 150px; object-fit: cover; margin-bottom: 20px;" />
        <h1 style="font-size: 24px; color: #333;">Nueva Noticia en Villavicencio</h1>
      </div>
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
        <h2 style="font-size: 20px; color: #333;">${post.title}</h2>
        
        <img src="${post.image[0]}" alt="${post.title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;" />

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          ${post.description}
        </p>
        
        ${post.ai_response ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #e0f7fa; border-radius: 8px;">
          <h3 style="font-size: 18px; color: #007BFF;">Conclusión de Centaury IA:</h3>
          <div style="font-size: 16px; color: #333; line-height: 1.6;">
            ${aiResponseHTML}
          </div>
        </div>` : ''}
      </div>
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #999;">VillavoAlertas &copy; 2024 - Todas las noticias de Villavicencio en un solo lugar</p>
      </div>
    </div>

    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 15px; border: 1px solid #e0e0e0; border-radius: 10px; margin-top: 20px; background-color: #fafafa;">
      <div style="text-align: center;">
        <p style="font-size: 14px; color: #333;">¿No quieres recibir más notificaciones?</p>
        <a href="https://hacka-villavo-alerta.vercel.app/unsubscribe/${recipient.unsuscribeToken}" style="color: #007BFF; text-decoration: none; padding: 10px 15px; border: 1px solid #007BFF; border-radius: 5px; display: inline-block;">Cancelar suscripción</a>
      </div>
    </div>
  `
    };

    return sgMail.send(msg);
  })

  await Promise.all(pendRequests)
}

