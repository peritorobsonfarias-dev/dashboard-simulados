import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, XCircle, Clock, BookOpen, BarChart3, Award, Settings, 
  Sparkles, ArrowRight, ArrowLeft, RefreshCw, Bookmark, Layers, Eye, 
  Copy, Check, FileText, ChevronRight, HelpCircle, Moon, Sun, Play, 
  RotateCcw, PieChart, Target, ShieldCheck, Flame, Filter, Zap, Menu, X
} from 'lucide-react';

const INITIAL_QUESTIONS = [
  {
    id: 1,
    discipline: "Legislação Tributária Estadual (SC)",
    topic: "ICMS - Fato Gerador e Não Incidência",
    difficulty: "Difícil",
    code: "FCC-SEFAZ-01",
    question: "Determinada indústria automobilística situada em Joinville/SC transferiu 15 veículos de seu estoque de produção para uma filial de distribuição localizada no município de Florianópolis/SC, exclusivamente para fins de estocagem e posterior comercialização a terceiros. Paralelamente, realizou a venda de 5 veículos diretamente para uma autarquia pública estadual sediada em Chapecó/SC. De acordo com a Lei Estadual nº 10.297/1996 e o entendimento pacificado pelo STF (Súmula Vinculante 43 e ADC 49), em relação ao ICMS, assinale a afirmativa correta:",
    options: [
      { id: "A", text: "Ocorre o fato gerador do ICMS na transferência entre estabelecimentos do mesmo titular, devendo haver o recolhimento integral do imposto com a alíquota interna de 17%." },
      { id: "B", text: "Não há incidência do ICMS na transferência entre estabelecimentos da mesma empresa, permanecendo o direito à manutenção dos créditos relativos às operações anteriores, ajustado nos termos da legislação." },
      { id: "C", text: "A venda destinada à autarquia estadual é imune ao ICMS em razão da Imunidade Recíproca prevista na CF/88, desonerando totalmente a operação." },
      { id: "D", text: "Na transferência intermunicipal, o ICMS incide com alíquota diferida até o momento da saída definitiva do veículo para o consumidor final." },
      { id: "E", text: "A operação de transferência constitui fato gerador do ICMS somente se houver circulação financeira entre a matriz e a filial." }
    ],
    correct: "B",
    explanation: "Nos termos do STF (ADC 49 e Tema 1099) e atualizações da Lei 10.297/96: O mero deslocamento de mercadorias entre estabelecimentos do mesmo titular (mesmo CNPJ base) não constitui fato gerador do ICMS por ausência de transferência da propriedade (circulação jurídica). Fica assegurada a manutenção dos créditos. Quanto à autarquia, a imunidade recíproca aplica-se aos impostos sobre patrimônio, renda e serviços (impostos diretos), não exonerando o ICMS (imposto indireto incidente na operação de circulação de mercadorias)."
  },
  {
    id: 2,
    discipline: "Legislação Tributária Estadual (SC)",
    topic: "Processo Administrativo Fiscal - Lei 3.938/66",
    difficulty: "Nível Prova Fiscal",
    code: "FCC-SEFAZ-02",
    question: "A empresa 'Laticínios do Vale S.A.', domiciliada no município de Blumenau/SC, protocolizou consulta tributária perante a Secretaria de Estado da Fazenda de Santa Catarina (SEFAZ/SC) indagando sobre a aplicação do benefício de redução da base de cálculo nas saídas internas de determinado produto lácteo com adição de nutrientes. A consulta foi efetuada em estrita conformidade com os requisitos formais da Lei nº 3.938/1966. Durante a pendência da resposta da autoridade fiscal, assinale a alternativa correta em relação aos efeitos do processo de consulta:",
    options: [
      { id: "A", text: "A apresentação da consulta autoriza o contribuinte a aplicar imediatamente a interpretação pretendida até decisão final irrecorrível." },
      { id: "B", text: "Impede a instauração de procedimento fiscal e a lavratura de Auto de Infração contra o consulente, relativamente à matéria consultada, até a data da ciência da resposta." },
      { id: "C", text: "Suspende a exigibilidade do crédito tributário já lançado anteriormente à data da protocolização da consulta." },
      { id: "D", text: "Interrompe o prazo de prescrição para a cobrança judicial de eventuais débitos já inscritos em Dívida Ativa." },
      { id: "E", text: "Não produz qualquer efeito suspensivo ou protetivo se a empresa não efetuar o depósito judicial do montante integral do tributo questionado." }
    ],
    correct: "B",
    explanation: "Segundo o Art. 73 da Lei Estadual nº 3.938/1966 (PAF/SC), a apresentação de consulta formulada pelo sujeito passivo em conformidade com as exigências legais impede o início de qualquer procedimento fiscal destinado à apuração de infrações relacionadas à matéria consultada, vedando a lavratura de Auto de Infração a partir da data de protocolo até a ciência da resposta oficial."
  },
  {
    id: 3,
    discipline: "Direito Tributário",
    topic: "Responsabilidade Tributária e Substituição",
    difficulty: "Médio",
    code: "FCC-SEFAZ-03",
    question: "Determinada distribuidora de combustíveis estabelecida em SC foi nomeada por lei estadual como substituta tributária para frente (ST) em relação ao ICMS devido pelos postos revendedores varejistas nas operações subsequentes. Suponha que a distribuidora tenha recolhido o ICMS-ST estimado com base na MVA (Margem de Valor Agregado). Todavia, no momento da venda final aos consumidores, o preço praticado pelos postos foi efetivamente inferior à base de cálculo presumida. De acordo com o Código Tributário Nacional e a jurisprudência fixada pelo STF (Tema 201), é correto afirmar que:",
    options: [
      { id: "A", text: "É assegurada a restituição imediata e preferencial da quantia paga a maior referente à diferença entre a base de cálculo presumida e o valor real da operação." },
      { id: "B", text: "Não cabe qualquer restituição, pois a cobrança por substituição tributária progressiva tem caráter definitivo e irretratável." },
      { id: "C", text: "A restituição somente será admitida se demonstrado o vício de consentimento no momento do recolhimento do imposto pela distribuidora." },
      { id: "D", text: "O Estado deve exigir a suplementação do imposto caso a venda seja realizada por valor superior, mas é isento de restituir no caso de venda por valor inferior." },
      { id: "E", text: "O direito à restituição prescreve em 30 dias contados da ocorrência do fato gerador presumido." }
    ],
    correct: "A",
    explanation: "No RE 593.849/MG (Tema 201/STF), foi tese fixada: 'É devida a restituição da diferença do Imposto sobre Circulação de Mercadorias e Serviços - ICMS pago a mais no regime de substituição tributária para frente se a base de cálculo efetiva da operação for inferior à presumida.' Art. 150, §7º da CF/88 e diretrizes do CTN respaldam esse ressarcimento."
  },
  {
    id: 4,
    discipline: "Contabilidade Geral e Avançada",
    topic: "CPC 16 - Valoração de Estoques",
    difficulty: "Difícil",
    code: "FCC-SEFAZ-04",
    question: "Uma comercial de eletrodomésticos adquiriu em lote 100 unidades de refrigeradores para revenda pelo valor total bruto na Nota Fiscal de R$ 200.000,00. No documento fiscal, constavam discriminados: R$ 24.000,00 de ICMS recuperarável, R$ 18.000,00 de PIS/COFINS recuperaráveis e R$ 10.000,00 de IPI não recuperável. A empresa contratou transportadora independente pagando R$ 6.000,00 de frete (sem incidência de créditos) e obteve R$ 4.000,00 de desconto comercial incondicional no ato da compra. Segundo o CPC 16 (R1) – Estoques, qual o valor correto a ser ativado no estoque de mercadorias?",
    options: [
      { id: "A", text: "R$ 164.000,00" },
      { id: "B", text: "R$ 170.000,00" },
      { id: "C", text: "R$ 158.000,00" },
      { id: "D", text: "R$ 200.000,00" },
      { id: "E", text: "R$ 180.000,00" }
    ],
    correct: "A",
    explanation: "Cálculo do Estoque (CPC 16):\n(+) Preço das mercadorias: R$ 200.000,00\n(-) Desconto Comercial Incondicional: R$ 4.000,00\n(=) Valor bruto líquido do desconto: R$ 196.000,00\n(-) Tributos Recuperáveis (ICMS R$ 24.000 + PIS/COFINS R$ 18.000): -R$ 42.000,00\n(+) Tributos Não Recuperáveis (IPI): +R$ 10.000,00 (já incluso no valor bruto ou somado conforme NF)\n(+) Custos diretos de transporte (Frete): +R$ 6.000,00\n\nTotal do Custo de Aquisição = 200.000 - 4.000 - 42.000 + 10.000 = 164.000,00."
  },
  {
    id: 5,
    discipline: "Contabilidade Geral e Avançada",
    topic: "CPC 15 - Combinação de Negócios e Goodwill",
    difficulty: "Nível Prova Fiscal",
    code: "FCC-SEFAZ-05",
    question: "A Cia. Catarinense adquiriu 80% do capital votante e total da Cia. Sulina pelo montante de R$ 800.000,00 em dinheiro. Na data da aquisição, o valor contábil do Patrimônio Líquido da Cia. Sulina era de R$ 700.000,00, contudo, a avaliação a valor justo dos seus ativos líquidos identificáveis resultou no montante de R$ 900.000,00. Sabendo que a participação dos não controladores (20%) foi mensurada pelo valor justo proporcional dos ativos líquidos, o valor do Goodwill (ágio por expectativa de rentabilidade futura) a ser apurado na consolidação é:",
    options: [
      { id: "A", text: "R$ 80.000,00" },
      { id: "B", text: "R$ 100.000,00" },
      { id: "C", text: "R$ 160.000,00" },
      { id: "D", text: "R$ 240.000,00" },
      { id: "E", text: "R$ 0,00 (Compra Vantajosa com ganho de R$ 20.000,00)" }
    ],
    correct: "A",
    explanation: "Cálculo do Goodwill (CPC 15):\nValor Pago pela adquirente: R$ 800.000,00\nProporção no Valor Justo dos Ativos Líquidos Identificáveis Adquiridos: 80% de R$ 900.000,00 = R$ 720.000,00.\nGoodwill = Valor Pago (R$ 800.000) - Proporção no Valor Justo (R$ 720.000) = R$ 80.000,00."
  },
  {
    id: 6,
    discipline: "Auditoria Fiscal",
    topic: "NBC TA 500 - Evidência e Procedimentos",
    difficulty: "Médio",
    code: "FCC-SEFAZ-06",
    question: "Durante uma auditoria direta na escrita fiscal de um grande estabelecimento atacadista em Itajaí/SC, o Auditor Fiscal do Estado decide aplicar procedimentos de confirmação externa (circularização) para checar o saldo de contas a receber e estoques mantidos em depósitos de terceiros. Sobre os princípios de confiabilidade das evidências contidas na NBC TA 500 / NBC TA 330, assinale a opção correta:",
    options: [
      { id: "A", text: "A evidência obtida diretamente pelo auditor em resposta escrita enviada por terceiro independente é mais confiável do que a evidência obtida indiretamente ou de fonte interna da auditada." },
      { id: "B", text: "Documentos em cópia digitalizada enviadas por e-mail possuem valor probatório superior a documentos originais impressos selados." },
      { id: "C", text: "A confirmação externa negativa (que exige resposta somente se houver divergência) fornece evidência mais convincente do que a confirmação positiva." },
      { id: "D", text: "O auditor deve desconsiderar totalmente a indagação verbal prestada pelos gerentes da empresa por não possuir relevância em auditoria fiscal." },
      { id: "E", text: "A evidência obtida em fontes internas tem confiabilidade máxima independentemente do funcionamento dos controles internos." }
    ],
    correct: "A",
    explanation: "Conforme a NBC TA 500 (item A31): A confiabilidade das evidências aumenta quando obtidas de fontes independentes fora da entidade. Evidências obtidas diretamente pelo auditor (ex: confirmações externas) são mais confiáveis que evidências obtidas indiretamente ou por inferência."
  },
  {
    id: 7,
    discipline: "Auditoria Fiscal",
    topic: "Procedimentos de Corte / Cut-off e Passivo Oculto",
    difficulty: "Difícil",
    code: "FCC-SEFAZ-07",
    question: "Um Auditor Fiscal de SC realiza o procedimento denominado 'Cut-off' (teste de corte) das compras e vendas no encerramento do exercício em 31/12. Ao examinar as notas fiscais de entrada de mercadorias emitidas pelos fornecedores entre 26/12 e 05/01, o auditor constatou que três notas fiscais relativas a lotes recebidos e contados no inventário físico de 31/12 foram registradas no livro de Compras apenas no exercício subsequente em janeiro. Essa divergência gera qual tipo de distorção nas demonstrações financeiras da empresa?",
    options: [
      { id: "A", text: "Subavaliação do Estoque Final e Superavaliação do Lucro Líquido do exercício auditado." },
      { id: "B", text: "Superavaliação do Passivo Exigível (Fornecedores) e Subavaliação do Resultado Bruto." },
      { id: "C", text: "Subavaliação do Custo das Mercadorias Vendidas (CMV) e consequente Superavaliação artificial do Lucro Líquido e do Ativo Líquido." },
      { id: "D", text: "Efeito nulo na apuração do Lucro Líquido, pois o estoque e o passivo foram ajustados proporcionalmente no encerramento." },
      { id: "E", text: "Subavaliação do Ativo Circulante e Superavaliação do Passivo Não Circulante." }
    ],
    correct: "C",
    explanation: "Efeito da omissão de compras quando o estoque físico já inclui o bem:\nSe a mercadoria ESTÁ no estoque final, mas a COMPRA (fornecedor) NÃO foi registrada no período, o CMV (Estoque Inicial + Compras - Estoque Final) fica subavaliado (porque Compras ficou menor que o real). Se o CMV é subavaliado, o Lucro Bruto e o Lucro Líquido ficam SUPERAVALIADOS. O passivo também fica subavaliado (passivo oculto)."
  },
  {
    id: 8,
    discipline: "Tecnologia da Informação / TI Aplicada",
    topic: "Análise de Dados e Banco de Dados SQL em Auditoria",
    difficulty: "Difícil",
    code: "FCC-SEFAZ-08",
    question: "No exercício de fiscalização de uma rede de supermercados em Santa Catarina, o Auditor Fiscal necessita efetuar uma consulta no banco de dados relacional das Notas Fiscais Eletrônicas (NF-e) emitidas em 2025. O objetivo é identificar estabelecimentos cujo somatório mensal do valor total de saídas (coluna 'valor_total') tenha ultrapassado R$ 1.000.000,00, exibindo o CNPJ do emitente e o total acumulado, ordenado do maior para o menor. Assinale a instrução SQL válida e otimizada que atende estritamente a este requisito:",
    options: [
      { id: "A", text: "SELECT cnpj_emitente, SUM(valor_total) FROM nfe WHERE valor_total > 1000000 GROUP BY cnpj_emitente ORDER BY 2 DESC;" },
      { id: "B", text: "SELECT cnpj_emitente, SUM(valor_total) AS total_vendas FROM nfe GROUP BY cnpj_emitente HAVING SUM(valor_total) > 1000000 ORDER BY total_vendas DESC;" },
      { id: "C", text: "SELECT cnpj_emitente, valor_total FROM nfe WHERE SUM(valor_total) > 1000000 GROUP BY cnpj_emitente ORDER BY valor_total DESC;" },
      { id: "D", text: "SELECT DISTINCT cnpj_emitente, SUM(valor_total) FROM nfe WHERE HAVING total > 1000000 ORDER BY cnpj_emitente;" },
      { id: "E", text: "SELECT cnpj_emitente, COUNT(valor_total) FROM nfe GROUP BY cnpj_emitente WHERE COUNT > 1000000 ORDER BY 1 ASC;" }
    ],
    correct: "B",
    explanation: "Na linguagem SQL relacional, para aplicar um filtro sobre um valor agregado (no caso, a soma `SUM(valor_total)` por grupo de CNPJ), deve-se obrigatoriamente utilizar a cláusula `HAVING` acompanhando a cláusula `GROUP BY`. A cláusula `WHERE` filtra linhas individuais antes do agrupamento."
  },
  {
    id: 9,
    discipline: "Direito Administrativo e Constitucional",
    topic: "Princípios Constitucionais Tributários e Limitações",
    difficulty: "Médio",
    code: "FCC-SEFAZ-09",
    question: "Suponha que o Estado de Santa Catarina publique em 15 de novembro de 2025 uma Lei Estadual que majore as alíquotas do Imposto sobre Transmissão Causa Mortis e Doação (ITCMD). A referida lei estabelece em suas disposições finais que entrará em vigor no dia 1º de janeiro de 2026. À luz do princípio constitucional da anterioridade tributária (Art. 150, III, 'b' e 'c' da CF/88), a cobrança das alíquotas majoradas:",
    options: [
      { id: "A", text: "É perfeitamente válida a partir de 1º de janeiro de 2026, pois respeitou plenamente o princípio da anterioridade de exercício (anual)." },
      { id: "B", text: "É inconstitucional no início de 2026 por violar a anterioridade nonagesimal (noventena), podendo ser cobrada apenas após transcorridos 90 dias da publicação (a partir de meados de fevereiro de 2026)." },
      { id: "C", text: "É totalmente isenta de respeitar a anterioridade nonagesimal, pois o ITCMD figura no rol das exceções constitucionais expressas ao lado do II, IE, IPI e IOF." },
      { id: "D", text: "Pode ser aplicada retroativamente a fatos geradores ocorridos a partir de 1º de novembro de 2025." },
      { id: "E", text: "Exige aprovação suplementar por Resolução do Senado Federal antes de produzir qualquer efeito fiscal." }
    ],
    correct: "B",
    explanation: "O ITCMD submete-se TANTO à anterioridade de exercício (anual - alínea b) QUANTO à anterioridade nonagesimal (90 dias - alínea c). Publicada a majoração em 15/11/2025, o prazo de 90 dias encerra-se em meados de fevereiro de 2026. A cobrança em 01/01/2026 violaria a anterioridade nonagesimal!"
  },
  {
    id: 10,
    discipline: "Contabilidade Geral e Avançada",
    topic: "CPC 25 - Provisões, Passivos e Ativos Contingentes",
    difficulty: "Médio",
    code: "FCC-SEFAZ-10",
    question: "A Cia. Navegantes responde a uma ação judicial de natureza tributária movida pelo Fisco do qual se pleiteia o pagamento de suposto débito de R$ 5.000.000,00. Em 31/12/2025, os assessores jurídicos da empresa reavaliaram a causa e emitiram parecer formal classificando o risco de perda na ação judicial como 'POSSÍVEL'. Considerando as regras estipuladas pelo CPC 25, assinale o procedimento correto a ser adotado pela entidade na elaboração das demonstrações contábeis:",
    options: [
      { id: "A", text: "Reconhecer uma Provisão para Riscos Fiscais no Passivo Não Circulante no valor integral de R$ 5.000.000,00 com contrapartida no Resultado." },
      { id: "B", text: "Não reconhecer qualquer valor no Balanço Patrimonial, devendo, contudo, divulgar a contingência em Notas Explicativas." },
      { id: "C", text: "Registrar um Ativo Contingente no Ativo Circulante no valor estimado do ganho esperado." },
      { id: "D", text: "Apenas lançar o valor em contas de compensação fora das demonstrações, dispensando qualquer menção em Notas Explicativas." },
      { id: "E", text: "Reconhecer uma Provisão parcial equivalente a 50% do valor pleiteado (R$ 2.500.000,00) como conservadorismo." }
    ],
    correct: "B",
    explanation: "Segundo o CPC 25:\n1. Perda Provável: RECONHECE PROVISÃO no balanço e divulga em Notas Explicativas.\n2. Perda POSSÍVEL: NÃO reconhece provisão no balanço; DIVULGA apenas em Notas Explicativas (Passivo Contingente).\n3. Perda Remota: NÃO reconhece e NÃO divulga nada."
  }
];

