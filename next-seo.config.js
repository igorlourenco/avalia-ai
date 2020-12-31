const title =
    'Avalia Aí - Saiba o que as pessoas acham do seu produto.';
const description = 'Descrição de teste Avalia Aí.';

const SEO = {
    title,
    description,
    canonical: 'https://avalia-ai.vercel.app',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://avalia-ai.vercel.app',
        title,
        description,
        images: [
            {
                url: 'https://avalia-ai.vercel.app/logo.png',
                alt: title,
                width: 1280,
                height: 720
            }
        ]
    }
};

export default SEO;