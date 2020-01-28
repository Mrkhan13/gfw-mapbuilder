// TODO confirm id (Indonesian?) translations are correct

export const printContent = {
  en: {
    buttonLabel: 'Choose a print output',
    report: 'Print Report'
  },
  ka: {
    buttonLabel: 'აარჩიეთ ბეჭდვის ფორმატი',
    report: 'ანგარიშის ბეჭდვა'
  },
  fr: {
    buttonLabel: "Choisissez un format d'impression",
    report: 'Imprimer le Rapport'
  },
  es: {
    buttonLabel: 'Elegir diseño de página',
    report: 'Imprimir Informe'
  },
  pt: {
    buttonLabel: 'Escolher saída de impressão.',
    report: 'Imprimir Relatório'
  },
  id: {
    buttonLabel: 'Choose a print output',
    report: 'Print Report'
  },
  zh: {
    buttonLabel: '选择打印模板',
    report: '打印报告'
  }
};

export const shareContent = {
  // TODO find proper translations for this content!

  en: {
    title: 'Share',
    instructions:
      'EN: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  ka: {
    title: 'გაზიარება',
    instructions:
      'KA: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  fr: {
    title: 'Partager',
    instructions:
      'FR: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  es: {
    title: 'Compartir',
    instructions:
      'ES: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  pt: {
    title: 'Compartilhar',
    instructions:
      'PT: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  id: {
    title: 'Share',
    instructions:
      'ID: Copy and paste the link to share it or use the buttons below to share on social media.'
  },
  zh: {
    title: '分享',
    instructions:
      'ZH: Copy and paste the link to share it or use the buttons below to share on social media.'
  }
};

