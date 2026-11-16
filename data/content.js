/* CONTEÚDO DO RIZOMA — editável pelo modo administrativo (Exportar → substitui este arquivo)
   Coordenadas x,y em unidades da imagem (2400 × 1540). Falas: preservadas como fornecidas, sem nomes. */
window.RIZOMA_DATA = {
  versao: 1,
  config: {
    pin: "2026",
    inatividadeSegundos: 90,
    imagem: { src: "assets/rizoma.jpg", largura: 2400, altura: 1540 },
    orientacao: "Explore o rizoma. Toque nas raízes, descubra as histórias e percorra as conexões entre os territórios."
  },
  linhas: {
    dura: { nome: "Linha dura", cor: "#2E2119", resumo: "Estruturas, barreiras e segmentações que atravessam e condicionam a vida nos territórios." },
    flexivel: { nome: "Linha flexível", cor: "#7A7433", resumo: "Saberes, relações e práticas cotidianas que constituem os territórios existenciais." },
    fuga: { nome: "Linha de fuga", cor: "#A4502B", resumo: "Movimentos que tensionam as estruturas e abrem possibilidades: desejos, reivindicações e afirmações — não mudanças já comprovadas." },
    articulacao: { nome: "Articulação entre linhas", cor: "#5F7F7C", resumo: "Pontos em que as linhas se cruzam e coexistem." }
  },
  territorios: {
    "monte-alto": {
      nome: "Monte Alto",
      apresentacao: "Comunidade quilombola localizada na zona rural de Montes Claros-MG. Na pesquisa, o território aparece atravessado pela relação com a terra, pela produção agrícola, pelos conhecimentos tradicionais sobre plantas e ervas, pela participação das mulheres na transmissão de saberes e pelas práticas comunitárias de cuidado.",
      temas: [
        { rotulo: "Território, terra e agricultura", no: "planta_saberes" },
        { rotulo: "Ancestralidade e transmissão entre gerações", no: "transmissao" },
        { rotulo: "Plantas medicinais e conhecimentos tradicionais", no: "planta_saberes" },
        { rotulo: "Ambiente, chuva e Cerrado", no: "cerrado" },
        { rotulo: "Saúde mental e demandas comunitárias", no: "saude_mental" },
        { rotulo: "Acesso aos serviços de saúde", no: "exames" }
      ]
    },
    "nogueiras": {
      nome: "Quilombo dos Nogueiras",
      apresentacao: "Comunidade quilombola situada no contexto urbano de Montes Claros-MG. Na pesquisa, o território aparece relacionado à memória coletiva, à ancestralidade, à afirmação da identidade negra e quilombola, à espiritualidade, às experiências religiosas e às relações de pertencimento.",
      temas: [
        { rotulo: "Memória e ancestralidade", no: "ancestralidade" },
        { rotulo: "Identidade negra e quilombola", no: "afirmacao" },
        { rotulo: "Espiritualidade e religiosidade", no: "espiritualidade" },
        { rotulo: "Práticas tradicionais de cuidado", no: "itinerario" },
        { rotulo: "Racismo e experiências de violência", no: "racismo" },
        { rotulo: "Acesso aos serviços de saúde", no: "posto" },
        { rotulo: "Pertencimento e futuro coletivo", no: "futuro" }
      ]
    }
  },
  fichaTecnica: {
    projeto: "Ramo, Reza, Raízes – Uma cartografia da saúde quilombola",
    contexto: "Trabalho de Conclusão da Residência Multiprofissional em Saúde da Família · ESF Novo Delfino / UBS Vila Anália II · Montes Claros-MG",
    pessoas: [
      { nome: "Pâmela Scarlatt Durães Oliveira", funcao: "Pesquisadora responsável · Doutora em Ciências da Saúde" },
      { nome: "Fellipe Leal Pereira", funcao: "Pesquisador · Psicólogo · Residência Multiprofissional em Saúde da Família" },
      { nome: "Camila Izabel Prates Barreto", funcao: "Pesquisadora · Cirurgiã-dentista · Residência Multiprofissional em Saúde da Família" },
      { nome: "Felipe Alves Pereira", funcao: "Pesquisador · Enfermeiro · Residência Multiprofissional em Saúde da Família" },
      { nome: "Laís Petrillo Mello de Almeida", funcao: "Pesquisadora · Médica · Residência Médica em Saúde da Família e Comunidade" }
    ],
    instituicao: "Universidade Estadual de Montes Claros (Unimontes) — Hospital Universitário Clemente de Faria (HUCF) · Laboratório de Pesquisas Qualitativas Interdisciplinares em Saúde (LabQuali)",
    programa: "Residência Multiprofissional em Saúde da Família",
    extra: ""
  },
  sobre: {
    nota: "Esta cartografia é uma leitura interpretativa exploratória de registros dos mapas produzidos nas duas comunidades (corpus “Transcrição MAPAS”). As linhas coexistem e mudam de função: não são categorias fixas nem moralmente opostas. As conexões são interpretativas, não relações causais demonstradas. As falas são preservadas como registradas, sem identificar quem falou. Os usos de plantas são relatos culturais e não comprovam eficácia terapêutica. Cada comunidade tem singularidades: os temas emergiram da pesquisa e não descrevem todos os moradores."
  },
  pontos: [
    { id: "coracao", titulo: "Saúde: o coração do rizoma", rotulo: "o coração", x: 1200, y: 770, comunidade: "ambas", linha: "articulacao",
      texto: "O coração é ponto de conexão, não centro de comando. Nas falas, saúde aparece ligada ao corpo, à mente, à espiritualidade, à terra, à ancestralidade e aos serviços. Qualquer raiz pode ser o começo.",
      frases: [ { t: "Completo estar de bem estar físico, mental e espiritual", c: "nogueiras" }, { t: "Saúde é tudo. Momentos de paz são importantes.", c: "nogueiras" }, { t: "Felicidade é saúde", c: "monte-alto" } ],
      pista: "", lacuna: "", fotos: [ { src: "", legenda: "Imagem do processo de pesquisa e produção do documentário", autorizada: false } ],
      ligacoes: [ { no: "planta_saberes", porque: "" }, { no: "espiritualidade", porque: "" }, { no: "itinerario", porque: "" }, { no: "saude_mental", porque: "" }, { no: "ancestralidade", porque: "" }, { no: "racismo", porque: "" }, { no: "posto", porque: "" } ] },

    { id: "planta_saberes", titulo: "Plantas e conhecimentos tradicionais", rotulo: "as ervas", x: 210, y: 445, comunidade: "monte-alto", linha: "flexivel",
      texto: "Em Monte Alto, as ervas aparecem no cuidado cotidiano: chás, garrafadas, sumos, plantação e colheita. Os usos são relatos culturais da comunidade e não indicam, por si, eficácia clínica.",
      frases: [ { t: "As ervas curam", c: "monte-alto" }, { t: "Ervas para adultos e crianças", c: "monte-alto" }, { t: "Garrafadas", c: "monte-alto" }, { t: "Plantação", c: "monte-alto" }, { t: "Colheita", c: "monte-alto" } ],
      pista: "Plantas citadas nos registros: saião, sete dores/boldinho, espinheira santa, erva botão, mastruz, carqueja, erva cidreira, boldo, casca de jatobá, quina de vara. Perguntar como se aprende, quem ensina e quais plantas desapareceram.",
      lacuna: "", fotos: [ { src: "", legenda: "Plantas e ervas de Monte Alto", autorizada: false } ],
      ligacoes: [ { no: "transmissao", porque: "Passado de mãe para filha." }, { no: "cerrado", porque: "Sem chuva não tem ervas: a disponibilidade das plantas depende do ambiente." }, { no: "itinerario", porque: "Plantas e unidade de saúde compõem percursos de cuidado." }, { no: "ancestralidade", porque: "" } ] },

    { id: "transmissao", titulo: "Passado de mãe para filha", rotulo: "mãe e filha", x: 515, y: 420, comunidade: "monte-alto", linha: "flexivel",
      texto: "O saber sobre as plantas circula entre gerações, em especial entre mulheres, e chega às crianças. A leitura da pesquisa é que o cuidado se constrói na família e na comunidade.",
      frases: [ { t: "Passado de mãe para filha", c: "monte-alto" }, { t: "crianças aprendendo sobre as ervas", c: "monte-alto" }, { t: "Educação em saúde mudou o pensamento", c: "monte-alto" } ],
      pista: "Para aprofundar: como se aprende, quem ensina e que alternativas surgem quando as plantas faltam.",
      lacuna: "", fotos: [ { src: "", legenda: "Atividades comunitárias e transmissão de saberes", autorizada: false } ],
      ligacoes: [ { no: "ancestralidade", porque: "" }, { no: "futuro", porque: "" }, { no: "folia", porque: "A continuidade das práticas depende de quem pode transmiti-las (leitura a aprofundar)." } ] },

    { id: "cerrado", titulo: "Cerrado, seca e chuva", rotulo: "chuva e Cerrado", x: 300, y: 255, comunidade: "monte-alto", linha: "dura",
      texto: "As plantas dependem da chuva e do Cerrado. Quando a estiagem avança e a vegetação diminui, o saber de cuidado também fica ameaçado. É uma condição ambiental e histórica do território, não um problema da comunidade.",
      frases: [ { t: "Sem chuva não tem ervas", c: "monte-alto" }, { t: "Cerrado: acabando as plantas", c: "monte-alto" }, { t: "Natureza", c: "monte-alto" } ],
      pista: "", lacuna: "", fotos: [ { src: "", legenda: "Vegetação do Cerrado", autorizada: false } ],
      ligacoes: [ { no: "planta_saberes", porque: "" }, { no: "transmissao", porque: "" } ] },

    { id: "folia", titulo: "Folia de Reis", rotulo: "folia de reis", x: 507, y: 745, comunidade: "monte-alto", linha: "dura",
      texto: "Um registro de Monte Alto sobre uma prática cultural e religiosa que, segundo a fala, está se perdendo.",
      frases: [ { t: "folia de reis está acabando: idosos falecendo", c: "monte-alto" } ],
      pista: "", lacuna: "Conteúdo a complementar com a equipe de pesquisa: história e significado da folia na comunidade.", fotos: [ { src: "", legenda: "Registro da folia de reis", autorizada: false } ],
      ligacoes: [ { no: "espiritualidade", porque: "" }, { no: "ancestralidade", porque: "" } ] },

    { id: "espiritualidade", titulo: "Saúde e espiritualidade", rotulo: "fé e água", x: 335, y: 860, comunidade: "nogueiras", linha: "flexivel",
      texto: "Para muitas falas, cuidar da saúde passa pela fé. A espiritualidade protege, acolhe e se mistura a chás, ervas e à água, sem substituir outros cuidados.",
      frases: [ { t: "Saúde e espiritualidade andam juntas.", c: "nogueiras" }, { t: "A água também é remédio para quem tem fé.", c: "nogueiras" }, { t: "A religião ajuda a cuidar do corpo.", c: "nogueiras" }, { t: "Tudo que existe foi Deus que deixou: as ervas e os remédios.", c: "nogueiras" } ],
      pista: "", lacuna: "", fotos: [ { src: "", legenda: "Espaços de convivência e práticas de cuidado", autorizada: false } ],
      ligacoes: [ { no: "diversidade", porque: "Cada pessoa compõe o seu repertório de cuidado." }, { no: "folia", porque: "" }, { no: "ancestralidade", porque: "" }, { no: "itinerario", porque: "" } ] },

    { id: "diversidade", titulo: "Pluralidade religiosa", rotulo: "toda religião é fé", x: 140, y: 810, comunidade: "nogueiras", linha: "flexivel",
      texto: "Convivem experiências religiosas diversas, e cada pessoa recompõe seu repertório de cuidado. A pesquisa lê essas escolhas como negociações, sem hierarquizar crenças.",
      frases: [ { t: "Toda religião é fé!", c: "nogueiras" }, { t: "Eu sou evangélica e uso os chás. Os banhos não mais.", c: "nogueiras" }, { t: "Nossa Senhora é a padroeira dos escravos.", c: "nogueiras" } ],
      pista: "Para aprofundar: convivências, tensões e mudanças nas práticas, sem hierarquizar crenças.",
      lacuna: "", fotos: [], ligacoes: [ { no: "espiritualidade", porque: "" }, { no: "racismo", porque: "Discriminação religiosa também aparece como segmentação." }, { no: "pertencimento", porque: "" } ] },

    { id: "racismo", titulo: "Racismo e violência", rotulo: "o portão fechado", x: 2010, y: 390, comunidade: "nogueiras", linha: "dura",
      texto: "O racismo atravessa a escola, os serviços e o corpo. Nas falas, ele aparece como violência, barreira de acesso e sofrimento psíquico: uma força histórica e institucional, não uma característica da comunidade.",
      frases: [ { t: "O racismo interfere na saúde!", c: "nogueiras" }, { t: "Me batiam na escola. Eu não ia quase porque levava pedrada e chute.", c: "nogueiras" }, { t: "Antigamente nem o serviço de saúde me atendia.", c: "nogueiras" }, { t: "O racismo mexe com o psicológico", c: "nogueiras" } ],
      pista: "Relatos de violência. Reconstruir episódios, redes de apoio e estratégias de enfrentamento, sem reduzir a experiência à vulnerabilidade.",
      lacuna: "", fotos: [], ligacoes: [ { no: "posto", porque: "Antigamente nem o serviço de saúde me atendia." }, { no: "saude_mental", porque: "O racismo mexe com o psicológico." }, { no: "afirmacao", porque: "A afirmação identitária pode resistir à desvalorização." }, { no: "pertencimento", porque: "" } ] },

    { id: "afirmacao", titulo: "Afirmação negra e quilombola", rotulo: "eu amo ser negro", x: 2238, y: 355, comunidade: "nogueiras", linha: "fuga",
      texto: "Ao lado das violências, há afirmação: orgulho, ancestralidade e resistência ao silenciamento. É um movimento enunciado e uma possibilidade, que não apaga as capturas estruturais narradas.",
      frases: [ { t: "Eu amo ser negro.", c: "nogueiras" }, { t: "Eu sobrevivi a toda maldade e estou vivo aqui.", c: "nogueiras" }, { t: "Sabedoria para lidar com as pessoas.", c: "nogueiras" } ],
      pista: "", lacuna: "", fotos: [], ligacoes: [ { no: "racismo", porque: "" }, { no: "pertencimento", porque: "" }, { no: "ancestralidade", porque: "" } ] },

    { id: "posto", titulo: "Unidade de saúde, APS e SUS", rotulo: "o posto de saúde", x: 2225, y: 810, comunidade: "ambas", linha: "articulacao",
      texto: "O posto aparece como lugar de cuidado e também de espera. As falas mostram procura pela unidade, convivência com práticas populares e barreiras de tempo e acesso.",
      frases: [ { t: "quando adoece vai no posto de saúde também.", c: "nogueiras" }, { t: "Médica passa medicamentos naturais também.", c: "nogueiras" }, { t: "Tem a medicina natural no PSF, demora sair a vaga.", c: "nogueiras" }, { t: "Demora muito sair exames pelo SUS!", c: "monte-alto" } ],
      pista: "Para aprofundar: encontros com profissionais, encaminhamentos e tempos de espera.",
      lacuna: "", fotos: [ { src: "", legenda: "Unidade de saúde e território", autorizada: false } ],
      ligacoes: [ { no: "itinerario", porque: "O chá e o posto formam um mesmo percurso de cuidado." }, { no: "exames", porque: "" }, { no: "saude_mental", porque: "" }, { no: "psicologo", porque: "Possibilidade de aproximação entre comunidade e Atenção Primária." } ] },

    { id: "exames", titulo: "Exames e espera", rotulo: "demora dos exames", x: 1975, y: 730, comunidade: "monte-alto", linha: "dura",
      texto: "A demora para sair exames é uma das barreiras relatadas. A leitura da pesquisa é que a espera é efeito da organização do serviço, e não falta de iniciativa da comunidade.",
      frases: [ { t: "Demora muito sair exames pelo SUS!", c: "monte-alto" } ],
      pista: "", lacuna: "Conteúdo a complementar: tempos de espera e itinerários de encaminhamento.", fotos: [], ligacoes: [ { no: "posto", porque: "" } ] },

    { id: "itinerario", titulo: "Primeiro o chá, depois o posto", rotulo: "o chá", x: 1850, y: 850, comunidade: "nogueiras", linha: "flexivel",
      texto: "Os caminhos de cuidado combinam repertórios: chá em casa, unidade de saúde, profissionais. Não há hierarquia entre saberes populares e científicos, há itinerários.",
      frases: [ { t: "Primeiro o chá, se não resolve, o posto de saúde.", c: "nogueiras" }, { t: "Gripe: 1º chá, 2º PSF", c: "nogueiras" }, { t: "A medicina natural pode conviver com a farmacêutica.", c: "nogueiras" }, { t: "Chá de limão com alho: gripe.", c: "nogueiras" } ],
      pista: "Usos relatados como saber cultural; não indicam eficácia clínica.", lacuna: "", fotos: [ { src: "", legenda: "Chás e práticas de cuidado", autorizada: false } ],
      ligacoes: [ { no: "posto", porque: "" }, { no: "planta_saberes", porque: "" }, { no: "espiritualidade", porque: "" } ] },

    { id: "pertencimento", titulo: "Quilombo é o único lar", rotulo: "o lar", x: 330, y: 1210, comunidade: "nogueiras", linha: "fuga",
      texto: "A comunidade funciona como território de pertencimento: lugar de acolhimento e de aprendizado, também atravessado por violências. Pertencer é resistência à desvalorização.",
      frases: [ { t: "Quilombo é o único lar que conheci.", c: "nogueiras" }, { t: "Quilombo é um local de aprendizado.", c: "nogueiras" }, { t: "ser quilombola é maravilhoso.", c: "nogueiras" } ],
      pista: "", lacuna: "", fotos: [ { src: "", legenda: "Paisagem e território dos Nogueiras", autorizada: false } ],
      ligacoes: [ { no: "ancestralidade", porque: "" }, { no: "futuro", porque: "" }, { no: "afirmacao", porque: "" }, { no: "racismo", porque: "" } ] },

    { id: "ancestralidade", titulo: "Ancestralidade e memória", rotulo: "as raízes", x: 610, y: 1355, comunidade: "nogueiras", linha: "flexivel",
      texto: "A memória coletiva sustenta o presente. A ancestralidade aparece como origem do cuidado, dos chás, da fé e da própria comunidade.",
      frases: [ { t: "Ancestralidade é o mais importante.", c: "nogueiras" }, { t: "Estamos aqui por causa de tudo que se passou antes.", c: "nogueiras" }, { t: "Chás desde a época das avós.", c: "nogueiras" } ],
      pista: "", lacuna: "", fotos: [], ligacoes: [ { no: "pertencimento", porque: "" }, { no: "futuro", porque: "" }, { no: "espiritualidade", porque: "" }, { no: "planta_saberes", porque: "" }, { no: "transmissao", porque: "" } ] },

    { id: "futuro", titulo: "Construindo futuro", rotulo: "o futuro", x: 190, y: 1250, comunidade: "nogueiras", linha: "fuga",
      texto: "Projetar o futuro desloca a memória de uma posição só retrospectiva para uma prática coletiva. É possibilidade enunciada, não mudança comprovada.",
      frases: [ { t: "Na comunidade estamos construindo um futuro para os próximos.", c: "nogueiras" }, { t: "Criando hoje um futuro para desfrutar do que a terra dá.", c: "nogueiras" } ],
      pista: "Para aprofundar: como o pertencimento se traduz em ações, conflitos, cuidado e transmissão.", lacuna: "", fotos: [], ligacoes: [ { no: "pertencimento", porque: "" }, { no: "transmissao", porque: "" } ] },

    { id: "saude_mental", titulo: "Saúde mental e sofrimento psicossocial", rotulo: "saúde mental", x: 1775, y: 1120, comunidade: "ambas", linha: "fuga",
      texto: "A comunidade nomeia o sofrimento mental e pede cuidado. É reivindicação e possibilidade de reconfigurar o cuidado no território, não um serviço já implantado.",
      frases: [ { t: "Precisamos de saúde mental!", c: "monte-alto" }, { t: "Aqui tem casos graves de sofrimento mental!", c: "monte-alto" }, { t: "Doenças da mente", c: "monte-alto" }, { t: "Sem saúde mental boa não tem saúde.", c: "nogueiras" } ],
      pista: "Para aprofundar: quem formula as demandas, que respostas recebe e se há mobilização.", lacuna: "", fotos: [], ligacoes: [ { no: "psicologo", porque: "" }, { no: "academia", porque: "" }, { no: "racismo", porque: "" }, { no: "posto", porque: "" }, { no: "coracao", porque: "" } ] },

    { id: "psicologo", titulo: "Quero psicólogo que vem aqui!", rotulo: "o psicólogo", x: 1980, y: 1290, comunidade: "monte-alto", linha: "fuga",
      texto: "Uma demanda por cuidado próximo, no território. Aponta uma possibilidade de aproximação entre comunidade e Atenção Primária, ainda não comprovada.",
      frases: [ { t: "Quero psicólogo que vem aqui!", c: "monte-alto" } ],
      pista: "", lacuna: "", fotos: [], ligacoes: [ { no: "saude_mental", porque: "" }, { no: "posto", porque: "" }, { no: "academia", porque: "" } ] },

    { id: "academia", titulo: "Academia comunitária e convivência", rotulo: "academia comunitária", x: 2215, y: 1250, comunidade: "monte-alto", linha: "fuga",
      texto: "Exercício, caminhadas e espaços coletivos aparecem como desejo e prática de cuidado. A academia comunitária é reivindicação, não equipamento existente.",
      frases: [ { t: "desejo por academia comunitária", c: "monte-alto" }, { t: "Caminhadas", c: "monte-alto" }, { t: "Bicicleta ergométrica", c: "monte-alto" }, { t: "Palestras educativas são importantes", c: "monte-alto" } ],
      pista: "", lacuna: "", fotos: [ { src: "", legenda: "Espaços de convivência", autorizada: false } ], ligacoes: [ { no: "saude_mental", porque: "A reivindicação de espaços comunitários abre possibilidade de rearranjo dos serviços." }, { no: "psicologo", porque: "" } ] }
  ]
};
