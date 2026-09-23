import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart3,
  Flame,
  Award,
  RefreshCw,
  Search,
  Filter,
  Bookmark,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Clock,
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

interface UserAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
}

// Initial Question Bank
const QUESTION_BANK: Question[] = [
  {
    id: 1,
    discipline: 'Legislação Tributária Estadual (SC)',
    topic: 'ICMS - Fato Gerador e Momento da Ocorrência',
    banca: 'FCC',
    difficulty: 'Média',
    statement: 'Nos termos da Lei Estadual nº 10.297/1996 do Estado de Santa Catarina, considera-se ocorrido o fato gerador do ICMS no momento:',
    options: [
      'A) do desembaraço aduaneiro de mercadorias ou bens importados do exterior, independentemente da entrega física.',
      'B) do contrato de compra e venda de mercadorias entre contribuintes situados no Estado.',
      'C) da emissão da nota fiscal eletrônica (NF-e), independentemente da saída do estabelecimento.',
      'D) do pagamento do preço do serviço de transporte intermunicipal ou interestadual.',
      'E) da entrada no estabelecimento do adquirente, em qualquer hipótese de operação interna.'
    ],
    correctAnswer: 0,
    explanation: 'De acordo com a Lei Estadual nº 10.297/1996 (Lei do ICMS de Santa Catarina), o fato gerador ocorre no momento do desembaraço aduaneiro de mercadorias importadas do exterior. A entrega física não condiciona a ocorrência do fato gerador na importação para fins de exigibilidade do imposto.'
  },
  {
    id: 2,
    discipline: 'Legislação Tributária Estadual (SC)',
    topic: 'Processo Administrativo Fiscal (Lei nº 3.938/1966)',
    banca: 'FCC',
    difficulty: 'Difícil',
    statement: 'A respeito do Processo Administrativo Fiscal no Estado de Santa Catarina (Lei nº 3.938/1966), a consulta sobre a aplicação da legislação tributária estadual formulada pelo sujeito passivo:',
    options: [
      'A) suspended formalmente a cobrança de débitos já inscritos em Dívida Ativa.',
      'B) impede a instauração de procedimento fiscal contra o consulente relativamente à matéria consultada, enquanto não respondida.',
      'C) pode ser apresentada verbalmente perante a repartição fiscal do domicílio do contribuinte.',
      'D) produz efeitos normativos erga omnes imediatos a partir da protocolização.',
      'E) cancela eventuais penalidades aplicadas antes de sua protocolização.'
    ],
    correctAnswer: 1,
    explanation: 'Conforme dispõe a Lei Estadual nº 3.938/1966, a apresentação da consulta efetuada em conformidade com as normas legais impede o início de qualquer procedimento fiscal destinado à apuração de infrações relacionadas à matéria consultada até a data da notificação da resposta ao consulente.'
  },
  {
    id: 3,
    discipline: 'Direito Tributário',
    topic: 'Substituição Tributária e CTN',
    banca: 'FCC',
    difficulty: 'Média',
    statement: 'Em matéria de responsabilidade e substituição tributária progressiva ("para a frente") no ICMS, é correto afirmar segundo a jurisprudência consolidada do STF e a CF/88:',
    options: [
      'A) É vedada a restituição do imposto pago antecipadamente caso o fato gerador presumido ocorra em valor inferior ao estimado.',
      'B) É assegurada a imediata e preferencial restituição da quantia paga, caso não se realize o fato gerador presumido.',
      'C) A base de cálculo presumida pode ser fixada livremente por decreto executivo, sem previsão na lei complementar.',
      'D) A responsabilidade por substituição tributária depende de concordância expressa do contribuinte substituído.',
      'E) O fato gerador presumido exime o substituto tributário de manter escrituração fiscal relativa às operações.'
    ],
    correctAnswer: 1,
    explanation: 'O art. 150, § 7º da CF/88 estabelece que é assegurada a imediata e preferencial restituição da quantia paga, caso não se realize o fato gerador presumido. O STF também fixou a tese do Tema 201 (restituição da diferença quando o valor real for inferior ao presumido).'
  },
  {
    id: 4,
    discipline: 'Contabilidade Geral e Avançada',
    topic: 'CPC 16 - Valoração de Estoque',
    banca: 'FCC',
    difficulty: 'Média',
    statement: 'A Cia. Catarinense adquiriu mercadorias para revenda pelo valor total bruto de R$ 100.000, com tributos recuperáveis inclusos no valor de R$ 18.000. Adicionalmente, pagou R$ 5.000 pelo frete de transporte até seu almoxarifado. O valor a ser reconhecido no Ativo (Estoques) é:',
    options: [
      'A) R$ 100.000',
      'B) R$ 82.000',
      'C) R$ 87.000',
      'D) R$ 105.000',
      'E) R$ 123.000'
    ],
    correctAnswer: 2,
    explanation: 'Custo do Estoque (CPC 16) = Preço de aquisição - Tributos Recuperáveis + Custos de transporte/frete para colocar o item na condição/local atual. Custo = (100.000 - 18.000) + 5.000 = R$ 82.000 + 5.000 = R$ 87.000.'
  },
  {
    id: 5,
    discipline: 'Contabilidade Geral e Avançada',
    topic: 'CPC 15 - Combinação de Negócios e Goodwill',
    banca: 'FCC',
    difficulty: 'Difícil',
    statement: 'A entidade A adquiriu 100% do capital votante da entidade B por R$ 500.000 em dinheiro. Na data da aquisição, o valor justo dos ativos líquidos identificáveis da entidade B era de R$ 420.000. O lançamento contábil na adquirente registrará:',
    options: [
      'A) Ágio por expectativa de rentabilidade futura (Goodwill) no valor de R$ 80.000 no Ativo Não Circulante.',
      'B) Ganho por compra vantajosa de R$ 80.000 diretamente no Resultado do Exercício.',
      'C) Perda por Impairment de R$ 80.000 no Resultado Operacional.',
      'D) Desconto financeiro obtido de R$ 80.000 no Passivo Circulante.',
      'E) Ajuste de Avaliação Patrimonial de R$ 80.000 no Patrimônio Líquido.'
    ],
    correctAnswer: 0,
    explanation: 'Goodwill = Valor pago (R$ 500.000) - Valor justo dos ativos líquidos adquiridos (R$ 420.000) = R$ 80.000. Como o valor pago excede o valor justo dos ativos líquidos, reconhece-se o Goodwill (ágio por expectativa de rentabilidade futura) no Ativo Intangível.'
  },
  {
    id: 6,
    discipline: 'Auditoria Fiscal',
    topic: 'NBC TA 500 - Evidência de Auditoria',
    banca: 'FCC',
    difficulty: 'Média',
    statement: 'Segundo a NBC TA 500 (Evidência de Auditoria), no tocante à confiabilidade das evidências obtidas pelo auditor fiscal, assinale a alternativa correta:',
    options: [
      'A) Evidências obtidas de fontes internas são sempre mais confiáveis do que as obtidas de fontes externas.',
      'B) A confiabilidade das evidências geradas internamente aumenta quando os controles internos relacionados são efetivos.',
      'C) Evidências em formato verbal possuem o mesmo grau de confiabilidade de documentos originais por escrito.',
      'D) Cópias de documentos fiscais possuem grau de confiabilidade superior aos documentos originais mantidos pela empresa.',
      'E) A evidência obtida indiretamente pelo auditor possui maior confiabilidade do que a obtida por observação direta.'
    ],
    correctAnswer: 1,
    explanation: 'A confiabilidade das evidências de auditoria é influenciada pela sua fonte e natureza. Evidências geradas internamente são mais confiáveis quando os controles internos estabelecidos pela entidade são efetivos e operam adequadamente.'
  },
  {
    id: 7,
    discipline: 'Auditoria Fiscal',
    topic: 'Procedimentos de Auditoria - Teste de Cut-off',
    banca: 'FCC',
    difficulty: 'Difícil',
    statement: 'O teste de corte (cut-off) executado pelo Auditor Fiscal sobre as operações de compra e venda de mercadorias no encerramento do exercício social visa precipuamente verificar:',
    options: [
      'A) a correta classificação das contas no Balanço Patrimonial entre Circulante e Não Circulante.',
      'B) a exatidão dos cálculos matemáticos de depreciação do ativo imobilizado.',
      'C) se as receitas e despesas foram registradas no período contábil/fiscal correto a que pertencem.',
      'D) o cumprimento de obrigações acessórias trabalhistas e previdenciárias do contribuinte.',
      'E) a capacidade financeira de solvência da entidade perante o Fisco estadual.'
    ],
    correctAnswer: 2,
    explanation: 'O teste de corte (cut-off ou tempestividade) busca assegurar que as transações (especialmente compras, vendas e movimentação de estoques) foram registradas no período contábil/fiscal exato a que correspondem, evitando antecipação ou diferimento indevido de receitas e ICMS.'
  },
  {
    id: 8,
    discipline: 'Direito Tributário',
    topic: 'ITCMD - Competência Estadual',
    banca: 'FCC',
    difficulty: 'Fácil',
    statement: 'Tratando-se do Imposto sobre Transmissão Causa Mortis e Doação (ITCMD), de competência dos Estados e DF, a transmissão de bens imóveis e seus respectivos direitos compete ao Estado:',
    options: [
      'A) onde for processado o inventário ou arrolamento.',
      'B) da situação do bem imóvel.',
      'C) onde tiver domicílio o doador ou o de cujus.',
      'D) onde for feita a partilha judicial.',
      'E) escolhido pelos herdeiros em convenção extrajudicial.'
    ],
    correctAnswer: 1,
    explanation: 'Nos termos do art. 155, § 1º, I da CF/88, relativamente a bens imóveis e respectivos direitos, compete o imposto (ITCMD) ao Estado da situação do bem.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'generator' | 'copilot'>('dashboard');
  const [questions, setQuestions] = useState<Question[]>(QUESTION_BANK);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Filters
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
              <p className="text-xs text-slate-400">Plataforma de Simulados e Estudos Fiscais</p>
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
                  'Auditoria Fiscal'
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
                          {discCorrect.length}/{discAnswered.length} resolvidadas ({accuracy}%)
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
                  <Filter className="w-4 h-4 text-emerald-400" /> Filtrar Disciplina
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
                  <option value="Legislação Tributária Estadual (SC)">Legislação Tributária Estadual (SC)</option>
                  <option value="Direito Tributário">Direito Tributário</option>
                  <option value="Contabilidade Geral e Avançada">Contabilidade Geral e Avançada</option>
                  <option value="Auditoria Fiscal">Auditoria Fiscal</option>
                </select>
              </div>

              {/* Questions Index */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Lista de Questões ({filteredQuestions.length})
                </h3>
                <div className="grid grid-cols-5 gap-2">
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
                  <option>Legislação Tributária Estadual (SC)</option>
                  <option>Direito Tributário</option>
                  <option>Contabilidade Geral e Avançada</option>
                  <option>Auditoria Fiscal</option>
                  <option>Simulado Global (Todas as disciplinas)</option>
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
                  title: 'Simulado de Contabilidade Avançada (CPCs)',
                  description: 'Focado em CPC 15, CPC 16, CPC 25 e CPC 27 com cálculos contábeis de alto nível.',
                  prompt: `Atue como elaborador de exames fiscais da banca FCC. Elabore 3 questões práticas de Contabilidade Avançada (CPCs 15, 16 e 25) para a SEFAZ-SC.
Requisitos:
- Apresente dados numéricos para cálculo de custo de estoque, Goodwill e provisões contábeis.
- Dê 5 alternativas por questão.
- Apresente a resolução passo a passo de cada cálculo no gabarito.`
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