export const penContent = {
  en: {
    drawTitle: 'Analyse your own shape',
    drawInstructions: [
      'Draw a shape anywhere on the map',
      'Select the shape to run the analysis'
    ],
    drawButton: 'Start drawing',
    coordinatesTitle: 'Enter your own coordinates',
    coordinatesInstructions: [
      'Enter at least 3 coordinates',
      'Add up to 10 points to make shapes'
    ],
    coordinatesButton: 'Enter Values',
    shapefileButton: 'or drop a custom shapefile here',
    shapefileInstructions:
      'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 1MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.'
  },
  ka: {
    drawTitle: 'ჩაატარეთ თქვენი ფიგურის ანალიზი',
    drawInstructions: [
      'რუკაზე ნებისმიერი ფიგურა დახაზეთ',
      'ანალიზის ჩასატარებლად შეარჩიეთ ფიგურა'
    ],
    drawButton: 'დაიწყეთ ხაზვა',
    coordinatesTitle: 'შეიტანეთ თქვენი კოორდინატები',
    coordinatesInstructions: [
      `შეიტანეთ მინიმუმ  3 კოორდინატი`,
      `დაამატეთ 10 წერტილამდე პოლიგონის შესაქმნელად`
    ],
    coordinatesButton: `მნიშვნელობების შეტანა`,
    shapefileButton: 'ან შემოიტანეთ სხვა შეიპფაილი',
    shapefileInstructions:
      'უნდა იყოს გამოყენებული მხოლოდ პოლიგონების მონაცემები WGS84 სივრცული რეფერენსებით. რეკომენდირებული მაქსიმალური ზომაა 1 მბ, უფრო დიდმა ფაილმა შეიძლება ვერ იმუშაოს კორექტულად.  Esri შეიპფაილები უნდა იყოს დაზიპული (.zip) ხოლო GeoJSON ფაილები უნდა იყოს  .json ფორმატით.'
  },
  fr: {
    drawTitle: 'Analysez votre propre polygone',
    drawInstructions: [
      'Tracez un polygone sur la carte',
      "Cliquez sur le polygone pour lancer l'analyse"
    ],
    drawButton: 'Débutez le dessin',
    coordinatesTitle: 'Entrez vos propres coordonnées',
    coordinatesInstructions: [
      `Entrez au moins 3 coordonnées`,
      `Ajoutez jusqu’à 10 points pour définir votre zone`
    ],
    coordinatesButton: `Entrez les valeurs`,
    shapefileButton: 'ou glissez un shapefile ici',
    shapefileInstructions:
      'Fonctionne uniquement avec des données de type polygone avec la réérence spatiale WGS84. La taille maximale est de 1MB. Les fichiers shapefiles doivent être compressés(.zip) et les fichiers GeoJSON sous le format .json.'
  },
  es: {
    drawTitle: 'Analizar su propio polígono',
    drawInstructions: [
      'Dibujar un polígono en cualquier lugar del mapa',
      'Seleccionar el polígono para hacer el análisis'
    ],
    drawButton: 'Empezar a dibujar',
    coordinatesTitle: 'Ingresa las coordenadas',
    coordinatesInstructions: [
      `Ingresa por lo menos 3 coordenadas`,
      `Agrega hasta 10 puntos para generar el polígono`
    ],
    coordinatesButton: `Ingresa valores`,
    shapefileButton: 'o dejar un shapefile aquí',
    shapefileInstructions:
      'Solo están permitido datos en formato de polígono, con el Sistema de Referencia de Coordinados WGS84. Se recomienda un tamaño máximo de 1MB, más grande de 1MB puede no funcionar como era de esperar. Shapefiles de ESRI necesitan estar en formato .zip, y archivos de GeoJSON necesitan estar en formato .json.'
  },
  pt: {
    drawTitle: 'Use sua propria área de Análise',
    drawInstructions: [
      'Desenhe uma área de interesse no mapa',
      'Selecione a área na qual irá executar a análise'
    ],
    drawButton: 'Comece a desenhar',
    coordinatesTitle: 'Entre com suas coordenadas',
    coordinatesInstructions: [
      `Insira pelo menos 3 coordenadas`,
      `Adicione até 10 pontos para desenhar o shape`
    ],
    coordinatesButton: `Entre com os valores`,
    shapefileButton: 'ou soltar aqui um shapefile personalizado',
    shapefileInstructions:
      'Somente geometria de polígono é suportada, devendo-se usar WGS81 como sistema de referência espacial. O tamanho máximo recomendado é de 5 MB, arquivos com tamanho maior que o recomendado podem não funcionar corretamente. ESRI shapefiles devem estar compactados (.zip) e arquivos GeoJSON devem estar no formato .json.'
  },
  id: {
    drawTitle: 'Analyse your own shape',
    drawInstructions: [
      'Draw a shape anywhere on the map',
      'Select the shape to run the analysis'
    ],
    drawButton: 'Start drawing',
    coordinatesTitle: 'Masukkan koordinat Anda',
    coordinatesInstructions: [
      `Masukkan paling sedikit 3 koordinat`,
      `Tambahkan sampai 10 titik untuk membuat bentuk`
    ],
    coordinatesButton: `Masukkan Nilai`,
    shapefileButton: 'or drop a custom shapefile here',
    shapefileInstructions:
      'Only polygon data is supported and should use a spatial reference of WGS84. The recommended maximum size is 1MB, anything more than that may not work as expected. Esri shapefiles must be zipped (.zip) and GeoJSON files must be in .json files.'
  },
  zh: {
    drawTitle: '分析自定义图形',
    drawInstructions: ['在地图上任意地方画一个图形', '选择进行分析的图形'],
    drawButton: '开始绘画',
    coordinatesTitle: '输入你的坐标',
    coordinatesInstructions: [`输入至少三个坐标`, `添加最多10个坐标来完成作图`],
    coordinatesButton: `输入`,
    shapefileButton: '或者在这里添加自定义地理信息系统文件（shapefile）',
    shapefileInstructions:
      '本网站仅支持空间参考系统为WGS84的图形数据文件。建议文件大小应小于1MB。ESRI文件必须为压缩文件（.zip）,GeoJSON 文件必须为后缀.json的文件。'
  }
};

export const searchContent = {
  en: {
    latitude: 'Latitude',
    longitude: 'Longitude',
    title: 'Search for feature:',
    buttonTitle: 'Search'
  },
  ka: {
    latitude: 'განედი',
    longitude: 'გრძედი',
    title: 'პარამეტრის ძიება:',
    buttonTitle: 'გადიდება'
  },
  fr: {
    latitude: 'Latitude',
    longitude: 'Longitude',
    title: 'Recherche de polygones:',
    buttonTitle: 'Chercher'
  },
  es: {
    latitude: 'Latitud',
    longitude: 'Longitud',
    title: 'Buscar polígono:',
    buttonTitle: 'Buscar'
  },
  pt: {
    latitude: 'Latitude',
    longitude: 'Longitude',
    title: 'Buscar recurso:',
    buttonTitle: 'Pesquisa:'
  },
  id: {
    latitude: 'Lintang',
    longitude: 'Bujur',
    title: 'Search for feature',
    buttonTitle: 'Search'
  },
  zh: {
    latitude: '纬度',
    longitude: '经度',
    title: '搜寻特征：',
    buttonTitle: '搜寻'
  }
};

