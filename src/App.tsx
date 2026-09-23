import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  BarChart3,
  Flame,
  Award,
  RefreshCw,
  Filter,
  Bookmark,
  Sparkles,
  ChevronRight,
  Layers,
  FileText,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Target,
  GraduationCap
} from 'lucide-react';

// Types
interface Question {
  id: number;
  discipline: string;
  topic: string;
  banca: string;
  statement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
}

// Banco Consolidado - 100 Questões de Língua Portuguesa (FCC / SEFAZ-SC)
const QUESTION_BANK: Question[] = [
  {
    id: 1,
    discipline: "Língua Portuguesa",
    topic: "Emprego do Sinal Indicativo de Crase",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que o uso do sinal indicativo de crase está inteiramente CORRETO, considerando as exigências da norma-padrão.",
    options: [
      "A) O Auditor dirigiu-se à uma sala reservada para examinar os documentos fiscais da empresa.",
      "B) A fiscalização prestou informações relativas à obrigações acessórias devidas pelos contribuintes.",
      "C) As normas estaduais aplicam-se à todas as entidades privadas sujeitas ao controle tributário.",
      "D) O servidor deu ciência do despacho à gerência financeira, que tomou as providências cabíveis.",
      "E) A reunião começou à partir das nove horas, com a presença de todos os auditores convidados."
    ],
    correctAnswer: 3,
    explanation: "A) Incorreto: não ocorre crase antes do artigo indefinido 'uma'. B) Incorreto: 'à' no singular antes de palavra no plural ('obrigações') evidencia apenas preposição. C) Incorreto: não ocorre crase antes do pronome indefinido 'todas'. D) CORRETO: quem dá ciência, dá ciência de algo 'à gerência' (preposição 'a' + artigo feminino 'a'). E) Incorreto: não ocorre crase antes de verbo no infinitivo ('partir')."
  },
  {
    id: 2,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal e Nominal",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Considerando as regras gramaticais relativas à concordância verbal, assinale a frase que atende plenamente à norma-padrão da língua portuguesa.",
    options: [
      "A) Haviam muitos documentos pendentes de análise na repartição fiscal do Estado.",
      "B) Fazem anos que a legislação tributária catarinense não sofria alterações tão profundas.",
      "C) Tratam-se de processos administrativos complexos que exigem parecer técnico fundamentado.",
      "D) Mais de um auditor fiscal assinou o laudo referente à auditoria contábil do exercício.",
      "E) Aconteceram, durante a fiscalização, uma série de inconsistências nos livros de registro."
    ],
    correctAnswer: 3,
    explanation: "A) Incorreto: o verbo 'haver' no sentido de existir é impessoal (deve ficar no singular: 'Havia'). B) Incorreto: o verbo 'fazer' indicando tempo decorrido é impessoal (deve ficar no singular: 'Faz anos'). C) Incorreto: na estrutura com índice de indeterminabilidade do sujeito (verbo + se + preposição), o verbo fica no singular ('Trata-se de'). D) CORRETO: com a expressão 'mais de um', o verbo concorda com o numeral 'um', ficando no singular ('assinou'). E) Incorreto: o verbo 'acontecer' é pessoal e concorda com o sujeito 'uma série' ou 'inconsistências' ('Aconteceu... uma série' ou 'Aconteceram...')."
  },
  {
    id: 3,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Nominal",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a regência do verbo destacado atende às exigências da norma-padrão da língua escrita.",
    options: [
      "A) O relatório a que o auditor se referiu apresentava inconsistências nas contas anuais.",
      "B) Os contribuintes preferem mais sonegar os impostos do que cumprir a legislação tributária.",
      "C) O fiscal assistiu o debate técnico com atenção, mas não opinou sobre o caso concreto.",
      "D) Esta é a lei estadual que todos os cidadãos catarinenses simpatizam fortemente.",
      "E) O parecer técnico que o chefe da equipe de auditoria aspirava já foi publicado ontem."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: o verbo 'referir-se' exige a preposição 'a' ('referir-se a algo/alguém'), a qual deve anteceder o pronome relativo 'que'. B) Incorreto: o verbo 'preferir' exige a regência 'preferir algo a outro algo' (sem 'mais' ou 'do que'). C) Incorreto: 'assistir' no sentido de presenciar/ver é transitivo indireto com preposição 'a' ('assistiu ao debate'). D) Incorreto: o verbo 'simpatizar' exige preposição 'com' ('com que todos... simpatizam'). E) Incorreto: 'aspirar' no sentido de almejar é transitivo indireto com preposição 'a' ('a que o chefe... aspirava')."
  },
  {
    id: 4,
    discipline: "Língua Portuguesa",
    topic: "Pontuação e Emprego da Vírgula",
    banca: "FCC",
    difficulty: "Média",
    statement: "A alteração na pontuação do trecho 'O Auditor de Finanças Públicas, após examinar os livros fiscais, notificou a empresa' mantém o sentido original e a correção gramatical em:",
    options: [
      "A) O Auditor de Finanças Públicas após examinar os livros fiscais, notificou a empresa.",
      "B) O Auditor de Finanças Públicas, após examinar os livros fiscais notificou a empresa.",
      "C) O Auditor de Finanças Públicas notificou a empresa, após examinar os livros fiscais.",
      "D) O Auditor, de Finanças Públicas após examinar os livros fiscais, notificou a empresa.",
      "E) O Auditor de Finanças Públicas notificou, a empresa após examinar os livros fiscais."
    ],
    correctAnswer: 2,
    explanation: "A e B) Incorretas: a oração subordinada adverbial reduzida intercalada deve ficar isolada por duas vírgulas (ou sem nenhuma se for curta), não por apenas uma. C) CORRETO: o deslocamento da oração adverbial para o final do período mantém a correção gramatical e o sentido original, tornando a vírgula opcional ou explicativa da ordem temporal. D) Incorreta: separa indevidamente o termo especificador do núcleo do sujeito. E) Incorreta: Separa indevidamente o verbo ('notificou') do seu objeto direto ('a empresa')."
  },
  {
    id: 5,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal (Próclise, Ênclise e Mesóclise)",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Em conformidade com as regras relativas à colocação dos pronomes átonos, assinale a alternativa inteiramente correta.",
    options: [
      "A) Não enviou-se o relatório de gestão fiscal ao Tribunal de Contas dentro do prazo legal.",
      "B) Se identificou diversas irregularidades na escrituração contábil da empresa autuada.",
      "C) Os auditores apresentariam-nos os resultados da fiscalização caso houvesse tempo hábil.",
      "D) Poucos contribuintes se dispuseram a prestar esclarecimentos espontâneos ao Fisco.",
      "E) Conforme informaram-nos, o processo de restituição de tributos será analisado em breve."
    ],
    correctAnswer: 3,
    explanation: "A) Incorreto: a palavra negativa 'Não' atrai obrigatoriamente a próclise ('Não se enviou'). B) Incorreto: não se inicia frase com pronome oblíquo átono ('Identificou-se'). C) Incorreto: com o verbo no futuro do pretérito sem atrativo próclitico, aplica-se a mesóclise ('apresentar-nos-iam'). D) CORRETO: o pronome indefinido 'Poucos' atrai obrigatoriamente a próclise ('se dispuseram'). E) Incorreto: a conjunção subordinativa 'Conforme' é fator de atração próclitica ('nos informaram')."
  },
  {
    id: 6,
    discipline: "Língua Portuguesa",
    topic: "Ortografia Oficial e Acentuação Gráfica",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Assinale a opção em que TODAS as palavras estão grafadas e acentuadas corretamente de acordo com o Acordo Ortográfico vigente.",
    options: [
      "A) Auto-estrada, idéia, vôo, assembléia.",
      "B) Microrregião, heroico, para-raios, jibóia.",
      "C) Infraestrutura, prejuízo, caráter, histórico.",
      "D) Super-homem, lêem, creem, anti-semita.",
      "E) Micro-ondas, parabéns, tambem, canteiro."
    ],
    correctAnswer: 2,
    explanation: "A) Incorreto: o correto é 'autoestrada' (sem hífen), 'ideia', 'voo' e 'assembleia' (sem acento). B) Incorreto: 'jiboia' não leva acento tónico nas paroxítonas com ditongo aberto. C) CORRETO: todas as palavras estão ortográfica e acentuadamente corretas conforme as regras vigentes. D) Incorreto: o correto é 'antissemita' (dobra-se o 's'). E) Incorreto: 'também' exige acento agudo na oxítona terminada em '-em'."
  },
  {
    id: 7,
    discipline: "Língua Portuguesa",
    topic: "NEXOS E CONECTIVOS - Relações Sintático-Semânticas",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho: 'Embora o orçamento estadual tenha apresentado superávit no primeiro semestre, as despesas com pessoal exigem monitoramento contínuo', a oração introduzida pela conjunção destacada exprime ideia de:",
    options: [
      "A) Causa",
      "B) Concessão",
      "C) Condição",
      "D) Consequência",
      "E) Proporção"
    ],
    correctAnswer: 1,
    explanation: "'Embora' é uma conjunção subordinativa concessiva. A concessão exprime um fato que poderia opor-se à realização da oração principal, mas não impede a sua ocorrência (oposição/ressalva)."
  },
  {
    id: 8,
    discipline: "Língua Portuguesa",
    topic: "Vozes do Verbo e Transformação Sintática",
    banca: "FCC",
    difficulty: "Média",
    statement: "Transpondo-se para a voz passiva a frase 'A equipe de auditoria analisou minuciosamente todas as notas fiscais emitidas', a forma verbal resultante será:",
    options: [
      "A) Foram analisadas",
      "B) Tinha analisado",
      "C) Foi analisado",
      "D) Serão analisadas",
      "E) Houveram analisado"
    ],
    correctAnswer: 0,
    explanation: "Na voz ativa temos: Sujeito ('A equipe de auditoria') + Verbo no Pretérito Perfeito do Indicativo ('analisou') + Objeto Direto no plural ('todas as notas fiscais'). Na passagem para a voz passiva, o objeto direto passa a sujeito paciente ('Todas as notas fiscais') e o verbo passa a locução passiva correspondente no tempo pretérito perfeito plural: 'Foram analisadas'."
  },
  {
    id: 9,
    discipline: "Língua Portuguesa",
    topic: "Significação das Palavras (Sinonímia e Antonímia)",
    banca: "FCC",
    difficulty: "Média",
    statement: "No contexto da gestão pública, o termo 'PEREMPTÓRIO' empregado na frase 'A decisão administrativa teve caráter peremptório' é sinônimo de:",
    options: [
      "A) Provisório e sujeito a modificações.",
      "B) Categórico, definitivo e determinante.",
      "C) Ilícito e contrário à legislação.",
      "D) Negligente e sem valor jurídico.",
      "E) Ambigo e passível de dupla interpretação."
    ],
    correctAnswer: 1,
    explanation: "A palavra 'peremptório' significa decisivo, definitivo, categórico, dogmático, que não permite réplica nem discussão."
  },
  {
    id: 10,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial (Aviso, Ofício e Mnemônicos)",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Segundo o Manual de Redação da Presidência da República, o fecho adequado para correspondências oficiais dirigidas a autoridades de mesma hierarquia ou de hierarquia inferior é:",
    options: [
      "A) Respeitosamente,",
      "B) Atenciosamente,",
      "C) Cordialmente,",
      "D) Com os meus cumprimentos,",
      "E) Atentamente,"
    ],
    correctAnswer: 1,
    explanation: "Conforme o Manual de Redação Oficial: 1) 'Respeitosamente,' é utilizado para autoridades superiores (inclusive o Presidente). 2) 'Atenciosamente,' é utilizado para autoridades de mesma hierarquia, de hierarquia inferior ou para cidadãos."
  },
  {
    id: 11,
    discipline: "Língua Portuguesa",
    topic: "Equivalência e Transformação de Estruturas / Reorganização de Frases",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "O trecho 'Ainda que o Estado disponha de recursos financeiros substanciais, a alocação de verbas exige estrita observância ao princípio da legalidade' mantém a sua correção gramatical e o seu sentido original ao ter a conjunção destacada substituída por:",
    options: [
      "A) Contanto que o Estado disponha...",
      "B) Porquanto o Estado disponha...",
      "C) Embora o Estado disponha...",
      "D) A fim de que o Estado disponha...",
      "E) Segundo o Estado disponha..."
    ],
    correctAnswer: 2,
    explanation: "'Ainda que' introduz uma oração subordinada adverbial concessiva. A única conjunção equivalente do ponto de vista sintático e semântico entre as opções é 'Embora', que também exige o verbo no modo subjuntivo ('disponha'). A) 'Contanto que' indica condição; B) 'Porquanto' indica causa/explicação; D) 'A fim de que' indica finalidade; E) 'Segundo' indica conformidade."
  },
  {
    id: 12,
    discipline: "Língua Portuguesa",
    topic: "Concordância Nominal - Casos Especiais",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche corretamente e segundo a norma-padrão as lacunas da frase: 'Seguem ______ aos autos as cópias dos relatórios de auditoria fiscal; consideram-se ______ as explicações apresentadas pelo contribuinte e fica ______ a entrada de pessoas não autorizadas na sala de reuniões.'",
    options: [
      "A) anexos - bastantes - proibida",
      "B) anexo - bastante - proibido",
      "C) anexas - bastantes - proibida",
      "D) anexos - bastante - proibido",
      "E) anexas - bastante - proibida"
    ],
    correctAnswer: 2,
    explanation: "1) 'Seguem anexas' concorda com o sujeito 'as cópias' (feminino plural). 2) 'bastantes' funciona como adjetivo (equivalente a 'suficientes') e concorda com 'as explicações' no plural. 3) 'fica proibida a entrada': a presença do artigo 'a' diante do substantivo exige a concordância no feminino ('proibida')."
  },
  {
    id: 13,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Uso dos Dois-Pontos e do Ponto e Vírgula",
    banca: "FCC",
    difficulty: "Média",
    statement: "Considere o seguinte trecho: 'A Secretaria da Fazenda de Santa Catarina established três metas prioritárias para o exercício fiscal: modernizar os sistemas de fiscalização tributária; capacitar continuamente o corpo técnico de auditores; e garantir a transparência das contas públicas perante a sociedade.' A respeito da pontuação empregada, assinale a opção correta.",
    options: [
      "A) Os dois-pontos foram empregados incorretamente, pois separam o verbo do seu complemento direto.",
      "B) O ponto e vírgula é obrigatório apenas no encerramento de citações diretas intercaladas.",
      "C) O emprego do ponto e vírgula justifica-se para separar itens de uma enumeração complexa introduzida por dois-pontos.",
      "D) A vírgula antes da conjunção 'e' no último item deveria ser obrigatoriamente eliminada por razões sintáticas.",
      "E) A substituição dos dois-pontos por travessão alteraria substancialmente o sentido normativo do texto."
    ],
    correctAnswer: 2,
    explanation: "O ponto e vírgula é adequadamente utilizado para estruturar e separar os diversos tópicos de uma enumeração enumerativa explicativa, iniciada formalmente após a apresentação geral pelos dois-pontos."
  },
  {
    id: 14,
    discipline: "Língua Portuguesa",
    topic: "Flexão Verbal e Correlação dos Tempos Verbais",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a alternativa em que a correlação entre os tempos e modos verbais atende rigorosamente à norma-padrão da língua escrita.",
    options: [
      "A) Se o auditor fiscal manter a rigorosa fiscalização, o Estado arrecadará mais tributos.",
      "B) Se o auditor fiscal mantivesse a rigorosa fiscalização, o Estado arrecadaria mais tributos.",
      "C) Se o auditor fiscal mantivera a rigorosa fiscalização, o Estado arrecadaria mais tributos.",
      "D) Caso o auditor fiscal mantinha a rigorosa fiscalização, o Estado arrecadará mais tributos.",
      "E) Se o auditor fiscal manteria a rigorosa fiscalização, o Estado arrecadasse mais tributos."
    ],
    correctAnswer: 1,
    explanation: "A articulação temporal perfeita exige o Imperfeito do Subjuntivo na oração subordinada condicional ('se mantivesse') combinado com o Futuro do Pretérito do Indicativo na oração principal ('arrecadaria'). Na opção A, o correto seria 'Se o auditor mantiver... arrecadará' (Futuro do Subjuntivo + Futuro do Presente)."
  },
  {
    id: 15,
    discipline: "Língua Portuguesa",
    topic: "Morfossintaxe - Pronomes Relativos e Preposição",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que o pronome relativo está precedido da preposição exigida pela regência verbal do termo subordinado.",
    options: [
      "A) O sistema eletrônico de gestão fiscal onde o auditor extraiu os dados funcionava perfeitamente.",
      "B) O processo administrativo sobre cujas irregularidades o fisco investigava foi arquivado.",
      "C) A norma tributária a cujo cumprimento os auditores fiscais obedecem foi atualizada pelo Estado.",
      "D) As diretrizes orçamentárias de cujas o Secretário da Fazenda discordou foram reformuladas.",
      "E) Os documentos em cujos o contribuinte fundamentou sua defesa eram insuficientes."
    ],
    correctAnswer: 2,
    explanation: "A) Incorreto: 'onde' só indica lugar físico estático; para ação de extrair, o adequado seria 'do qual' ou 'de onde'. B) Incorreto: o verbo 'investigar' é transitivo direto (não exige 'sobre'). C) CORRETO: o verbo 'obedecer' é transitivo indireto e exige a preposição 'a' ('obedecem a algo'), a qual deve anteceder o pronome relativo cujo/cujo cumprimento. D e E) Incorretas: o pronome relativo 'cujo' concorda com o substantivo seguinte e não admite artigo 'os/as' acoplado ('de cujas diretrizes' ou 'em cujos fundamentos')."
  },
  {
    id: 16,
    discipline: "Língua Portuguesa",
    topic: "Processos de Formação de Palavras",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "No vocábulo 'DESBUROCRATIZAÇÃO', identifica-se um processo de formação de palavras por:",
    options: [
      "A) Derivação parassintética exclusivamente.",
      "B) Derivação prefixal e sufixal.",
      "C) Composição por aglutinação.",
      "D) Hibridismo e regressão.",
      "E) Composição por justaposição."
    ],
    correctAnswer: 1,
    explanation: "A palavra 'desburocratização' é formada pelo acréscimo simultâneo do prefixo 'des-' e dos sufixos '-izar/-ção' à base radical 'burocrata'. Como a remoção do prefixo mantém uma palavra existente ('burocratização'), trata-se de derivação prefixal e sufixal (diferente da parassíntese, em que a palavra não existe sem um dos elementos)."
  },
  {
    id: 17,
    discipline: "Língua Portuguesa",
    topic: "Interpretação de Texto - Denotação e Conotação",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a linguagem foi empregada em seu sentido estritamente DENOTATIVO (literal).",
    options: [
      "A) A sonegação fiscal é uma chaga profunda que corrói os alicerces do desenvolvimento social.",
      "B) O novo regulamento do ICMS deu luz verde para a simplificação dos procedimentos operacionais.",
      "C) Os auditores mergulharam de cabeça no mar de documentos digitais fornecidos pela empresa.",
      "D) A arrecadação de impostos estaduais cresceu cinco por cento no último trimestre do ano.",
      "E) O Tesouro Estadual blindou os cofres públicos contra as oscilações da economia internacional."
    ],
    correctAnswer: 3,
    explanation: "Denotação é o uso da palavra em seu sentido real, dicionarizado e objetivo. A frase D apresenta dados concretos e quantitativos sem o uso de metáforas ou figuras de linguagem. As demais alternativas contêm conotações ('chaga/corrói', 'luz verde', 'mergulharam de cabeça', 'blindou')."
  },
  {
    id: 18,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe do Período - Orações Subordinadas Substantivas",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na oração 'É indispensável que os contribuintes mantenham a escrituração fiscal atualizada', a oração sublinhada exerce a função sintática de:",
    options: [
      "A) Objeto direto",
      "B) Sujeito",
      "C) Complemento nominal",
      "D) Predicativo do sujeito",
      "E) Objeto indireto"
    ],
    correctAnswer: 1,
    explanation: "Estrutura: Verbo de ligação ('É') + Predicativo do Sujeito ('indispensável') + Oração Subordinada Substantiva Subjetiva ('que os contribuintes mantenham...'). Substituindo por 'Isso': 'Isso é indispensável' -> 'Isso' desempenha o papel de sujeito."
  },
  {
    id: 19,
    discipline: "Língua Portuguesa",
    topic: "Figuras de Linguagem",
    banca: "FCC",
    difficulty: "Média",
    statement: "No enunciado 'O fisco estadual leu e analisou dezenas de páginas de relatórios contábeis em poucas horas', a expressão 'páginas de relatórios' exemplifica a figura de linguagem denominada:",
    options: [
      "A) Metáfora",
      "B) Metonímia",
      "C) Hipérbole",
      "D) Pleonasmo",
      "E) Antítese"
    ],
    correctAnswer: 1,
    explanation: "A metonímia consiste na substituição de um termo por outro havendo entre eles uma relação de contiguidade de sentido, neste caso empregando a parte ('páginas') para designar o todo ('os documentos/relatórios na sua totalidade')."
  },
  {
    id: 20,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Padrão Ofício e Pronomes de Tratamento",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "De acordo com o Manual de Redação da Presidência da República, assinale a alternativa que indica o pronome de tratamento correto a ser utilizado no vocativo endereçado ao Governador do Estado de Santa Catarina.",
    options: [
      "A) Excelentíssimo Senhor Governador,",
      "B) Vossa Excelência o Senhor Governador,",
      "C) Magnífico Governador,",
      "D) Ilustríssimo Senhor Governador,",
      "E) Prezado Senhor Governador,"
    ],
    correctAnswer: 0,
    explanation: "O vocativo a ser empregado em comunicações dirigidas aos Chefes do Poder Executivo (Presidente da República, Governadores e Prefeitos) é 'Excelentíssimo Senhor' seguido do cargo correspondente ('Excelentíssimo Senhor Governador,')."
  },
  {
    id: 21,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Pronomes Relativos",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Considerando a regência verbal e o emprego dos pronomes relativos conforme a norma-padrão, assinale a opção inteiramente correta.",
    options: [
      "A) O projeto de fiscalização tributária a que todos os auditores simpatizaram foi aprovado pela diretoria.",
      "B) Os procedimentos contábeis de cujos os auditores divergiram serão reavaliados na próxima reunião.",
      "C) As normas operacionais a cujo cumprimento o Fisco estadual se obriga foram publicadas no Diário Oficial.",
      "D) O relatório fiscal onde o auditor apontou as rasuras foi anexado ao processo administrativo.",
      "E) A empresa autuada, em cujas contas o auditor encontrou inconsistências, apresentou defesa prévia."
    ],
    correctAnswer: 4,
    explanation: "A) Incorreto: o verbo 'simpatizar' exige a preposição 'com' ('com que todos... simpatizaram'). B) Incorreto: o pronome relativo 'cujo' não admite artigo antecedente ou subsequente ('de cujos auditores'). C) Incorreto: o verbo 'obrigar-se' exige a preposição 'a', mas 'cumprimento' exige a preposição 'com' ou 'de' ('a cujo cumprimento... se obriga' está redundante ou incorreto pela regência de 'cumprimento de'). D) Incorreto: 'onde' aplica-se a lugares físicos estáticos, não a documentos/relatórios ('no qual'). E) CORRETO: o verbo 'encontrar' aplica-se com a preposição 'em' ('encontrou inconsistências nas contas da empresa' -> 'em cujas contas')."
  },
  {
    id: 22,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Expressões Partitivas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que apresenta concordância verbal de acordo com a norma-padrão gramatical.",
    options: [
      "A) A maioria dos auditores fiscais compareceram ao treinamento de atualização sobre o ICMS.",
      "B) Grande parte dos processos de restituição tributária foram arquivados sem resolução de mérito.",
      "C) Cerca de cem empresas prestou esclarecimentos sobre as operações efetuadas no exercício.",
      "D) Mais de um contribuinte apresentaram recursos administrativos contestando o auto de infração.",
      "E) Nenhum dos fiscais presentes concordaram com as alterações propostas na instrução normativa."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: com expressões partitivas ('a maioria de', 'a maior parte de') seguidas de substantivo no plural, o verbo pode concordar no singular com o núcleo partitivo ('compareceu') ou no plural com o especificador ('compareceram'). C) Incorreto: 'cerca de cem' exige verbo no plural ('prestaram'). D) Incorreto: 'mais de um' exige verbo no singular ('apresentou'). E) Incorreto: com o pronome 'nenhum dos' no singular, o verbo fica obrigatoriamente no singular ('concordou')."
  },
  {
    id: 23,
    discipline: "Língua Portuguesa",
    topic: "Orações Reduzidas e Equivalência Sintática",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "A oração reduzida destacada em 'Ao concluir a auditoria das contas públicas, o fiscal lavrou o auto de infração' pode ser corretamente desenvolvida, sem alterar o sentido original, por:",
    options: [
      "A) Embora concluísse a auditoria...",
      "B) Assim que concluiu a auditoria...",
      "C) Visto que concluiu a auditoria...",
      "D) Para que concluísse a auditoria...",
      "E) Conforme concluía a auditoria..."
    ],
    correctAnswer: 1,
    explanation: "A oração reduzida de infinitivo 'Ao concluir...' possui valor sintático-semântico de tempo (temporal de imediatidade). Desenvolvendo-a com uma conjunção temporal equivalente, obtém-se 'Assim que concluiu...' ou 'Quando concluiu'."
  },
  {
    id: 24,
    discipline: "Língua Portuguesa",
    topic: "Morfossintaxe - Emprego e Colocação dos Pronomes Demais e Demonstrativos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que o emprego do pronome demonstrativo atende às exigências da norma escrita culta.",
    options: [
      "A) O Secretário da Fazenda e o Diretor de Auditoria reuniram-se ontem; este apresentou as metas e aquele os resultados.",
      "B) A arrecadação de tributos em Santa Catarina e no Paraná cresceu; nesta o ritmo foi mais acelerado do que naquela.",
      "C) Exijo apenas isto do contribuinte: a apresentação tempestiva das guias de recolhimento.",
      "D) O auditor referiu-se àquele documento que está em suas mãos agora.",
      "E) Essas informações que acabo de mencionar aqui no meu relatório são confidenciais."
    ],
    correctAnswer: 2,
    explanation: "C) CORRETO: o pronome demonstrativo 'isto' possui valor anafórico/catafórico antecedendo uma enumeração explicativa posterior. A) Incorreto: 'este' refere-se ao mais próximo (Diretor) e 'aquele' ao mais distante (Secretário). B) Incorreto: 'nesta' refere-se ao Estado mais próximo citado (Paraná) e 'naquela' ao mais distante (Santa Catarina). D) Incorreto: para o objeto próximo do interlocutor usa-se 'esse/essa'. E) Incorreto: para o objeto próximo do falante usa-se 'estas informações'."
  },
  {
    id: 25,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Uso do Travessão e Intercalações",
    banca: "FCC",
    difficulty: "Média",
    statement: "Considere a frase: 'A nova legislação do ICMS — aprovada recentemente pela Assembleia Legislativa — trará maior simplicidade operacional.' O par de travessões pode ser substituído, mantendo a correção gramatical e o sentido, por:",
    options: [
      "A) duas aspas.",
      "B) duas vírgulas.",
      "C) dois pontos e vírgula.",
      "D) duas barras inclinadas.",
      "E) dois pontos."
    ],
    correctAnswer: 1,
    explanation: "Elementos explicativos, orações adjetivas explicativas ou termos intercalados podem ser isolados indistintamente por par de travessões, par de vírgulas ou par de parênteses."
  },
  {
    id: 26,
    discipline: "Língua Portuguesa",
    topic: "Flexão de Modo e Tempo do Subjuntivo",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Substituindo-se a forma verbal sublinhada em 'Caso o auditor REANISSE os documentos, encontraria o erro', pelo verbo 'VER', a forma adequada segundo a norma-padrão será:",
    options: [
      "A) ver",
      "B) visse",
      "C) vir",
      "D) veria",
      "E) visse-se"
    ],
    correctAnswer: 1,
    explanation: "O verbo 'reanalisasse' está flexionado no Imperfeito do Subjuntivo. A flexão correspondente do verbo 'ver' no Imperfeito do Subjuntivo é 'visse' ('Caso o auditor visse os documentos, encontraria o erro'). Se fosse Futuro do Subjuntivo ('Se o auditor reanalisar...'), a forma do verbo ver seria 'vir'."
  },
  {
    id: 27,
    discipline: "Língua Portuguesa",
    topic: "NEXOS E CONECTIVOS - Conjunções Adversativas vs Concessivas",
    banca: "FCC",
    difficulty: "Média",
    statement: "A frase 'O fisco estadual intensificou a fiscalização, contudo a sonegação fiscal ainda persiste' pode ser reescrita com alteração da estrutura semântico-sintática sem perder a correção por:",
    options: [
      "A) Como o fisco estadual intensificou a fiscalização, a sonegação fiscal ainda persiste.",
      "B) Embora o fisco estadual tenha intensificado a fiscalização, a sonegação fiscal ainda persiste.",
      "C) À medida que o fisco estadual intensificou a fiscalização, a sonegação fiscal ainda persiste.",
      "D) Porquanto o fisco estadual intensificou a fiscalização, a sonegação fiscal ainda persiste.",
      "E) Caso o fisco estadual intensifique a fiscalização, a sonegação fiscal ainda persiste."
    ],
    correctAnswer: 1,
    explanation: "'Contudo' é conjunção coordenativa adversativa (oposição entre orações independentes). A reescrita preserva a ideia central de oposição transformando a primeira oração em uma subordinada concessiva introduzida por 'Embora' com o verbo devidamente ajustado ao subjuntivo ('tenha intensificado')."
  },
  {
    id: 28,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe - Concordância do Verbo Parecer + Infinitivo",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na frase 'As irregularidades encontradas nos livros contábeis PARECER SER graves', a concordância verbal aceita pela norma-padrão admite também a seguinte forma alternativa:",
    options: [
      "A) Parecem serem",
      "B) Parecem ser",
      "C) Pareceria serem",
      "D) Parecessem ser",
      "E) Pareciam serem"
    ],
    correctAnswer: 1,
    explanation: "Na locução 'parecer + infinitivo', a concordância pode ser feita de duas formas válidas: 1) flexiona-se o verbo parecer e mantém-se o infinitivo impessoal ('As irregularidades parecem ser'); ou 2) mantém-se o verbo parecer no singular e flexiona-se o infinitivo ('As irregularidades parece serem'). A opção B apresenta a forma plenamente correta da primeira regra."
  },
  {
    id: 29,
    discipline: "Língua Portuguesa",
    topic: "Semântica - Parônimos e Homônimos na Linguagem Jurídico-Fiscal",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção que preenche correta e respectivamente as lacunas da frase: 'O contribuinte solicitou a ______ do imposto devido, alegando que a alíquota applied iria ______ os seus investimentos no Estado.'",
    options: [
      "A) remissão - afetar",
      "B) remição - afetar",
      "C) remissão - auferir",
      "D) remição - auferir",
      "E) rescisão - afetar"
    ],
    correctAnswer: 0,
    explanation: "1) 'Remissão' (com 'ss') significa perdão/cancelação de dívida ou tributo. ('Remição' com 'ç' significa resgate/pagamento de dívida). 2) 'Afetar' significa produzir efeito/causar prejuízo. 3) 'Auferir' significa colher/obter lucros."
  },
  {
    id: 30,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Forma de Tratamento e Endereçamento",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "No cabeçalho ou endereçamento de um documento oficial destinado a um Juiz de Direito de Comarca Estadual, o tratamento adequado é:",
    options: [
      "A) Ao Excelentíssimo Senhor Juiz de Direito,",
      "B) Ao Meritíssimo Juiz de Direito,",
      "C) Ao Ilustríssimo Senhor Juiz de Direito,",
      "D) Ao Vossa Excelência Juiz de Direito,",
      "E) Ao Prezado Senhor Juiz de Direito,"
    ],
    correctAnswer: 0,
    explanation: "Segundo o Manual de Redação da Presidência da República, os membros do Poder Judiciário (incluindo Juízes de Direito) recebem o tratamento formal de 'Excelentíssimo Senhor' no endereçamento ('Ao Excelentíssimo Senhor Juiz de Direito...'). A forma 'Meritíssimo' é tradicional do foro judiciário, mas não é a forma recomendada nos manuais oficiais de redação do Executivo."
  },
  {
    id: 31,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal em Locuções Verbais",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Considerando as regras de colocação dos pronomes átonos nas locuções verbais, assinale a opção em que a frase atende inteiramente à norma-padrão.",
    options: [
      "A) Não se deve enviar os relatórios de auditoria sem a devida assinatura do fiscal responsável.",
      "B) Os auditores não deviam ter-se pronunciado sobre o processo antes da decisão final.",
      "C) Ninguém deve-se responsabilizar por inconsistências encontradas nos livros fiscais.",
      "D) O fisco estadual vai enviar-nos os comprovantes de arrecadação do último exercício.",
      "E) Todas as alternativas anteriores estão corretas conforme a norma-padrão."
    ],
    correctAnswer: 4,
    explanation: "Em locuções verbais: A) Com palavra de atração ('Não'), o pronome pode ficar antes do verbo auxiliar ('Não se deve enviar') ou depois do infinitivo ('Não deve enviar-se'). B) Com infinitivo ou gerúndio, o pronome pode vir ligado ao verbo principal ('ter-se pronunciado'). C) Com palavra atrativa ('Ninguém'), o pronome pode vir após a locução se o verbo principal for infinitivo, mas no uso padrão a atração atrai o pronome para antes do auxiliar. D) Em locuções com infinitivo sem palavra de atração, o pronome pode ficar após o verbo principal ('enviar-nos') ou após o auxiliar ('vai-nos enviar'). Portanto, as construções apresentadas cumprem os preceitos gramaticais aceitos pela FCC."
  },
  {
    id: 32,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Pronomes Relativos QUE e QUEM",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas da frase: 'Fomos nós que ______ as inconsistências contábeis no balanço; no entanto, fomos nós quem ______ o auto de infração tributária.'",
    options: [
      "A) identificou - lavrou",
      "B) identificamos - lavrou",
      "C) identificamos - lavramos",
      "D) identificou - lavramos",
      "E) identificaram - lavraram"
    ],
    correctAnswer: 1,
    explanation: "1) Com o pronome relativo 'QUE', o verbo concorda obrigatoriamente com o antecedente ('nós identificamos'). 2) Com o pronome relativo 'QUEM', o verbo pode concordar na 3ª pessoa do singular ('quem lavrou') ou concordar com o antecedente 'nós' ('quem lavramos'). A alternativa B apresenta a combinação perfeitamente aceita e preferencial pela banca FCC."
  },
  {
    id: 33,
    discipline: "Língua Portuguesa",
    topic: "Pontuação e Distinção entre Orações Adjetivas Explicativas e Restritivas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Considere as frases:\nI. Os auditores fiscais, que concluíram o relatório de auditoria, foram elogiados pela diretoria.\nII. Os auditores fiscais que concluíram o relatório de auditoria foram elogiados pela diretoria.\n\nAnalisando o emprego das vírgulas e o sentido das frases, é correto afirmar que:",
    options: [
      "A) A frase I indica que apenas uma parte dos auditores fiscais concluiu o relatório.",
      "B) A frase II indica que a totalidade dos auditores fiscais da repartição concluiu o relatório.",
      "C) A eliminação das vírgulas na frase I altera a classificação da oração e o sentido do texto.",
      "D) Ambas as frases possuem exatamente o mesmo significado sintático e semântico.",
      "E) A frase II apresenta erro gramatical por omitir o par de vírgulas obrigatório."
    ],
    correctAnswer: 2,
    explanation: "A frase I contém uma oração subordinada adjetiva explicativa (entre vírgulas), indicando que TODOS os auditores concluíram o relatório. A frase II contém uma oração subordinada adjetiva restritiva (sem vírgulas), restringindo o elogio APENAS aos auditores que concluíram o relatório. A eliminação das vírgulas altera a classificação sintática e o sentido do enunciado."
  },
  {
    id: 34,
    discipline: "Língua Portuguesa",
    topic: "NEXOS E CONECTIVOS - Relação de Causa e Consequência",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho 'A fiscalização foi tão rigorosa que os contribuintes irregularmente inscritos buscaram regularizar suas pendências', a oração sublinhada introduz uma relação de:",
    options: [
      "A) Causa",
      "B) Consequência",
      "C) Condição",
      "D) Concessão",
      "E) Comparação"
    ],
    correctAnswer: 1,
    explanation: "A estrutura 'tão... que' (ou 'tanto... que', 'tamanho... que') introduz uma oração subordinada adverbial consecutiva, expressando o resultado ou a consequência direta do fato mencionado na oração principal ('A fiscalização foi tão rigorosa...')."
  },
  {
    id: 35,
    discipline: "Língua Portuguesa",
    topic: "Significação das Palavras - Homônimos e Parônimos Fiscais",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que a palavra em destaque foi empregada de acordo com o seu significado correto no contexto da administração pública.",
    options: [
      "A) O contribuinte agiu com discricionariedade ao sonegar o imposto sobre operações relativas à circulação de mercadorias.",
      "B) O fiscal agiu com discrição e celeridade ao examinar as denúncias de fraudes no recolhimento do tributo.",
      "C) A infração fiscal prescreveu devido à cassação das atividades de fiscalização promovida pelo órgão estadual.",
      "D) A remição total do débito tributário foi concedida pelo Estado sem a necessidade de pagamento prévio.",
      "E) O Secretário da Fazenda diferiu do cargo após ter completado o tempo regulamentar de serviço público."
    ],
    correctAnswer: 1,
    explanation: "A) Incorreto: 'discricionariedade' não justifica ilícito/sonegação. B) CORRETO: 'discrição' significa prudência, moderação e reserva de comportamento. C) Incorreto: o adequado seria 'paralisação/cessação' (cassação é anulação de direito/mandato). D) Incorreto: perdão de dívida sem pagamento é 'remissão' (com 'ss'). E) Incorreto: deixar o cargo é 'exonerou-se/afastou-se' ou 'diferiu' no sentido de adiar tributo."
  },
  {
    id: 36,
    discipline: "Língua Portuguesa",
    topic: "Reorganização de Frases e Semântica",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "A frase 'Não obstante a complexidade da legislação tributária, o contribuinte cumpriu rigorosamente as obrigações acessórias' pode ser reescrita, mantendo a correção gramatical e a coerência textual, por:",
    options: [
      "A) Por causa da complexidade da legislação tributária, o contribuinte cumpriu rigorosamente as obrigações acessórias.",
      "B) Apesar de a legislação tributária ser complexa, o contribuinte cumpriu rigorosamente as obrigações acessórias.",
      "C) Visto que a legislação tributária é complexa, o contribuinte cumpriu rigorosamente as obrigações acessórias.",
      "D) A fim de que a legislação tributária seja complexa, o contribuinte cumpriu rigorosamente as obrigações acessórias.",
      "E) Desde que a legislação tributária fosse complexa, o contribuinte cumpriu rigorosamente as obrigações acessórias."
    ],
    correctAnswer: 1,
    explanation: "'Não obstante' é uma locução conjuntiva de valor concessivo (oposição que não impede o fato principal). A única reescrita que preserva essa relação sintático-semântica de concessão é 'Apesar de...'."
  },
  {
    id: 37,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe do Período - Orações Subordinadas Adverbiais Finais e Proporcionais",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho 'À medida que o Fisco estadual aprimora os seus mecanismos digitais de controle, diminui a margem para a sonegação de impostos', a locução destacada estabelece relação de:",
    options: [
      "A) Proporção",
      "B) Tempo",
      "C) Causa",
      "D) Condição",
      "E) Conformidade"
    ],
    correctAnswer: 0,
    explanation: "'À medida que' (assim como 'à proporção que') é uma locução conjuntiva subordinativa proporcional, indicando um fato que ocorre simultaneamente e na mesma proporção que outro."
  },
  {
    id: 38,
    discipline: "Língua Portuguesa",
    topic: "Regência e Crase - Casos Especiais com Nomes Próprios de Lugares",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que o uso do sinal indicativo de crase está empregado corretamente diante de nomes geográficos.",
    options: [
      "A) O Auditor de Finanças Públicas viajou à Florianópolis para participar da reunião anual.",
      "B) O Auditor de Finanças Públicas viajou à bela Florianópolis para participar da reunião anual.",
      "C) A comissão de fiscalização dirigiu-se à Santa Catarina no início da manhã.",
      "D) O relatório fiscal fez referência à Porto Alegre e suas receitas tributárias.",
      "E) Os técnicos retornaram à Brasília após a conclusão da auditoria."
    ],
    correctAnswer: 1,
    explanation: "Nomes de cidades geralmente não admitem artigo definido 'a' (quem vai a Florianópolis, volta de Florianópolis - sem crase). No entanto, quando o nome do lugar vem especificado ou acompanhado de um adjetivo/qualificador ('à bela Florianópolis'), o artigo passa a ser obrigatório, ocorrendo a crase."
  },
  {
    id: 39,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Emprego e Flexão dos Substantivos Compostos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a forma plural do substantivo composto está grafada de acordo com a norma-padrão.",
    options: [
      "A) O Fisco instalou novos para-raios nos prédios das gerências regionais.",
      "B) Os abaixo-assinados foram encaminhados ao Secretário da Fazenda.",
      "C) Foram aprovados os decretos-leis referentes à reorganização tributária.",
      "D) Os fiscais utilizaram salvos-condutos para transitar em áreas restritas.",
      "E) Todas as opções anteriores apresentam o plural correto."
    ],
    correctAnswer: 4,
    explanation: "Todas as palavras estão flexionadas corretamente no plural: 1) para-raios (verbo + substantivo = apenas o segundo varia); 2) abaixo-assinados (advérbio + adjetivo = apenas o segundo varia); 3) decretos-leis (substantivo + substantivo = ambos variam ou apenas o primeiro); 4) salvos-condutos (adjetivo + substantivo = ambos variam)."
  },
  {
    id: 40,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Padrão de Correspondência Técnica",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "De acordo com as normas de Redação Oficial, no padrão ofício, a diagramação do texto deve observar o seguinte requisito:",
    options: [
      "A) O uso de fonte colorida e decorativa nos títulos para destacar as seções do documento.",
      "B) A numeração obrigatória de todos os parágrafos do documento, incluindo o primeiro parágrafo de introdução.",
      "C) O espaçamento simples entre as linhas e o alinhamento justificado do texto principal.",
      "D) A inclusão de saudações informais e votos de estima no encerramento da comunicação.",
      "E) A ausência de margens laterais para maximizar o aproveitamento do papel."
    ],
    correctAnswer: 2,
    explanation: "Conforme o Manual de Redação da Presidência da República, o texto dos documentos oficiais deve ser formatado com alinhamento justificado, espaçamento simples entre linhas (ou 1,5 dependendo da norma específica do órgão) e margens padronizadas. A numeração de parágrafos é obrigatória a partir do segundo parágrafo (o primeiro não se numera)."
  },
  {
    id: 41,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Pronomes Relativos",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a opção em que a preposição que antecede o pronome relativo está empregada em estrita observância às regras de regência da norma-padrão.",
    options: [
      "A) O parecer técnico de cujas conclusões o auditor discordou frontalmente foi anexado ao processo.",
      "B) A empresa fiscalizada a cuja sede os auditores dirigiram-se prestou os devidos esclarecimentos.",
      "C) As normas tributárias com cujo cumprimento o Fisco estadual exige foram atualizadas este ano.",
      "D) O relatório fiscal sobre cujos dados o contribuinte referiu-se continha erros de cálculo.",
      "E) A instrução normativa em cujos termos os fiscais fundamentaram-se foi revogada recentemente."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: o verbo 'discordar' é transitivo indireto e exige a preposição 'de' ('discordou de algo/de cujas conclusões'). B) Incorreto: o verbo 'dirigir-se' exige preposição 'a' e atrai próclise ('a cuja sede os auditores se dirigiram'). C) Incorreto: o verbo 'exigir' é transitivo direto no contexto ('exige o cumprimento de algo'). D) Incorreto: o verbo 'referir-se' exige preposição 'a' ('a cujos dados'). E) Incorreto: o verbo 'fundamentar-se' exige preposição 'em' ou 'com', mas a colocação do pronome 'se' no final da locução verbal antecedida de atração está incorreta."
  },
  {
    id: 42,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Sujeito Composto e Verbo Anteposto",
    banca: "FCC",
    difficulty: "Média",
    statement: "Considere a frase: '______ ontem ao Fisco estadual o relatório de auditoria e a prestação de contas do exercício.' De acordo com a norma-padrão, a lacuna deve ser preenchida por:",
    options: [
      "A) Chegou (apenas)",
      "B) Chegaram (apenas)",
      "C) Chegou ou Chegaram",
      "D) Tinham chegado (apenas)",
      "E) Chegara (apenas)"
    ],
    correctAnswer: 2,
    explanation: "Quando o verbo está anteposto ao sujeito composto ('o relatório...' e 'a prestação...'), a concordância pode ser feita de duas formas válidas: 1) no plural, concordando com a totalidade dos núcleos do sujeito ('Chegaram'); ou 2) no singular, concordando por atração com o núcleo mais próximo ('Chegou')."
  },
  {
    id: 43,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe do Período - Orações Subordinadas Adverbiais Condicionais e Concessivas",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na frase 'Sem que os auditores examinem minuciosamente a escrituração contábil, não será possível identificar eventuais fraudes no recolhimento do imposto', a oração sublinhada equivale sintaticamente a:",
    options: [
      "A) Caso os auditores examinem...",
      "B) A menos que os auditores examinem...",
      "C) Ainda que os auditores examinem...",
      "D) Porquanto os auditores examinem...",
      "E) Visto que os auditores examinem..."
    ],
    correctAnswer: 1,
    explanation: "'Sem que' estabelece uma relação condicional negativa. A expressão equivalente que mantém o valor condicional de exceção/hipótese negativa é 'A menos que' (ou 'A não ser que')."
  },
  {
    id: 44,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Uso da Vírgula entre Oração Principal e Subordinada",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que o emprego da vírgula é OBRIGATÓRIO conforme a norma-padrão.",
    options: [
      "A) Os auditores afirmaram que o relatório final será entregue amanhã.",
      "B) O contribuinte apresentou a defesa antes que terminasse o prazo legal.",
      "C) Como o prazo de fiscalização havia expirado o auto de infração foi anulado.",
      "D) Todos os pareceres elaborados pela equipe técnica foram aprovados.",
      "E) A empresa recolheu o imposto devido no primeiro dia útil do mês."
    ],
    correctAnswer: 2,
    explanation: "Na opção C, há uma oração subordinada adverbial causal anteposta à oração principal ('Como o prazo de fiscalização havia expirado,...'). Quando a oração adverbial surge anteposta ou intercalada, o uso da vírgula para separá-la da oração principal é obrigatório."
  },
  {
    id: 45,
    discipline: "Língua Portuguesa",
    topic: "Ortografia e Acentuação - Regras de Paroxítonas e Oxítonas",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Assinale a opção em que todas as palavras são acentuadas graficamente pela MESMA regra gramatical.",
    options: [
      "A) Relatório, tributária, matéria, exigência.",
      "B) Caráter, através, relatório, acórdão.",
      "C) Fisco, pública, análise, déficit.",
      "D) Também, Paraná, relatório, através.",
      "E) Ímpar, útil, país, saída."
    ],
    correctAnswer: 0,
    explanation: "Todas as palavras da opção A ('Relatório', 'tributária', 'matéria', 'exigência') são paroxítonas terminadas em ditongo crescente (ou oral), seguindo rigorosamente a mesma regra de acentuação."
  },
  {
    id: 46,
    discipline: "Língua Portuguesa",
    topic: "Crase - Expressões Adverbiais e Prepositivas Femininas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas da frase: 'O Fisco atuou _____ proporção que surgiam as denúncias, agindo _____sombra da lei e dedicando-se _____ busca de provas incontestáveis.'",
    options: [
      "A) à - à - à",
      "B) a - a - a",
      "C) à - a - à",
      "D) a - à - a",
      "E) à - à - a"
    ],
    correctAnswer: 0,
    explanation: "1) 'à proporção que': locução conjuntiva proporcional feminina (exige crase). 2) 'à sombra da': locução prepositiva feminina (exige crase). 3) 'dedicando-se à busca': o verbo dedicar-se exige preposição 'a' + artigo feminino 'a' antes do substantivo 'busca' (= à busca)."
  },
  {
    id: 47,
    discipline: "Língua Portuguesa",
    topic: "Significação das Palavras - Antonímia no Contexto Jurídico",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a palavra sublinhada apresenta um antônimo adequado no contexto da frase 'A decisão do Fisco foi REVOGÁVEL após a apresentação de novas provas'.",
    options: [
      "A) Anulável",
      "B) Irretratável",
      "C) Transitória",
      "D) Modificável",
      "E) Provisória"
    ],
    correctAnswer: 1,
    explanation: "'Revogável' significa passível de anulação, cancelamento ou alteração. O seu antônimo direto (aquilo que não se pode anular ou alterar) é 'irretratável' ou 'irrevogável'."
  },
  {
    id: 48,
    discipline: "Língua Portuguesa",
    topic: "Semântica e Colocação dos Adjetivos",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale o par de frases em que a alteração na posição do adjetivo acarreta mudança de sentido e de classe gramatical do termo.",
    options: [
      "A) O auditor nobre / O nobre auditor",
      "B) Um funcionário simples / Um simples funcionário",
      "C) Uma decisão justa / Uma justa decisão",
      "D) Um resultado péssimo / Um péssimo resultado",
      "E) Um relatório claro / Um claro relatório"
    ],
    correctAnswer: 1,
    explanation: " Em 'funcionário simples', 'simples' é adjetivo e significa humilde/sem ornamentos. Em 'simples funcionário', 'simples' passa a funcionar semanticamente como adjetivo com valor restritivo/pronominal (significando 'mero/apenas um funcionário').Nas demais opções ocorrem mudanças apenas de ênfase expressiva."
  },
  {
    id: 49,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Emprego e Valor das Formas Nominais do Verbo",
    banca: "FCC",
    difficulty: "Média",
    statement: "Na frase 'Concluída a auditoria, os fiscais lavraram o auto de infração', a forma verbal em destaque encontra-se no gerúndio, particípio ou infinitivo e desempenha função sintática equivalente a uma oração:",
    options: [
      "A) Adverbial causal",
      "B) Adverbial temporal",
      "C) Adjetiva explicativa",
      "D) Substantiva subjetiva",
      "E) Adverbial final"
    ],
    correctAnswer: 1,
    explanation: "'Concluída' é um particípio (forma nominal). A oração reduzida de particípio 'Concluída a auditoria' equivale à oração subordinada adverbial temporal desenvolvida: 'Assim que foi concluída a auditoria' ou 'Quando se concluiu a auditoria'."
  },
  {
    id: 50,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Estrutura de Documentos Técnicos",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "No âmbito da Redação Oficial, o documento interno utilizado para a comunicação entre unidades administrativas de um mesmo órgão governamental é denominado:",
    options: [
      "A) Parecer",
      "B) Decreto",
      "C) Memorando",
      "D) Portaria",
      "E) Edital"
    ],
    correctAnswer: 2,
    explanation: "O Memorando é a modalidade de comunicação eminentemente interna expedida entre unidades administrativas de um mesmo órgão (atualmente unificado com o aviso e o ofício sob o termo genérico 'Padrão Ofício' no Manual da Presidência, mantendo a sua finalidade de trâmite interno)."
  },
  {
    id: 51,
    discipline: "Língua Portuguesa",
    topic: "Equivalência e Transformação de Estruturas / Reorganização de Frases",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "O segmento 'A despeito de a arrecadação ter superado as metas previstas no orçamento, o Estado manteve a política de contenção de despesas' preserva a correção gramatical e o seu sentido original ao ser reescrito como:",
    options: [
      "A) Porquanto a arrecadação superou as metas previstas no orçamento, o Estado manteve a política de contenção de despesas.",
      "B) Não obstante a arrecadação ter superado as metas previstas no orçamento, o Estado manteve a política de contenção de despesas.",
      "C) Conquanto a arrecadação superasse as metas previstas no orçamento, o Estado manteria a política de contenção de despesas.",
      "D) À medida que a arrecadação superou as metas previstas no orçamento, o Estado manteve a política de contenção de despesas.",
      "E) Desde que a arrecadação superasse as metas previstas no orçamento, o Estado manteve a política de contenção de despesas."
    ],
    correctAnswer: 1,
    explanation: "'A despeito de' introduz uma oração com valor concessivo. A locução 'Não obstante' é perfeitamente equivalente do ponto de vista sintático e semântico, mantendo a oração reduzida no infinitivo ('ter superado') e a correção do período."
  },
  {
    id: 52,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Pronomes Relativos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas da frase: 'As normas tributárias _____ aplicação o fiscal fez referência foram contestadas pelo contribuinte _____ conduta se investigava.'",
    options: [
      "A) a cuja - cuja",
      "B) de cuja - de cuja",
      "C) a cuja - cuja a",
      "D) em cuja - cuja",
      "E) cuja - de cuja"
    ],
    correctAnswer: 0,
    explanation: "1) O substantivo 'referência' exige a preposição 'a' ('fez referência a algo/a cuja aplicação'). 2) O verbo 'investigar' é transitivo direto ('investigava a conduta do contribuinte/cuja conduta se investigava'). O pronome 'cujo' não admite artigo pós-posto ('cuja a' está incorreto)."
  },
  {
    id: 53,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal - Sujeito Oracional e Verbos Impessoais",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a opção em que a concordância verbal atende rigorosamente às exigências da norma-padrão da língua escrita.",
    options: [
      "A) Deve haver muitos processos pendentes de julgamento no Tribunal de Impostos.",
      "B) Devem haver muitos processos pendentes de julgamento no Tribunal de Impostos.",
      "C) Vão fazer dez anos que a Lei de Responsabilidade Fiscal foi atualizada.",
      "D) Tratam-se de inconsistências graves detectadas na escrituração contábil.",
      "E) Podem haver novas autuações fiscais caso a fiscalização seja intensificada."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: na locução verbal com o verbo 'haver' no sentido de existir, o verbo auxiliar ('dever') herda a impessoalidade do verbo principal, devendo permanecer obrigatoriamente no singular ('Deve haver'). B e E) Incorretas: o auxiliar não deve ir para o plural. C) Incorreta: o verbo 'fazer' indicando tempo decorrido transmite impessoalidade ao auxiliar ('Vai fazer'). D) Incorreta: verbo com SE + preposição fica no singular ('Trata-se de')."
  },
  {
    id: 54,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Emprego do Ponto e Vírgula e da Vírgula",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que a pontuação está empregada de acordo com as normas gramaticais vigentes.",
    options: [
      "A) O Auditor de Finanças examinou os documentos, o fiscal de campo autuou a empresa, e o Secretário homologou o processo.",
      "B) O Auditor de Finanças, examinou os documentos; o fiscal de campo autuou a empresa, e o Secretário homologou o processo.",
      "C) O Auditor de Finanças examinou os documentos; o fiscal de campo, autuou a empresa; e o Secretário, homologou o processo.",
      "D) O Auditor de Finanças examinou os documentos, o fiscal de campo, autuou a empresa, e o Secretário homologou, o processo.",
      "E) O Auditor de Finanças examinou, os documentos; o fiscal de campo autuou, a empresa e o Secretário homologou a decisão."
    ],
    correctAnswer: 0,
    explanation: "Em orações coordenadas assindéticas e sindéticas com sujeitos diferentes ('O Auditor...', 'o fiscal...', 'o Secretário...'), a vírgula é empregada corretamente para separar as orações, incluindo a vírgula antes da conjunção 'e' quando os sujeitos de cada oração forem distintos."
  },
  {
    id: 55,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe - Função das Palavras QUE e SE",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na frase 'Sabe-se QUE a fiscalização tributária será intensificada no próximo trimestre', a palavra destacada classifica-se sintaticamente como:",
    options: [
      "A) Conjunção subordinativa integrante.",
      "B) Pronome relativo com função de sujeito.",
      "C) Conjunção subordinativa causal.",
      "D) Pronome indefinido explicativo.",
      "E) Conjunção coordenativa explicativa."
    ],
    correctAnswer: 0,
    explanation: "O 'QUE' introduz uma oração subordinada substantiva subjetiva ('Sabe-se ISTO' -> 'Que a fiscalização será intensificada é sabido'). Por introduzir uma oração subordinada substantiva, trata-se de uma conjunção subordinativa integrante."
  },
  {
    id: 56,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal em Frases Interrogativas e Negativas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que a colocação do pronome oblíquo átono obedece às regras de próclise obrigatória.",
    options: [
      "A) Quem informou-lhe sobre as novas diretrizes do ICMS?",
      "B) Quem lhe informou sobre as novas diretrizes do ICMS?",
      "C) Quem informou-no sobre as novas diretrizes do ICMS?",
      "D) Informou-se-lhe sobre as novas diretrizes do ICMS ontem.",
      "E) Ninguém informou-lhe sobre as novas diretrizes do ICMS."
    ],
    correctAnswer: 1,
    explanation: "Pronomes interrogativos ('Quem') e palavras de sentido negativo ('Ninguém') são fatores de atração próclitica obrigatória. Assim, o pronome deve vir antes do verbo ('Quem lhe informou...'). A opção A e E violam a atração da próclise."
  },
  {
    id: 57,
    discipline: "Língua Portuguesa",
    topic: "Crase - Ocorrência facultativa e obrigatória",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que o uso do sinal indicativo de crase é FACULTATIVO.",
    options: [
      "A) O fiscal entregou o relatório à diretoria financeira.",
      "B) O parecer técnico fez referência à lei de diretrizes orçamentárias.",
      "C) O auditor dirigiu-se à sua mesa para concluir o parecer.",
      "D) A reunião estendeu-se até à noite sem alcançar consenso.",
      "E) O contribuinte prestou declarações à comissão de auditoria."
    ],
    correctAnswer: 2,
    explanation: "O uso da crase é facultativo: 1) diante de pronomes possessivos femininos no singular ('à sua mesa' / 'a sua mesa'); 2) diante de nomes próprios femininos não especificados; 3) após a preposição 'até' diante de palavras femininas."
  },
  {
    id: 58,
    discipline: "Língua Portuguesa",
    topic: "Semântica - Sentido Figurado vs Sentido Próprio",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Assinale a alternativa em que a palavra 'leão' foi empregada em sentido conotativo (figurado).",
    options: [
      "A) O leão do zoológico de Florianópolis recebeu atendimento veterinário.",
      "B) O leão é um mamífero carnívoro pertencente à família dos felídeos.",
      "C) Os contribuintes preparam-se para prestar contas ao Leão no próximo mês.",
      "D) O caçador avistou um leão durante a sua expedição na África.",
      "E) O biólogo estudou o comportamento do leão em seu habitat natural."
    ],
    correctAnswer: 2,
    explanation: "Na alternativa C, a palavra 'Leão' é empregada conotativamente (metonímia/metáfora cultural) para designar o Fisco / Receita Federal, diferindo do seu sentido denotativo (animal felídeo) presente nas demais opções."
  },
  {
    id: 59,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Formação do Plural dos Adjetivos Compostos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a flexão de plural do adjetivo composto está CORRETA.",
    options: [
      "A) Foram debatidas questões político-econômicas de grande relevância.",
      "B) Foram debatidas questões políticas-econômicas de grande relevância.",
      "C) Foram debatidas questões políticas-econômicos de grande relevância.",
      "D) Foram debatidas questões político-econômico de grande relevância.",
      "E) Foram debatidas questões políticos-econômicas de grande relevância."
    ],
    correctAnswer: 0,
    explanation: "Nos adjetivos compostos, via de regra, apenas o último elemento varia em gênero e número para concordar com o substantivo a que se refere ('questões político-econômicas')."
  },
  {
    id: 60,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Padrão Ofício e Estrutura do Vocativo",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Em um Ofício expedido pela Secretaria da Fazenda e dirigido ao Secretário de Estado da Administração, o vocativo correto e a sua pontuação correspondente são:",
    options: [
      "A) Senhor Secretário;",
      "B) Excelentíssimo Senhor Secretário,",
      "C) Senhor Secretário,",
      "D) Prezado Secretário:",
      "E) Ilustríssimo Secretário;"
    ],
    correctAnswer: 2,
    explanation: "De acordo com o Manual de Redação da Presidência da República, para Secretários de Estado (que não são Chefes de Poder), o vocativo correto é 'Senhor' seguido do cargo e finalizado com vírgula: 'Senhor Secretário,'."
  },
  {
    id: 61,
    discipline: "Língua Portuguesa",
    topic: "Equivalência de Estruturas / Orações Reduzidas de Gerúndio",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "O trecho 'Aprimorando os mecanismos de auditoria digital, o Fisco estadual combateu a sonegação com maior eficácia' mantém a correção gramatical e o sentido original ao ter a oração reduzida desenvolvida em:",
    options: [
      "A) Porquanto aprimorou os mecanismos de auditoria digital...",
      "B) Ao aprimorar os mecanismos de auditoria digital...",
      "C) Ainda que aprimorasse os mecanismos de auditoria digital...",
      "D) A fim de aprimorar os mecanismos de auditoria digital...",
      "E) Segundo aprimorava os mecanismos de auditoria digital..."
    ],
    correctAnswer: 1,
    explanation: "A oração reduzida de gerúndio 'Aprimorando os mecanismos...' exprime ideia de meio/tempo (simultaneidade da ação). A forma desenvolvida equivalente mantendo a ideia de tempo/modo é 'Ao aprimorar...' ou 'À medida que aprimorava...'. A opção B preserva perfeitamente o sentido e a correção."
  },
  {
    id: 62,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Núcleos Ligados por OU / NEM",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a concordância verbal atende estritamente às regras da norma-padrão.",
    options: [
      "A) Nem o auditor nem o fiscal conseguiram identificar a origem da fraude contábil.",
      "B) Nem o auditor nem o fiscal conseguiu identificar a origem da fraude contábil.",
      "C) O Secretário da Fazenda ou o Governador assinarão o decreto de nomeação dos aprovados.",
      "D) Florianópolis ou Joinville será a sede do próximo congresso de direito tributário.",
      "E) As opções A e D estão corretas conforme a norma gramatical."
    ],
    correctAnswer: 4,
    explanation: "1) Na opção A, com 'nem... nem', a ação pode ser atribuída a ambos os sujeitos, levando o verbo ao plural (ou ao singular, sendo aceito ambas as formas pela norma). 2) Na opção D, com a conjunção 'ou' com sentido de exclusão (apenas uma cidade será a sede), o verbo fica obrigatoriamente no singular ('será'). Assim, A e D estão corretas."
  },
  {
    id: 63,
    discipline: "Língua Portuguesa",
    topic: "Regência Nominal e Uso do Sinal Indicativo de Crase",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que o emprego da crase atende rigorosamente às exigências de regência nominal da norma-padrão.",
    options: [
      "A) O parecer técnico foi favorável à concessão de isenção fiscal à empresa requerente.",
      "B) A equipe de auditores estava habituada à examinar balanços contábeis complexos.",
      "C) A decisão do conselho foi contrária à todas as reivindicações apresentadas pelo sindicato.",
      "D) O fisco manteve-se insensível à apelos de regularização fora do prazo legal.",
      "E) A lei estadual é referente à operações de crédito realizadas no exterior."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: o adjetivo 'favorável' exige a preposição 'a' ('favorável à concessão') e o substantivo 'concessão' exige a preposição 'a' antes de 'empresa' ('isenção à empresa'). B) Incorreto: não ocorre crase antes de verbo no infinitivo ('examinar'). C) Incorreto: não ocorre crase antes de pronome indefinido 'todas'. D) Incorreto: 'à' no singular antes de palavra no plural ('apelos') indica apenas preposição. E) Incorreto: 'à' no singular antes de plural ('operações') é incorreto."
  },
  {
    id: 64,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Isolamento de Adjuntos Adverbiais Deslocados",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho 'Em decorrência das novas diretrizes de fiscalização tributária, o Fisco notificou a empresa', a vírgula foi empregada para:",
    options: [
      "A) Isolar oração subordinada adjetiva explicativa.",
      "B) Isolar adjunto adverbial de grande extensão anteposto à oração principal.",
      "C) Separar orações coordenadas assindéticas com sujeitos diferentes.",
      "D) Isolar vocativo no início do período.",
      "E) Separar o sujeito do predicado verbal."
    ],
    correctAnswer: 1,
    explanation: "'Em decorrência das novas diretrizes de fiscalização tributária' é um adjunto adverbial de causa/condição de grande extensão (composto por várias palavras) deslocado para o início da frase. A vírgula é obrigatória nesse caso."
  },
  {
    id: 65,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal com Verbos no Futuro do Presente e do Pretérito",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a opção que preenche correta e respectivamente as lacunas da frase, de acordo com as regras de colocação pronominal: 'Se não houver atrasos, o relatório ______ amanhã; caso contrário, os auditores ______ novos prazos.'",
    options: [
      "A) enviar-se-á - concederão-nos",
      "B) se enviará - nos concederão",
      "C) enviar-se-á - nos concederão",
      "D) enviará-se - conceder-nos-ão",
      "E) se enviará - concederão-nos"
    ],
    correctAnswer: 1,
    explanation: "1) Na primeira lacuna, 'o relatório se enviará' ou 'enviar-se-á': no entanto, havendo o advérbio 'amanhã' ou a conjunção condicional 'se' na oração, ou a próclise natural do contexto, a forma 'se enviará' é aceita. 2) Na segunda lacuna, a locução 'caso contrário' (com o pronome 'caso'/advérbio) atrai obrigatoriamente a próclise ('nos concederão'). É vedado colocar pronome oblíquo após verbo no futuro ('concederão-nos' é incorreto)."
  },
  {
    id: 66,
    discipline: "Língua Portuguesa",
    topic: "Concordância Nominal com Adjetivo Anteposto a Múltiplos Substantivos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que a concordância nominal está incorreta segundo a norma-padrão.",
    options: [
      "A) Foi apresentada documentação e relatórios pela fiscalização.",
      "B) Foram apresentados documentação e relatórios pela fiscalização.",
      "C) Foram apresentadas documentação e relatórios pela fiscalização.",
      "D) A fiscalização apresentou relatórios e documentação organizados.",
      "E) A fiscalização apresentou relatórios e documentação organizada."
    ],
    correctAnswer: 2,
    explanation: "Quando o adjetivo/particípio está anteposto a múltiplos substantivos de gêneros diferentes ('documentação' - fem / 'relatórios' - masc), ele deve concordar com o mais próximo ('Foi apresentada documentação...') ou ir para o masculino plural ('Foram apresentados...'). A opção C é incorreta porque usou o feminino plural ('apresentadas') para concordar com um par composto que contém um elemento masculino."
  },
  {
    id: 67,
    discipline: "Língua Portuguesa",
    topic: "Significação das Palavras - Sentido de Conectivos e Advérbios",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho 'O contribuinte alegou desconhecimento da norma; IPSO FACTO, a penalidade administrativa foi mantida pelo Fisco', a expressão destacada possui sentido equivalente a:",
    options: [
      "A) Por essa razão / Consequentemente.",
      "B) Não obstante / Apesar disso.",
      "C) Em contrapartida / Por outro lado.",
      "D) De maneira análoga / Da mesma forma.",
      "E) Por exemplo / A saber."
    ],
    correctAnswer: 0,
    explanation: "'Ipso facto' é uma expressão latina de uso frequente no meio jurídico/fiscal que significa 'pelo próprio fato', 'por isso mesmo', 'consequentemente' ou 'por essa razão'."
  },
  {
    id: 68,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe - Agente da Passiva vs Adjunto Adverbial de Causa",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na frase 'A empresa foi autuada PELO FISCO ESTADUAL', o termo em destaque exerce a função sintática de:",
    options: [
      "A) Adjunto adverbial de causa",
      "B) Agente da passiva",
      "C) Objeto indireto",
      "D) Complemento nominal",
      "E) Predicativo do objeto"
    ],
    correctAnswer: 1,
    explanation: "Na voz passiva analítica ('foi autuada'), o termo introduzido pela preposição 'por/pelo' que pratica a ação expressa pelo verbo passivo ('o Fisco autuou a empresa') desempenha a função sintática de Agente da Passiva."
  },
  {
    id: 69,
    discipline: "Língua Portuguesa",
    topic: "Flexão dos Verbos Anômalos e Irregulares (PROVER, REQUERER, VIR)",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a alternativa em que a flexão verbal atende à norma-padrão.",
    options: [
      "A) O contribuinte reequereu a revisão do lançamento tributário.",
      "B) O contribuinte requereu a revisão do lançamento tributário.",
      "C) Quando o auditor reaver os documentos, concluirá o laudo.",
      "D) Se o Fisco prover os cargos vagos, a arrecadação aumentará.",
      "E) As opções B e D estão corretas."
    ],
    correctAnswer: 4,
    explanation: "1) 'Requerer' no pretérito perfeito é 'requereu' (não segue o verbo querer). 2) 'Prover' no futuro do subjuntivo é 'prover' ('se prover os cargos'). 3) 'Reaver' é defectivo e só possui formas com a letra 'v' ('quando reouver'). Portanto, B e D estão corretas."
  },
  {
    id: 70,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Formatação de Anexos e Tabelas",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "De acordo com o Manual de Redação Oficial, quando um documento necessita ser acompanhado de tabelas, relatórios ou planilhas extensas, estes elementos devem ser estruturados como:",
    options: [
      "A) Notas de rodapé no corpo do próprio documento.",
      "B) Anexos ou Apêndices devidamente identificados ao final do documento.",
      "C) Transcrições diretas intercaladas no primeiro parágrafo do texto.",
      "D) Citações em fonte itálica ao longo do desenvolvimento.",
      "E) Adendos manuscritos assinados pelo remetente."
    ],
    correctAnswer: 1,
    explanation: "Documentos complementares, planilhas e tabelas extensas que fundamentam a comunicação oficial devem ser encaminhados como Anexos (se produzidos por terceiros) ou Apêndices (se produzidos pelo próprio autor do documento) citados no texto principal."
  },
  {
    id: 71,
    discipline: "Língua Portuguesa",
    topic: "Equivalência e Transformação de Estruturas / Conjunções Proporcionais",
    banca: "FCC",
    difficulty: "Média",
    statement: "O trecho 'À proporção que os investimentos em tecnologia avançam, a fiscalização tributária torna-se mais célere' mantém a correção gramatical e a equivalência semântica ao substituir a locução destacada por:",
    options: [
      "A) À medida que os investimentos...",
      "B) Na medida em que os investimentos...",
      "C) A fim de que os investimentos...",
      "D) Porquanto os investimentos...",
      "E) Visto que os investimentos..."
    ],
    correctAnswer: 0,
    explanation: "'À proporção que' e 'À medida que' são locuções conjuntivas subordinativas proporcionais equivalentes. 'Na medida em que' possui valor causal, alterando a relação semântica do período."
  },
  {
    id: 72,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Porcentagens e Frações",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas da frase: 'Cerca de 1% dos contribuintes ______ a notificação fiscal; no entanto, 20% da arrecadação estadual ______ do setor industrial.'",
    options: [
      "A) recebeu - provém",
      "B) receberam - provém",
      "C) receberam - provêm",
      "D) recebeu - provêm",
      "E) receberam - provém-se"
    ],
    correctAnswer: 0,
    explanation: "1) Com numerais percentuais seguidos de substantivo no plural ('1% dos contribuintes'), o verbo concorda com o numeral singular ('recebeu') ou com o complemento no plural ('receberam'). 2) Com porcentagem seguida de substantivo no singular ('20% da arrecadação'), a concordância atrai obrigatoriamente o singular referente ao núcleo substantivo ('provém' com acento agudo). A opção A atende à norma gramatical."
  },
  {
    id: 73,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Emprego do Pronome LHE / O / A",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a frase em que o emprego do pronome pessoal oblíquo atende às regras de regência da norma-padrão.",
    options: [
      "A) O Auditor de Finanças convocou o contribuinte e informou-lhe que o prazo havia expirado.",
      "B) O fiscal examinou o relatório contábil e aprovou-lhe sem ressalvas.",
      "C) A comissão atendeu os contribuintes e encaminhou-os para a sala de reuniões.",
      "D) O Secretário cumprimentou os auditores e comunicou-os o resultado da reunião.",
      "E) As opções A e C estão corretas segundo a norma-padrão."
    ],
    correctAnswer: 4,
    explanation: "1) 'Informar algo A alguém': o pronome 'lhe' funciona como objeto indireto ('informou-lhe que...'). 2) 'Aprovar' é VTD, exigindo 'o' ('aprovou-o'). 3) 'Atender' aceita VTD, e 'encaminhar' é VTDI ('encaminhou-os'). 4) 'Comunicar' é VTDI: comunica algo A alguém ('comunicou-lhes o resultado'). Portanto, A e C cumprem as regras."
  },
  {
    id: 74,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Orações Intercaladas e Parentéticas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a pontuação da oração intercalada está inteiramente CORRETA.",
    options: [
      "A) A nova diretriz fiscal, afirmam os especialistas, aumentará a transparência pública.",
      "B) A nova diretriz fiscal afirmam os especialistas aumentará a transparência pública.",
      "C) A nova diretriz fiscal, afirmam os especialistas aumentará a transparência pública.",
      "D) A nova diretriz fiscal afirmam os especialistas, aumentará a transparência pública.",
      "E) A nova diretriz fiscal — afirmam os especialistas aumentará a transparência pública."
    ],
    correctAnswer: 0,
    explanation: "Orações intercaladas (como 'afirmam os especialistas') devem ser isoladas obrigatoriamente por um par de vírgulas, par de travessões ou par de parênteses."
  },
  {
    id: 75,
    discipline: "Língua Portuguesa",
    topic: "Crase - Verbos de Movimento e Preposição ATÉ",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que o uso do sinal indicativo de crase é OBRIGATÓRIO.",
    options: [
      "A) O fiscal caminhou até à repartição pública para protocolar o laudo.",
      "B) O Secretário deu provimento à reclamação apresentada pelo contribuinte.",
      "C) O auditor referiu-se à sua própria análise durante a reunião.",
      "D) A equipe dirigiu-se à uma cidade do interior catarinense.",
      "E) O documento foi encaminhado à qualquer repartição competente."
    ],
    correctAnswer: 1,
    explanation: "A) Após 'até' a crase é facultativa. B) OBRIGATÓRIA: 'dar provimento' exige preposição 'a' + artigo 'a' antes do substantivo feminino 'reclamação' (= à reclamação). C) Antes de possessivo feminino no singular a crase é facultativa. D e E) Incorretas: não ocorre crase antes de 'uma' ou 'qualquer'."
  },
  {
    id: 76,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal - Atração por Conjunções Subordinativas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a frase em que a posição do pronome oblíquo átono está INCORRETA segundo a norma-padrão.",
    options: [
      "A) Embora se trate de um processo complexo, o laudo foi emitido rapidamente.",
      "B) Conforme nos informaram, a reunião de auditoria será antecipada.",
      "C) Quando apresentaram-nos as provas, o processo foi encerrado.",
      "D) Caso se identifiquem erros, o relatório será corrigido.",
      "E) Para que se garantam os direitos do contribuinte, a lei exige notificação prévia."
    ],
    correctAnswer: 2,
    explanation: "A conjunção subordinativa temporal 'Quando' atrai obrigatoriamente a próclise. O correto é: 'Quando nos apresentaram as provas...' (e não 'apresentaram-nos'). As demais opções contêm fatores de atração próclitica corretos ('Embora', 'Conforme', 'Caso', 'Para que')."
  },
  {
    id: 77,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe do Período - Orações Subordinadas Adverbiais Causais vs Explicativas",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "No trecho 'A recolha de tributos cresceu, PORQUANTO a atividade econômica no Estado expandiu-se', a conjunção sublinhada exprime ideia de:",
    options: [
      "A) Causa",
      "B) Concessão",
      "C) Condição",
      "D) Consequência",
      "E) Proporção"
    ],
    correctAnswer: 0,
    explanation: "'Porquanto' é uma conjunção subordinativa causal (equivalente a 'visto que', 'já que', 'porque'), introduzindo a razão/causa do crescimento da arrecadação."
  },
  {
    id: 78,
    discipline: "Língua Portuguesa",
    topic: "Significação das Palavras - Polissemia e Denotação",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que o verbo 'lavrar' foi empregado com o sentido de 'redigir/formalizar por escrito'.",
    options: [
      "A) O agricultor foi ao campo para lavrar a terra antes do plantio.",
      "B) O Auditor de Finanças Públicas lavrou o auto de infração tributária.",
      "C) O incêndio começou a lavrar rapidamente pelas instalações do galpão.",
      "D) O artesão dedicou-se a lavrar a madeira com extrema habilidade.",
      "E) A epidemia voltou a lavrar na região durante o inverno."
    ],
    correctAnswer: 1,
    explanation: "Na linguagem jurídica e administrativa, 'lavrar' significa redigir, exarar ou formalizar em ata/termo oficial ('lavrou o auto de infração')."
  },
  {
    id: 79,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Emprego dos Modos Verbais nas Orações Subordinadas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que o verbo em destaque está flexionado no Futuro do Subjuntivo.",
    options: [
      "A) Quando o Fisco obtiver as informações, emitirá a certidão.",
      "B) Se o auditor analisava o processo, encontrava as falhas.",
      "C) Embora o auditor analise o processo, não encontra falhas.",
      "D) Caso o auditor analisasse o processo, encontraria as falhas.",
      "E) Para o auditor analisar o processo, necessita de autorização."
    ],
    correctAnswer: 0,
    explanation: "'Obtiver' é a flexão do verbo 'obter' no Futuro do Subjuntivo (introduzido pela conjunção temporal 'Quando')."
  },
  {
    id: 80,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Padrão Ofício e Assinatura",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Conforme o Manual de Redação da Presidência da República, o espaço destinado à assinatura em documentos oficiais deve conter:",
    options: [
      "A) Apenas a assinatura autógrafa do remetente sem identificação dactilografada.",
      "B) O nome do signatário em letras maiúsculas e o cargo ocupado na linha imediatamente abaixo.",
      "C) O cargo ocupado na primeira linha e o nome do signatário em letras minúsculas na segunda.",
      "D) O número do CPF e o endereço residencial completo do signatário.",
      "E) O organograma completo do departamento de origem."
    ],
    correctAnswer: 1,
    explanation: "O fecho da assinatura nos documentos oficiais padrão deve apresentar o nome do signatário (em maiúsculas/caixa alta) e, na linha subsequente, o cargo que ocupa no órgão público."
  },
  {
    id: 81,
    discipline: "Língua Portuguesa",
    topic: "Equivalência e Transformação de Estruturas / Conjunções Concessivas",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "O trecho 'Por mais que o Fisco intensifique as operações de fiscalização, o combate à sonegação exige a participação ativa da sociedade' mantém a sua correção gramatical e a equivalência semântica ao substituir a oração destacada por:",
    options: [
      "A) Ainda que o Fisco intensifique as operações de fiscalização...",
      "B) Visto que o Fisco intensifique as operações de fiscalização...",
      "C) À medida que o Fisco intensifica as operações de fiscalização...",
      "D) Porquanto o Fisco intensifica as operações de fiscalização...",
      "E) Contanto que o Fisco intensifique as operações de fiscalização..."
    ],
    correctAnswer: 0,
    explanation: "'Por mais que' introduz uma oração subordinada adverbial concessiva. A locução 'Ainda que' é perfeitamente equivalente, mantendo o valor de concessão e a exigência do verbo no modo subjuntivo ('intensifique'). B e D possuem valor causal, C valor proporcional e E valor condicional."
  },
  {
    id: 82,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal - Verbo Haver e Existir em Locuções",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a concordância verbal atende rigorosamente às exigências da norma-padrão da língua escrita.",
    options: [
      "A) Podem existir soluções mais eficientes para a modernização do Fisco.",
      "B) Podem haver soluções mais eficientes para a modernização do Fisco.",
      "C) Deve de haver muitas divergências na interpretação da lei tributária.",
      "D) Havia ocorrido muitas falhas no preenchimento das declarações fiscais.",
      "E) Fazem dois meses que os auditores concluíram o relatório."
    ],
    correctAnswer: 0,
    explanation: "A) CORRETO: o verbo 'existir' é pessoal e possui sujeito ('soluções mais eficientes'), fazendo com que o verbo auxiliar ('Podem') concorde no plural. B) Incorreto: 'haver' no sentido de existir transmite impessoalidade ao auxiliar ('Pode haver'). C) Incorreto: 'Deve haver' (sem a preposição 'de'). D) Incorreto: no tempo composto com o verbo principal 'ocorrer' (pessoal), o auxiliar 'haver' concorda no plural com o sujeito ('Haviam ocorrido'). E) Incorreto: 'fazer' indicando tempo decorrido é impessoal ('Faz dois meses')."
  },
  {
    id: 83,
    discipline: "Língua Portuguesa",
    topic: "Regência Verbal e Emprego do Pronome Relativo com Preposição",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas do seguinte enunciado: 'O modelo de gestão fiscal _____ implementação o Secretário se empenhou produziu resultados _____ todos os técnicos faziam referência.'",
    options: [
      "A) em cuja - a que",
      "B) de cuja - que",
      "C) a cuja - a que",
      "D) cuja - a cujos",
      "E) em cuja - que"
    ],
    correctAnswer: 0,
    explanation: "1) Quem se empenha, empenha-se EM algo ('empenhou-se na implementação do modelo / em cuja implementação'). 2) Quem faz referência, faz referência A algo ('faziam referência aos resultados / a que todos os técnicos faziam referência'). A opção A preenche corretamente ambas as lacunas."
  },
  {
    id: 84,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Uso da Vírgula com Orações Adjetivas e Explicativas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a alteração da pontuação provoca MUDANÇA DE SENTIDO no enunciado.",
    options: [
      "A) Os auditores fiscais, que atuam na capital, concluíram a auditoria contábil. / Os auditores fiscais que atuam na capital concluíram a auditoria contábil.",
      "B) O relatório fiscal foi entregue ontem, no final da tarde. / O relatório fiscal foi entregue ontem no final da tarde.",
      "C) O Fisco estadual, segundo informou a diretoria, intensificará as operações. / O Fisco estadual (segundo informou a diretoria) intensificará as operações.",
      "D) A nova legislação tributária, aprovada recentemente, trará maior simplificação. / A nova legislação tributária — aprovada recentemente — trará maior simplificação.",
      "E) A fiscalização iniciou-se cedo, contudo os resultados demoraram. / A fiscalização iniciou-se cedo; contudo, os resultados demoraram."
    ],
    correctAnswer: 0,
    explanation: "Na opção A, a primeira frase contém uma oração adjetiva explicativa (entre vírgulas: indica que TODOS os auditores atuam na capital e concluíram a auditoria). A segunda frase contém uma oração adjetiva restritiva (sem vírgulas: indica que APENAS os auditores que atuam na capital concluíram a auditoria). A alteração altera o sentido do enunciado. Nas demais alternativas ocorrem variações puramente estilísticas."
  },
  {
    id: 85,
    discipline: "Língua Portuguesa",
    topic: "Crase - Ocorrência antes de Pronomes e Substantivos Femininos",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa em que o uso do sinal indicativo de crase está inteiramente CORRETO.",
    options: [
      "A) A comissão de fiscalização deu prioridade à análises de livros contábeis antigos.",
      "B) O Auditor de Finanças prestou suporte técnico àquela gerência regional da SEFAZ-SC.",
      "C) A notificação foi entregue à uma empresa que atuava no setor de transportes.",
      "D) O parecer encaminhou-se à Sua Excelência o Governador do Estado.",
      "E) O Secretário solicitou explicações à cerca de dez contribuintes autuados."
    ],
    correctAnswer: 1,
    explanation: "A) Incorreto: 'à' no singular antes de palavra no plural ('análises') não admite crase. B) CORRETO: junção da preposição 'a' (exigida por 'prestar suporte a') com o pronome demonstrativo 'aquela' (= àquela). C) Incorreto: não ocorre crase antes do artigo indefinido 'uma'. D) Incorreto: não ocorre crase antes de pronomes de tratamento iniciados por 'Sua/Vossa'. E) Incorreto: antes de numerais ou da expressão 'cerca de' não ocorre crase."
  },
  {
    id: 86,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal - Próclise em Orações Subordinadas e Frases Optativas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a colocação do pronome oblíquo átono está INCORRETA segundo a norma-padrão.",
    options: [
      "A) Deus nos guarde de cometer equívocos na lavratura do auto de infração.",
      "B) Tratando-se de auditoria pública, a transparência é requisito indispensável.",
      "C) Não se identificou nenhuma divergência nos valores declarados pelo contribuinte.",
      "D) O Secretário da Fazenda manifestou-se favorável, justificando-se perante o conselho.",
      "E) Em se tratando de benefícios fiscais, a lei exige aprovação em plenário."
    ],
    correctAnswer: 1,
    explanation: "Em 'Tratando-se de auditoria...', quando o gerúndio vem precedido da preposição 'Em', a próclise é obrigatória ('Em se tratando de...'), conforme demonstrado corretamente na alternativa E. A alternativa B apresenta 'Tratando-se' no início de frase com enclise, mas segundo a norma estrita da FCC, quando há a preposição 'Em' antecedendo o gerúndio, exige-se a próclise ('Em se tratando de'). Contudo, a incorreção na colocação isolada sem preposição no início de oração atrai o uso direto ou correção de contexto."
  },
  {
    id: 87,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe do Período - Classificação de Orações Subordinadas Substantivas",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "No enunciado 'Constatou-se QUE HOUVE FRAUDE NA ESCRITURAÇÃO CONTÁBIL', a oração sublinhada exerce a função sintática de:",
    options: [
      "A) Objeto direto",
      "B) Sujeito",
      "C) Complemento nominal",
      "D) Predicativo do sujeito",
      "E) Agente da passiva"
    ],
    correctAnswer: 1,
    explanation: "Verbo transitivo direto ('constatar') + partícula apassivadora ('se') = Voz Passiva Sintética. A oração subordinada substantiva que se segue funciona como Sujeito Paciente do verbo ('Isto foi constatado' -> 'Que houve fraude foi constatado'). Trata-se de uma Oração Subordinada Substantiva Subjetiva."
  },
  {
    id: 88,
    discipline: "Língua Portuguesa",
    topic: "Semântica - Figuras de Linguagem (Eufemismo e Hipérbole)",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Assinale a frase em que se faz uso da figura de linguagem denominada EUFEMISMO.",
    options: [
      "A) O contribuinte faltou com a verdade ao preencher a sua declaração de bens ao Fisco.",
      "B) O Fisco leu montanhas de papéis para instruir o processo administrativo tributário.",
      "C) A auditoria fiscal foi um vendaval que varreu as irregularidades da empresa.",
      "D) O silêncio da sala de julgamento gritava a apreensão dos advogados presentes.",
      "E) O dinheiro sonegado voou para paraísos fiscais em questão de segundos."
    ],
    correctAnswer: 0,
    explanation: "Eufemismo é a figura de linguagem que consiste em suavizar uma expressão de sentido desagradável, chocante ou severo. 'Faltou com a verdade' é um eufemismo para a palavra 'mentiu'."
  },
  {
    id: 89,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Flexão de Verbos Derivados (MANTER, INTERVIR, REQUERER)",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a opção em que a flexão do verbo derivado está CORRETA segundo a norma-padrão.",
    options: [
      "A) Se o Fisco intervir no processo, as irregularidades serão sanadas.",
      "B) Se o Fisco interviesse no processo, as irregularidades seriam sanadas.",
      "C) O Secretário manteu a decisão proferida pelo conselho de contribuintes.",
      "D) Quando o auditor obter as provas, lavrará o auto de infração.",
      "E) Se o contribuinte reter os documentos, será penalizado pela fiscalização."
    ],
    correctAnswer: 1,
    explanation: "1) 'Intervir' deriva do verbo 'vir' (no imperfeito do subjuntivo: 'se interviesse'). A opção A é incorreta pois deveria ser 'se intervier'. 2) 'Manter' deriva de 'ter' ('manteve', não manteu). 3) 'Obter' deriva de 'ter' ('quando obtiver', não obter). 4) 'Reter' deriva de 'ter' ('se retiver', não reter). A opção B está perfeitamente correta."
  },
  {
    id: 90,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Uso de Siglas e Pronomes de Tratamento",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Conforme o Manual de Redação da Presidência da República, ao utilizar uma sigla pela primeira vez em um texto oficial, deve-se proceder da seguinte forma:",
    options: [
      "A) Grafar apenas a sigla em letras maiúsculas e colocar o nome por extenso em nota de rodapé.",
      "B) Apresentar o nome por extenso seguido da sigla entre parênteses ou travessões.",
      "C) Grafar a sigla em itálico e omitir o nome por extenso por razões de concisão.",
      "D) Colocar a sigla em letras minúsculas entre aspas e o nome por extenso no anexo.",
      "E) Utilizar apenas a sigla sem qualquer explicação prévia."
    ],
    correctAnswer: 1,
    explanation: "A norma oficial estabelece que, na primeira menção a qualquer instituição ou termo técnico codificado no texto, deve-se grafar o nome por extenso e, logo em seguida, a sigla correspondente entre parênteses (ex.: Secretaria de Estado da Fazenda - SEFAZ/SC)."
  },
  {
    id: 91,
    discipline: "Língua Portuguesa",
    topic: "Equivalência e Transformação de Estruturas / Conjunções Causais",
    banca: "FCC",
    difficulty: "Média",
    statement: "O trecho 'Visto que o prazo para a apresentação de recurso expirou, a cobrança do débito fiscal tornou-se exigível' mantém a correção gramatical e a equivalência semântica ao ter a oração sublinhada substituída por:",
    options: [
      "A) Como o prazo para a apresentação de recurso expirou...",
      "B) Porquanto o prazo para a apresentação de recurso expirasse...",
      "C) Embora o prazo para a apresentação de recurso expirasse...",
      "D) À medida que o prazo para a apresentação de recurso expira...",
      "E) A fim de que o prazo para a apresentação de recurso expirasse..."
    ],
    correctAnswer: 0,
    explanation: "'Visto que' é uma conjunção subordinativa causal. A conjunção 'Como' (quando anteposta à oração principal) também possui valor sintático-semântico causal equivalente, mantendo o verbo no modo indicativo ('expirou'). As demais opções alteram a relação semântica do período."
  },
  {
    id: 92,
    discipline: "Língua Portuguesa",
    topic: "Concordância Verbal com Expressões Numéricas e Fracionárias",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a concordância verbal atende rigorosamente às exigências da norma-padrão.",
    options: [
      "A) Um terço dos auditores fiscais solicitaram transferência para a capital.",
      "B) Um terço dos auditores fiscais solicitou transferência para a capital.",
      "C) Dois terços do relatório fiscal foi aprovado pela comissão técnica.",
      "D) Dois terços do relatório fiscal foram aprovados pela comissão técnica.",
      "E) As opções A, B e C estão corretas segundo a norma-padrão."
    ],
    correctAnswer: 4,
    explanation: "1) Com frações seguidas de substantivo no plural ('Um terço dos auditores'), o verbo pode concordar com o numerador singular ('solicitou') ou com o complemento no plural ('solicitaram'). 2) Com fração plural seguida de substantivo no singular ('Dois terços do relatório'), o verbo pode concordar com o numerador no plural ('foram aprovados' - não listado) ou com o núcleo especificador no singular ('foi aprovado'). Portanto, A, B e C cumprem as regras da norma culta."
  },
  {
    id: 93,
    discipline: "Língua Portuguesa",
    topic: "Regência Nominal e Emprego de Preposição",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a alternativa que preenche correta e respectivamente as lacunas da frase: 'O relatório de auditoria foi passível _____ alterações; no entanto, o auditor manteve-se firme _____ sua decisão e insensível _____ pressões externas.'",
    options: [
      "A) de - em - a",
      "B) a - de - às",
      "C) de - em - às",
      "D) a - em - a",
      "E) de - com - às"
    ],
    correctAnswer: 2,
    explanation: "1) 'Passível' exige a preposição 'de' ('passível de alterações'). 2) 'Firme' exige a preposição 'em' ('firme em sua decisão'). 3) 'Insensível' exige a preposição 'a' + artigo feminino plural 'as' antes de 'pressões' (= às pressões)."
  },
  {
    id: 94,
    discipline: "Língua Portuguesa",
    topic: "Pontuação - Uso dos Parênteses e Travessões em Citações/Explicações",
    banca: "FCC",
    difficulty: "Média",
    statement: "No trecho 'Os princípios orçamentários (especialmente os da unidade e da universalidade) orientam a elaboração da Lei Orçamentária Anual', o par de parênteses pode ser substituído, mantendo a correção e o sentido original, por:",
    options: [
      "A) duas aspas.",
      "B) dois pontos e vírgula.",
      "C) duas vírgulas ou dois travessões.",
      "D) duas barras diagonais.",
      "E) dois pontos."
    ],
    correctAnswer: 2,
    explanation: "Segmentos explicativos ou parentéticos intercalados na oração podem ser isolados por par de parênteses, por par de vírgulas ou por par de travessões, sem qualquer prejuízo à gramática ou ao sentido."
  },
  {
    id: 95,
    discipline: "Língua Portuguesa",
    topic: "Crase - Ocorrência com Pronomes Demonstrativos AQUELE/AQUELA/AQUILO",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Assinale a frase em que o uso do sinal indicativo de crase está INCORRETO.",
    options: [
      "A) O Auditor de Finanças fez referência àquela instrução normativa expedida no ano passado.",
      "B) A equipe de fiscalização deu atenção àquilo que constava nos livros de registro contábil.",
      "C) O parecer técnico foi contrário àqueles argumentos apresentados pela defesa da empresa.",
      "D) O fisco dirigiu-se à qualquer empresa que apresentasse divergências na declaração.",
      "E) O Secretário reuniu-se àqueles diretores que solicitaram audiência especial."
    ],
    correctAnswer: 3,
    explanation: "Não ocorre crase antes do pronome indefinido 'qualquer' (opção D). Nas demais alternativas, ocorre a junção da preposição 'a' (exigida pelos termos 'fazer referência a', 'dar atenção a', 'ser contrário a', 'reunir-se a') com o pronome demonstrativo iniciado por 'a' (àquela, àquilo, àqueles), tornando o uso da crase obrigatório."
  },
  {
    id: 96,
    discipline: "Língua Portuguesa",
    topic: "Colocação Pronominal em Orações Inciadas por Palavras Atrativas",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que a colocação pronominal atende rigorosamente às regras de próclise da norma-padrão.",
    options: [
      "A) Poucos auditores dedicaram-se ao exame daquelas planilhas complexas.",
      "B) Poucos auditores se dedicaram ao exame daquelas planilhas complexas.",
      "C) Jamais entregaria-se um documento sem a devida conferência dos dados.",
      "D) Sempre disseram-nos que a legislação tributária passaria por reformulação.",
      "E) As opções A e D estão corretas segundo a norma-padrão."
    ],
    correctAnswer: 1,
    explanation: "O pronome indefinido 'Poucos' atua como fator de atração próclitica obrigatória ('Poucos auditores se dedicaram'). Advérbios de tempo/negação como 'Jamais' e 'Sempre' também exigem próclise ('Jamais se entregaria' / 'Sempre nos disseram'), tornando as opções C e D incorretas."
  },
  {
    id: 97,
    discipline: "Língua Portuguesa",
    topic: "Sintaxe - Predicativo do Objeto vs Adjunto Adnominal",
    banca: "FCC",
    difficulty: "Difícil",
    statement: "Na frase 'O Secretário da Fazenda julgou O RELATÓRIO TÉCNICO INCOMPLETO', o termo em destaque 'INCOMPLETO' exerce a função sintática de:",
    options: [
      "A) Adjunto adnominal",
      "B) Predicativo do objeto",
      "C) Predicativo do sujeito",
      "D) Complemento nominal",
      "E) Agente da passiva"
    ],
    correctAnswer: 1,
    explanation: "'Julgar' é um verbo transitivo direto que exige um complemento ('o relatório técnico') e atribui a este uma característica/estado no momento da ação ('incompleto'). Por atribuir um estado ao objeto direto por meio do verbo, 'incompleto' funciona como Predicativo do Objeto."
  },
  {
    id: 98,
    discipline: "Língua Portuguesa",
    topic: "Semântica - Relações de Sinonímia e Adequação Vocabular",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale o par de palavras que apresenta relação de SINONÍMIA no contexto da linguagem administrativa e fiscal.",
    options: [
      "A) Exonerar / Demitir",
      "B) Diligência / Negligência",
      "C) Auspicioso / Desfavorável",
      "D) Exarar / Emitir (despacho/parecer)",
      "E) Peremptório / Provisório"
    ],
    correctAnswer: 3,
    explanation: "Na linguagem jurídica e administrativa, 'exarar' e 'emitir' são sinónimos no sentido de proferir, lavrar ou registrar por escrito um ato/despacho/parecer. A) 'Exonerar' (a pedido/de cargo em comissão) difere de 'Demitir' (punição por infração). B, C e E são pares de antónimos."
  },
  {
    id: 99,
    discipline: "Língua Portuguesa",
    topic: "Morfologia - Emprego e Flexão do Verbo HAVER como Auxiliar",
    banca: "FCC",
    difficulty: "Média",
    statement: "Assinale a opção em que o verbo HAVER foi flexionado CORRECTAMENTE como auxiliar de um tempo composto.",
    options: [
      "A) Os auditores haviam concluído o relatório de fiscalização no prazo legal.",
      "B) Havia muitos processos sobre a mesa do fiscal de tributos.",
      "C) Haviam muitos processos sobre a mesa do fiscal de tributos.",
      "D) As opções A e B estão corretas conforme a norma-padrão.",
      "E) Nenhuma das opções anteriores está correta."
    ],
    correctAnswer: 3,
    explanation: "1) Na opção A, o verbo 'haver' funciona como auxiliar de tempo composto ('haviam concluído') e deve concordar no plural com o sujeito 'Os auditores'. 2) Na opção B, o verbo 'haver' é principal e impessoal com sentido de existir ('Havia muitos processos'), devendo permanecer no singular. Portanto, A e B estão corretas nas suas respetivas funções."
  },
  {
    id: 100,
    discipline: "Língua Portuguesa",
    topic: "Redação Oficial - Fechos de Comunicação e Estrutura Geral",
    banca: "FCC",
    difficulty: "Fácil",
    statement: "Conforme as diretrizes do Manual de Redação da Presidência da República, assinale a opção que resume corretamente os dois únicos fechos oficiais padronizados para a correspondência do Poder Público.",
    options: [
      "A) Cordialmente, e Atenciosamente,",
      "B) Respeitosamente, e Atenciosamente,",
      "C) Atentamente, e Respeitosamente,",
      "D) Com os melhores cumprimentos, e Saudações,",
      "E) Do mesmo modo, e Respeitosamente,"
    ],
    correctAnswer: 1,
    explanation: "O Manual de Redação da Presidência da República simplificou e padronizou os fechos de comunicações oficiais para apenas dois: 1) 'Respeitosamente,' para autoridades de hierarquia superior; e 2) 'Atenciosamente,' para autoridades de mesma hierarquia, inferior ou para cidadãos."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'generator' | 'copilot'>('dashboard');
  const [questions] = useState<Question[]>(QUESTION_BANK);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Filters
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todas');
  const [searchQuery] = useState<string>('');

  const filteredQuestions = questions.filter((q) => {
    const matchesDiscipline = selectedDiscipline === 'Todas' || q.discipline === selectedDiscipline;
    const matchesSearch =
      q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiscipline && matchesSearch;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Performance calculations
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([qId, selectedOpt]) => {
    const q = questions.find((item) => item.id === Number(qId));
    return q && q.correctAnswer === selectedOpt;
  }).length;

  const overallAccuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                SEFAZ-SC <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase">Banca FCC</span>
              </h1>
              <p className="text-xs text-slate-400">Auditor Estadual de Finanças Públicas - Plataforma Completa</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Flame className="w-4 h-4 text-emerald-500" /> Meta Diária: 15/20
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-sky-400" /> Precisão: {overallAccuracy}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Painel de Desempenho
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Modulados / Questões
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Gerador de Simulados
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'copilot'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> Prompts Gemini
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Questões Respondidas</p>
                  <p className="text-2xl font-bold text-white mt-1">{answeredCount} / {questions.length}</p>
                </div>
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Taxa de Acertos</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{overallAccuracy}%</p>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Acertos Finais</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{correctCount}</p>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Erros a Revisar</p>
                  <p className="text-2xl font-bold text-rose-400 mt-1">{answeredCount - correctCount}</p>
                </div>
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Performance per Discipline */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" /> Rendimento por Disciplina do Edital
              </h2>

              <div className="space-y-4">
                {[
                  'Legislação Tributária Estadual (SC)',
                  'Direito Tributário',
                  'Contabilidade Geral e Avançada',
                  'Auditoria Fiscal',
                  'Ciência e Análise de Dados',
                  'Noções de Direito Administrativo',
                  'Língua Portuguesa',
                  'Ciências da Computação e TI'
                ].map((disc) => {
                  const discQuestions = questions.filter((q) => q.discipline === disc);
                  const discAnswered = discQuestions.filter((q) => selectedAnswers[q.id] !== undefined);
                  const discCorrect = discQuestions.filter(
                    (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] === q.correctAnswer
                  );
                  const accuracy =
                    discAnswered.length > 0 ? Math.round((discCorrect.length / discAnswered.length) * 100) : 0;

                  return (
                    <div key={disc} className="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-200">{disc}</span>
                        <span className="text-xs text-slate-400 font-mono">
                          {discCorrect.length}/{discQuestions.length} questões no banco ({discAnswered.length} respondidas - {accuracy}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUIZ / PRACTICE */}
        {activeTab === 'quiz' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters & Navigation */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-400" /> Filtrar por Disciplina do Edital
                </h3>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => {
                    setSelectedDiscipline(e.target.value);
                    setCurrentQuestionIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Todas">Todas as Disciplinas</option>
                  <optgroup label="Conhecimentos Gerais">
                    <option value="Língua Portuguesa">Língua Portuguesa</option>
                    <option value="Noções de Direito Administrativo">Noções de Direito Administrativo</option>
                    <option value="Ciência e Análise de Dados">Ciência e Análise de Dados</option>
                  </optgroup>
                  <optgroup label="Conhecimentos Específicos">
                    <option value="Legislação Tributária Estadual (SC)">Legislação Tributária Estadual (SC)</option>
                    <option value="Direito Tributário">Direito Tributário</option>
                    <option value="Contabilidade Geral e Avançada">Contabilidade Geral e Avançada</option>
                    <option value="Auditoria Fiscal">Auditoria Fiscal</option>
                    <option value="Ciências da Computação e TI">Ciências da Computação e TI</option>
                  </optgroup>
                </select>
              </div>

              {/* Questions Index */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Lista de Questões ({filteredQuestions.length})
                </h3>
                <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
                  {filteredQuestions.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isCorrect = isAnswered && selectedAnswers[q.id] === q.correctAnswer;
                    const isCurrent = idx === currentQuestionIndex;

                    let bgClass = 'bg-slate-900 text-slate-400 border-slate-800';
                    if (isAnswered) {
                      bgClass = isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40';
                    }
                    if (isCurrent) {
                      bgClass += ' ring-2 ring-emerald-500';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Question Workspace */}
            <div className="lg:col-span-3">
              {currentQuestion ? (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-md font-mono font-medium">
                        Questão {currentQuestionIndex + 1}
                      </span>
                      <span className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                        {currentQuestion.banca}
                      </span>
                      <span className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                        {currentQuestion.discipline}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleBookmark(currentQuestion.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        bookmarkedIds.includes(currentQuestion.id)
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Statement */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-mono">Assunto: {currentQuestion.topic}</p>
                    <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                      {currentQuestion.statement}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                      const isCorrect = currentQuestion.correctAnswer === optIdx;
                      const hasAnswered = selectedAnswers[currentQuestion.id] !== undefined;

                      let optionStyle =
                        'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';

                      if (hasAnswered) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-500/10 border-rose-500/50 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                          className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base leading-relaxed transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {hasAnswered && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {showExplanation[currentQuestion.id] && (
                    <div className="mt-6 p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Zap className="w-4 h-4" /> Gabarito Comentado
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Question Controls */}
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Anterior
                    </button>

                    <button
                      disabled={currentQuestionIndex === filteredQuestions.length - 1}
                      onClick={() =>
                        setCurrentQuestionIndex((prev) =>
                          Math.min(filteredQuestions.length - 1, prev + 1)
                        )
                      }
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      Próxima <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-500 bg-slate-950 border border-slate-800 rounded-xl">
                  Nenhuma questão encontrada com os filtros selecionados.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: GENERATOR */}
        {activeTab === 'generator' && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" /> Configurar Novo Simulado SEFAZ-SC
              </h2>
              <p className="text-sm text-slate-400">
                Gere um bloco de simulado customizado alinhado com o peso das disciplinas do edital.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Disciplina Principal
                </label>
                <select className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-3">
                  <option>Simulado Global (Todas as disciplinas)</option>
                  <option>Legislação Tributária Estadual (SC)</option>
                  <option>Direito Tributário</option>
                  <option>Contabilidade Geral e Avançada</option>
                  <option>Auditoria Fiscal</option>
                  <option>Ciência e Análise de Dados / IA</option>
                  <option>Noções de Direito Administrativo e Licitações</option>
                  <option>Língua Portuguesa</option>
                  <option>Ciências da Computação e TI</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Quantidade de Questões
                  </label>
                  <select className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-3">
                    <option>5 questões (Treino Rápido)</option>
                    <option>10 questões (Bloco Padrão)</option>
                    <option>20 questões (Mini Simulado)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Nível de Dificuldade
                  </label>
                  <select className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-3">
                    <option>Padrão FCC (Médio/Avançado)</option>
                    <option>Alta Complexidade (Foco nas pegadinhas)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab('quiz');
                  setCurrentQuestionIndex(0);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Iniciar Simulado Customizado
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: COPILOT PROMPTS */}
        {activeTab === 'copilot' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Prompts do Gemini Studio para SEFAZ-SC
              </h2>
              <p className="text-sm text-slate-400">
                Copie estes prompts otimizados para solicitar novas questões inéditas e aprofundamentos diretamente no seu chat do Gemini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Gerador de Questões Inéditas FCC - LTE/SC',
                  description: 'Gera questões no padrão FCC focadas na Lei 10.297/96 e Lei 3.938/66 com gabarito fundamentado.',
                  prompt: `Atue como examinador da banca FCC para o concurso da SEFAZ-SC. Crie 5 questões inéditas de múltipla escolha (A a E) sobre Legislação Tributária Estadual de SC (foco em Regulamento do ICMS-SC e PAF/Lei 3.938/66).
Requisitos:
- Dificuldade: Alta.
- Inclua situações-problema e pegadinhas clássicas da FCC.
- Forneça o gabarito comentado ao final com citação dos artigos correspondentes.`
                },
                {
                  title: 'Simulado de Ciência de Dados e IA na Administração Pública',
                  description: 'Focado em LGPD, BI, IA Generativa e Governo Digital conforme o edital da SEFAZ-SC.',
                  prompt: `Atue como examinador da banca FCC. Elabore 3 questões inéditas sobre Ciência e Análise de Dados aplicada à Administração Pública (foco em LGPD/Lei 13.709, Business Intelligence e IA no Setor Público) para a SEFAZ-SC.
Requisitos:
- Dificuldade: Média/Alta.
- Apresente 5 alternativas por questão.
- Inclua gabarito fundamentado citando os artigos da LGPD e conceitos de BI/IA.`
                }
              ].map((p, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white text-base">{p.title}</h3>
                    <p className="text-xs text-slate-400">{p.description}</p>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line">
                      {p.prompt}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(p.prompt, idx)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    {copiedPromptIndex === idx ? (
                      <>
                        <Check className="w-4 h-4" /> Copiado para a Área de Transferência!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar Prompt
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
