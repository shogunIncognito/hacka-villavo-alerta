import axios from 'axios'

export async function AIConclusions(post) {
    const requestToOpenAI = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'Esta es una pagina web en la cual se publican noticias de la seguridad de la ciudad de Villavicencio, Colombia. Tu tarea va a ser sacar una conclusion y advertencia/avisos a los usuarios que miren la noticia esten informados y precavidos, te voy a proporcionar el titulo y la descripcion de la noticia. y con esto sacaras la conclusion o advertencia para las entidades o ciudadanos que miren la noticia para que esten informados y alerta. Contesta en Markdown para una mejor visualizacion de textos, El siguiente mensaje sera una noticia real'
            },
            {
                role: 'system',
                content: `Titulo: ${post.title} - Descripcion: ${post.description}`
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
    })

    return requestToOpenAI.data.choices[0].message.content
}

export async function AIResumen(post) {
    const requestToOpenAI = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'Esta es una pagina web en la cual se publican noticias de la seguridad de la ciudad de Villavicencio, Colombia. Tu tarea va a ser sacar un resumen de la noticia en base al titulo y descripcion que te proporcione, el resumen que generes va a ser enviado a los usuarios que estén registrados con notificaciones por lo que asegurate que el resumen no sea muy largo, preferiblemente corto y que genere curiosidad a los usuarios que les llegue la notificacion, di directamente el resumen, no empieces el parrafo con "Resumen:", El siguiente mensaje sera una noticia real'
            },
            {
                role: 'system',
                content: `Titulo: ${post.title} - Descripcion: ${post.description}`
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        }
    })

    return requestToOpenAI.data.choices[0].message.content
}

export async function unsuscribeEmails(token) {
    return await axios.delete(`/api/unsuscribe/${token}`)
}

export async function subscribeEmail(email) {
    return await axios.post('/api/subscribeEmail', { email })
}

export async function deletePost(id) {
    return await axios.delete(`/api/posts/${id}`)
}