import { readdirSync } from "fs";
export const anuncios = [
    {
        "title": "El balcón de la catedral",
        "description": "Impresionante Ático en el elegante edificio Olimpia, justo en el centro de Granada, donde podrás disfrutar de la ciudad en todo su esplendor tanto por sus inmejorables vistas, sus preciosos atardeceres y la vida céntrica de la ciudad donde todo lo tienes a un paso. Sitios turísticos, los mejores lugares de restauración, zonas de shopping, incluso excursiones en pleno campo. Todo para disfrutar de Granada, de su ambiente de su cultura y en definitiva que tu estancia sea inolvidable .",
        "properties": [],
        "pictures": getPictures('mercado'),
        "precio": 187,
        "id": "mercado"
    },
    {
        "title": "Atico'Secret",
        "description": "Impresionante ATICO en pleno corazón de Granada. Privilegiada ubicación, el alojamiento es amplio y espacioso en todas sus estancias, cuenta con una amplia terraza e impresionantes vistas a Sierra Nevada y ciudad. Cómodo, soleado y tranquilo. Te sentirás en un lugar mágico y especial, disfrutareis de una experiencia de ensueño en un apartamento único.",
        "properties": [],
        "pictures": getPictures('atico'),
        "precio": 220,
        "id": "atico"
    }
]

function compareNumbers(a: any, b: any) 
{
    let an = a.match(/(\d+)/)[0],
        bn = b.match(/(\d+)/)[0];
        return an - bn;
}

function getPictures(name: string)
{
    let result:Array<any> = [];
    try
    {
        const path = process.env.NODE_ENV === 'development' ? `./public/${name}` : `./${name}`
        result = readdirSync(path).map(p => `/${name}/` + p).sort(compareNumbers)
    }
    catch(e)
    {
        console.log(e);
    }

    return result;
}


/*{
        "title": "ascasc",
        "description": "Impresionante Ático en el elegante edificio Olimpia, justo en el centro de Granada, donde podrás disfrutar de la ciudad en todo su esplendor tanto por sus inmejorables vistas, sus preciosos atardeceres y la vida céntrica de la ciudad donde todo lo tienes a un paso. Sitios turísticos, los mejores lugares de restauración, zonas de shopping, incluso excursiones en pleno campo. Todo para disfrutar de Granada, de su ambiente de su cultura y en definitiva que tu estancia sea inolvidable .",
        "pictures": 
        [
            'https://drive.google.com/uc?export=view&id=1R6qiAA0TjAs5PCj_b7rPengXDWsP3jAS'
        ],
        "properties": [],
        "precio": 100,
        "id": "gran-capitan"
    },
    {
        "title": "atico",
        "description": "Disfruta de Granada en un loft único en el centro con un balcón con vistas espectaculares.        Situado en el centro, cerca de todos los lugares de interés turístico, bares, tiendas ...pero a la vez muy tranquilo para poder descubrir Granada y a la vez descansar.        Parking opcional 12€/dia",
        "pictures": 
        [
            'https://drive.google.com/uc?export=view&id=1R6qiAA0TjAs5PCj_b7rPengXDWsP3jAS'
        ],
        "properties": [],
        "precio": 300,
        "id": "gran-capitan"
    }*/