export const measureContent = {
  en: {
    distanceUnitsOfLength: [
      'Acres',
      'Sq Miles',
      'Sq Kilometers',
      'Hectares',
      'Sq Yards',
      'Sq Feet(US)',
      'Sq Meters'
    ],
    areaUnitsOfLength: [
      'Miles',
      'Kilometers',
      'Feet',
      'Feet(US)',
      'Meters',
      'Yards',
      'Nautical Miles'
    ]
  },
  ka: {
    distanceUnitsOfLength: [
      'KA - Acres',
      'KA - Sq Miles',
      'KA - Sq Kilometers',
      'KA - Hectares',
      'KA - Sq Yards',
      'KA - Sq Feet(US)',
      'Sq Meters'
    ],
    areaUnitsOfLength: [
      'Ka - Miles',
      'Ka - Kilometers',
      'Ka - Feet',
      'Ka - Feet(US)',
      'Ka - Meters',
      'Ka - Yards',
      'Ka - Nautical Miles'
    ]
  },
  fr: {
    distanceUnitsOfLength: [
      'FR - Acres',
      'FR - Sq Miles',
      'FR - Sq Kilometers',
      'FR - Hectares',
      'FR - Sq Yards',
      'FR - Sq Feet(US)',
      'FR - Sq Meters'
    ],
    areaUnitsOfLength: [
      'FR - Miles',
      'FR - Kilometers',
      'FR - Feet',
      'FR - Feet(US)',
      'FR - Meters',
      'FR - Yards',
      'FR - Nautical Miles'
    ]
  },
  es: {
    distanceUnitsOfLength: [
      'ES - Acres',
      'ES - Sq Miles',
      'ES - Sq Kilometers',
      'ES - Hectares',
      'ES - Sq Yards',
      'ES - Sq Feet(US)',
      'ES - Sq Meters'
    ],
    areaUnitsOfLength: [
      'ES - Miles',
      'ES - Kilometers',
      'ES - Feet',
      'ES - Feet(US)',
      'ES - Meters',
      'ES - Yards',
      'ES - Nautical Miles'
    ]
  },
  pt: {
    distanceUnitsOfLength: [
      'PT - Acres',
      'PT - Sq Miles',
      'PT - Sq Kilometers',
      'PT - Hectares',
      'PT - Sq Yards',
      'PT - Sq Feet(US)',
      'PT - Sq Meters'
    ],
    areaUnitsOfLength: [
      'PT - Miles',
      'PT - Kilometers',
      'PT - Feet',
      'PT - Feet(US)',
      'PT - Meters',
      'PT - Yards',
      'PT - Nautical Miles'
    ]
  },
  id: {
    distanceUnitsOfLength: [
      'ID - Acres',
      'ID - Sq Miles',
      'ID - Sq Kilometers',
      'ID - Hectares',
      'ID - Sq Yards',
      'ID - Sq Feet(US)',
      'ID - Sq Meters'
    ],
    areaUnitsOfLength: [
      'ID - Miles',
      'ID - Kilometers',
      'ID - Feet',
      'ID - Feet(US)',
      'ID - Meters',
      'ID - Yards',
      'ID - Nautical Miles'
    ]
  },
  zh: {
    distanceUnitsOfLength: [
      'ZH - Acres',
      'ZH - Sq Miles',
      'ZH - Sq Kilometers',
      'ZH - Hectares',
      'ZH - Sq Yards',
      'ZH - Sq Feet(US)',
      'ZH - Sq Meters'
    ],
    areaUnitsOfLength: [
      'ZH - Miles',
      'ZH - Kilometers',
      'ZH - Feet',
      'ZH - Feet(US)',
      'ZH - Meters',
      'ZH - Yards',
      'ZH - Nautical Miles'
    ]
  }
};