const DISCIPLINES_LIST = [
  "Todas as Disciplinas",
  "Legislação Tributária Estadual (SC)",
  "Direito Tributário",
  "Contabilidade Geral e Avançada",
  "Auditoria Fiscal",
  "Tecnologia da Informação / TI Aplicada",
  "Direito Administrativo e Constitucional"
];

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'simulado' | 'generator' | 'prompts' | 'history'
  
  // Quiz active state
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: 'A' }
  const [reviewedQuestions, setReviewedQuestions] = useState(new Set());
  const [showExplanation, setShowExplanation] = useState({}); // { questionId: true }
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // History & Statistics state
  const [history, setHistory] = useState([
    {
      id: "SIM-001",
      date: "2026-03-20",
      title: "Simulado Geral SEFAZ-SC (FCC)",
      total: 10,
      correct: 8,
      timeSpent: "24m 12s",
      disciplineBreakdown: {
        "Legislação Tributária Estadual (SC)": "100%",
        "Contabilidade Geral e Avançada": "66%",
        "Auditoria Fiscal": "100%"
      }
    }
  ]);

  // Generator State
  const [genDiscipline, setGenDiscipline] = useState("Todas as Disciplinas");
  const [genCount, setGenCount] = useState(5);
  const [genDifficulty, setGenDifficulty] = useState("Todas");

  // Prompt Studio state
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !quizFinished) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizFinished]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  // Start a new Quiz session
  const startQuiz = (customQuestions = null) => {
    const listToUse = customQuestions || INITIAL_QUESTIONS;
    setQuestions(listToUse);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setReviewedQuestions(new Set());
    setShowExplanation({});
    setQuizFinished(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setActiveTab('simulado');
  };

  const handleOptionSelect = (qId, optionId) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const toggleReview = (qId) => {
    setReviewedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const toggleExplanation = (qId) => {
    setShowExplanation(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleFinishQuiz = () => {
    setIsTimerRunning(false);
    setQuizFinished(true);

    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const newHistoryEntry = {
      id: `SIM-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      title: `Simulado Personalizado (${questions.length} Qs)`,
      total: questions.length,
      correct: correctCount,
      timeSpent: formatTime(timerSeconds),
      disciplineBreakdown: {}
    };

    setHistory(prev => [newHistoryEntry, ...prev]);
  };

  // Generate Filtered Quiz
  const handleGenerateQuiz = () => {
    let filtered = [...INITIAL_QUESTIONS];
    if (genDiscipline !== "Todas as Disciplinas") {
      filtered = filtered.filter(q => q.discipline === genDiscipline);
    }
    if (genDifficulty !== "Todas") {
      filtered = filtered.filter(q => q.difficulty === genDifficulty);
    }
    // Take requested count
    const sliced = filtered.slice(0, genCount);
    if (sliced.length === 0) {
      alert("Nenhuma questão encontrada com esses filtros. Mostrando simulado padrão!");
      startQuiz(INITIAL_QUESTIONS.slice(0, genCount));
    } else {
      startQuiz(sliced);
    }
  };

  // Overall statistics metrics
  const totalQuestionsAnswered = useMemo(() => {
    return history.reduce((acc, item) => acc + item.total, 0);
  }, [history]);

  const totalCorrectAnswered = useMemo(() => {
    return history.reduce((acc, item) => acc + item.correct, 0);
  }, [history]);

  const overallAccuracy = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswered / totalQuestionsAnswered) * 100) 
    : 0;

  const promptTemplates = [
    {
      title: "Simulado Inédito - LTE/SC (Lei 10.297/96)",
      discipline: "Legislação Tributária Estadual SC",
      prompt: `Atue como banca examinadora da FCC (Fundação Carlos Chagas) para o concurso da SEFAZ-SC (Auditor Fiscal da Receita Estadual).\n\nGere 5 questões inéditas de múltipla escolha (A a E) de alto nível sobre a LEI ESTADUAL Nº 10.297/1996 (ICMS SC), focando em:\n1. Fato Gerador e Isenções fiscais\n2. Substituição Tributária (ST) e MVA\n3. Alíquotas Internas e Seletividade.\n\nRegras:\n- Enunciados com casos práticos e situações hipotéticas operacionais.\n- Respostas com alternativas A, B, C, D, E e pegadinhas clássicas da FCC.\n- Apresente primeiro apenas as 5 questões e ao final insira o GABARITO COMENTADO indicando os artigos específicos da Lei 10.297/96.`
    },
    {
      title: "Simulado de Casos Práticos CPCs (Contabilidade Avançada)",
      discipline: "Contabilidade Geral e Avançada",
      prompt: `Aja como um elaborador de provas de Contabilidade da Fundação Carlos Chagas (FCC) focado no concurso da SEFAZ-SC.\n\nCrie 3 questões complexas de múltipla escolha (A a E) envolvendo cálculos contábeis práticos sobre:\n- CPC 15 (Combinação de Negócios e Goodwill/Compra Vantajosa)\n- CPC 16 (Estoques e Ajuste a Valor Presente)\n- CPC 27 (Imobilizado e Teste de Impairment).\n\nForneça o gabarito detalhado com o passo a passo matemático de cada lançamento contábil!`
    },
    {
      title: "Questões de Consulta Tributária e PAF/SC (Lei 3.938/66)",
      discipline: "Processo Administrativo Fiscal SC",
      prompt: `Elabore 4 questões no padrão estrito da FCC para a SEFAZ-SC sobre o Processo Administrativo Fiscal de Santa Catarina (Lei Estadual nº 3.938/1966).\n\nAborde: Efeitos da Consulta Tributária, Prazos de impugnação, Notificação Fiscal e Recursos ao Conselho Estadual de Contribuintes (CEC/SC).\nInclua alternativas plausíveis e gabarito fundamentado no texto legal.`
    }
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(index);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SEFAZ-SC
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Banca FCC
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Plataforma Interativa de Simulados & Questões Fiscais</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => startQuiz()}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'simulado' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Praticar Simulado</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'generator' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Gerador Customizado</span>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'prompts' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Estúdio Gemini</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-amber-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 py-3 space-y-2 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-sm flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => { startQuiz(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-sm flex items-center space-x-2"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span>Praticar Simulado</span>
            </button>
            <button
              onClick={() => { setActiveTab('generator'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-sm flex items-center space-x-2"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span>Gerador Customizado</span>
            </button>
            <button
              onClick={() => { setActiveTab('prompts'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Estúdio Gemini</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Banner Hero */}
            <div className={`p-6 sm:p-8 rounded-2xl relative overflow-hidden border shadow-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-blue-900/40' 
                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white border-blue-500'
            }`}>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Foco de Preparação Auditiva</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Treinamento Intensivo SEFAZ-SC (FCC)
                </h1>
                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-blue-100'}`}>
                  Prepare-se para uma das provas fiscais mais exigentes do país com simulados parametrizados, jurisprudência tributária catarinense (Lei 10.297/96 e 3.938/66), CPCs e Auditoria.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => startQuiz()}
                    className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 flex items-center space-x-2 transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Iniciar Simulado Rápido (10 Qs)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors flex items-center space-x-2 ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Personalizar Matérias</span>
                  </button>
                </div>
              </div>

              {/* Decorative SVG Icon */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                <Award className="w-72 h-72 text-white" />
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolvidas</span>
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{totalQuestionsAnswered}</div>
                <p className="text-xs text-slate-400 mt-1">Questões acumuladas nos treinos</p>
              </div>

              <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Taxa de Acerto</span>
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Target className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-400">{overallAccuracy}%</div>
                <p className="text-xs text-slate-400 mt-1">Média de precisão em exames</p>
              </div>

              <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tempo Médio/Questão</span>
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold">2m 15s</div>
                <p className="text-xs text-slate-400 mt-1">Meta FCC: &lt; 3m00s por questão</p>
              </div>

              <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Simulados Feitos</span>
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{history.length}</div>
                <p className="text-xs text-slate-400 mt-1">Sessões finalizadas com nota</p>
              </div>

            </div>

            {/* Performance by Subject & Quick Tips Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Disciplines Accuracy Bars */}
              <div className={`lg:col-span-2 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-base font-bold mb-4 flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-blue-400" />
                  <span>Desempenho Estimado por Disciplina</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Legislação Tributária SC (Lei 10.297 / 3.938)</span>
                      <span className="text-emerald-400 font-bold">85%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Contabilidade Geral e Avançada (CPCs)</span>
                      <span className="text-blue-400 font-bold">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Direito Tributário (CTN / CF88)</span>
                      <span className="text-emerald-400 font-bold">80%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Auditoria Fiscal e Contábil</span>
                      <span className="text-amber-400 font-bold">65%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>TI Aplicada & SQL em Auditoria</span>
                      <span className="text-rose-400 font-bold">50%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Tips */}
              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="text-base font-bold mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Dicas Estratégicas FCC</span>
                </h3>

                <ul className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Enunciados com Histórias:</strong> A FCC costuma criar nomes de empresas ("Cia. Alfa", "Laticínios do Vale") para aplicar regras de substituição do ICMS.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Calculadoras de CPCs:</strong> Treine lançamentos de Goodwill, equivalência patrimonial e imparidade com agilidade para economizar tempo.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Efeitos da Consulta Tributária (SC):</strong> Lembre-se que a consulta impede o Auto de Infração e resguarda o contribuinte durante o trâmite.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {}
        {activeTab === 'simulado' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            
            {/* Top Toolbar: Progress, Timer & Actions */}
            <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Questão {currentIdx + 1} de {questions.length}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {questions[currentIdx].discipline}
                </span>
              </div>

              {/* Timer Badge */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-amber-400">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{formatTime(timerSeconds)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleReview(questions[currentIdx].id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                    reviewedQuestions.has(questions[currentIdx].id)
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Marcar para Revisar"
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Revisar</span>
                </button>

                {!quizFinished && (
                  <button
                    onClick={handleFinishQuiz}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
                  >
                    Finalizar Simulado
                  </button>
                )}
              </div>
            </div>

            {/* Question Quick Jump Matrix */}
            <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = reviewedQuestions.has(q.id);
                
                let btnClass = "w-8 h-8 rounded-md text-xs font-bold transition-all relative flex items-center justify-center ";
                if (isCurrent) {
                  btnClass += "ring-2 ring-blue-500 bg-blue-600 text-white shadow-md ";
                } else if (isAnswered) {
                  btnClass += "bg-blue-950 text-blue-300 border border-blue-800 ";
                } else {
                  btnClass += "bg-slate-800 text-slate-400 hover:bg-slate-700 ";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={btnClass}
                  >
                    {idx + 1}
                    {isMarked && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Question Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-xl ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {questions[currentIdx].code}
                  </span>
                  <span className="text-xs font-medium text-blue-400">
                    {questions[currentIdx].topic}
                  </span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  questions[currentIdx].difficulty === 'Difícil' || questions[currentIdx].difficulty === 'Nível Prova Fiscal'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {questions[currentIdx].difficulty}
                </span>
              </div>

              {/* Statement */}
              <p className="text-base sm:text-lg leading-relaxed font-normal mb-8 text-slate-200">
                {questions[currentIdx].question}
              </p>

              {/* Options A to E */}
              <div className="space-y-3 mb-8">
                {questions[currentIdx].options.map((opt) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === opt.id;
                  const isCorrect = opt.id === questions[currentIdx].correct;
                  
                  let optionStyle = "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start space-x-3 ";
                  
                  if (quizFinished) {
                    if (isCorrect) {
                      optionStyle += "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/20";
                    } else if (isSelected && !isCorrect) {
                      optionStyle += "bg-rose-950/80 border-rose-500 text-rose-200";
                    } else {
                      optionStyle += "opacity-50 border-slate-800 text-slate-400";
                    }
                  } else {
                    if (isSelected) {
                      optionStyle += "bg-blue-600/10 border-blue-500 text-blue-300 ring-1 ring-blue-500 shadow-md";
                    } else {
                      optionStyle += theme === 'dark' 
                        ? "bg-slate-800/40 hover:bg-slate-800 border-slate-800 text-slate-300" 
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(questions[currentIdx].id, opt.id)}
                      className={optionStyle}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="leading-snug mt-0.5">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => toggleExplanation(questions[currentIdx].id)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showExplanation[questions[currentIdx].id] ? 'Ocultar Gabarito Comentado' : 'Ver Gabarito Comentado & Fundamentação'}</span>
                </button>

                {quizFinished && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedAnswers[questions[currentIdx].id] === questions[currentIdx].correct
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {selectedAnswers[questions[currentIdx].id] === questions[currentIdx].correct ? 'Você Acertou!' : 'Você Errou'}
                  </span>
                )}
              </div>

              {/* Explanation Content Box */}
              {(showExplanation[questions[currentIdx].id] || quizFinished) && (
                <div className={`mt-4 p-5 rounded-xl text-xs sm:text-sm leading-relaxed border animate-fadeIn ${
                  theme === 'dark' ? 'bg-slate-950 border-blue-900/40 text-slate-300' : 'bg-blue-50 border-blue-200 text-slate-800'
                }`}>
                  <div className="font-bold text-blue-400 mb-2 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Gabarito Oficial: Alternativa {questions[currentIdx].correct}</span>
                  </div>
                  <p className="whitespace-pre-line">{questions[currentIdx].explanation}</p>
                </div>
              )}

            </div>

            {/* Bottom Navigation Control Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-semibold flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIdx === questions.length - 1}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center space-x-2"
              >
                <span>Próxima</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Results Summary when Finished */}
            {quizFinished && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl mx-auto flex items-center justify-center border border-blue-500/20">
                      <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Simulado Concluído!</h2>
                    <p className="text-xs text-slate-400">Resultado do treino SEFAZ-SC no padrão FCC</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2">
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block">Acertos</span>
                      <span className="text-2xl font-bold text-emerald-400">
                        {questions.filter(q => selectedAnswers[q.id] === q.correct).length} / {questions.length}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block">Tempo Utilizado</span>
                      <span className="text-2xl font-bold text-amber-400">{formatTime(timerSeconds)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setQuizFinished(false)}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30"
                    >
                      Revisar Minhas Respostas
                    </button>
                    <button
                      onClick={() => startQuiz()}
                      className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700"
                    >
                      Refazer Simulado
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {}
        {activeTab === 'generator' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-2">Gerador Personalizado de Simulados</h2>
              <p className="text-sm text-slate-400">Filtre tópicos estratégicos e monte cadernos de treino sob medida para a SEFAZ-SC.</p>
            </div>

            <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 shadow-xl ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Discipline Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Disciplina Foco
                </label>
                <select
                  value={genDiscipline}
                  onChange={(e) => setGenDiscipline(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {DISCIPLINES_LIST.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Number of Questions Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Quantidade de Questões</span>
                  <span className="text-blue-400 font-extrabold">{genCount} questões</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={genCount}
                  onChange={(e) => setGenCount(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Difficulty Level Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Nível de Dificuldade
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Todas', 'Médio', 'Nível Prova Fiscal'].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setGenDifficulty(diff)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        genDifficulty === diff
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Trigger Button */}
              <button
                onClick={handleGenerateQuiz}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 transition-transform active:scale-98"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Gerar e Iniciar Simulado Agora</span>
              </button>

            </div>
          </div>
        )}

        {}
        {activeTab === 'prompts' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Copilot & Gerador de Prompts do Gemini</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Estúdio de Prompts SEFAZ-SC</h2>
              <p className="text-sm text-slate-400">Copie os comandos abaixo formatados para pedir simulados infinitos ao Gemini com a legislação exata de SC.</p>
            </div>

            <div className="space-y-6">
              {promptTemplates.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-base text-blue-400">{item.title}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {item.discipline}
                    </span>
                  </div>

                  <pre className={`p-4 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto border mb-4 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {item.prompt}
                  </pre>

                  <button
                    onClick={() => copyToClipboard(item.prompt, index)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center space-x-2 transition-colors"
                  >
                    {copiedPrompt === index ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Prompt Copiado para a Área de Transferência!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Prompt para usar no Gemini</span>
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