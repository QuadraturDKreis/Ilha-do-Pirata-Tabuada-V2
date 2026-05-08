/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Timer, 
  Map as MapIcon, 
  Backpack, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Key,
  Star,
  Search,
  Zap,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { GameState } from './types';
import { GAME_NODES, FINALS } from './gameData';

const getInitialState = (): GameState => ({
  playerName: "",
  currentNode: 1,
  time: 4800,
  items: {
    chaveAzul: false,
    chaveDourada: false,
    lupaDosNumeros: false,
    lupaUsada: false,
    estrelaBonus: false,
    medalhaMatematica: false,
    dicaFinal: false,
    cartaoPulaCorredor: false,
    cartaoUsado: false,
    seloDeAjuda: false
  },
  chests: {
    bauAzul: false,
    bauDourado: false,
    bauMares: false
  },
  events: {
    avisoMareBaixa: false,
    rodadaRelampago: false,
    modoUltimaChamada: false
  },
  zones: {
    zonaA: false,
    zonaB: false,
    zonaC: false,
    zonaD: false,
    zonaE: false
  },
  missions: {
    ajudouPipo: false,
    ajudouBina: false,
    encontrouDicaFinal: false
  },
  achievements: {
    rapidoComoRaio: false,
    contaPerfeita: true,
    cacadorDeBaus: false,
    amigoDoPapagaio: false,
    guardaMapaCooperativo: false,
    viradaDaMare: false,
    exploradorCincoZonas: false,
    grandeCampeaOuCampeaoPirata: false
  },
  errorCorridorsVisited: 0,
  history: [],
  isStarted: false,
  isGameOver: false,
  finalReached: null
});

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('pirataTabuadaProgress');
    return saved ? JSON.parse(saved) : getInitialState();
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [pendingErrorItem, setPendingErrorItem] = useState<{ type: 'lupa' | 'cartao' | 'none', node: number } | null>(null);
  
  const [challengeInput, setChallengeInput] = useState("");

  const [globals, setGlobals] = useState(() => {
    const saved = localStorage.getItem('pirataTabuadaGlobals');
    return saved ? JSON.parse(saved) : { ...getInitialState().achievements, finals: [] };
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('pirataTabuadaProgress', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (gameState.isGameOver && gameState.finalReached) {
       setGlobals((prev: any) => {
          const newGlobals = { ...prev };
          for (const [k, v] of Object.entries(gameState.achievements)) {
             if (v) newGlobals[k] = true;
          }
          if (!newGlobals.finals) newGlobals.finals = [];
          if (!newGlobals.finals.includes(gameState.finalReached!)) {
             newGlobals.finals = [...newGlobals.finals, gameState.finalReached!].sort();
          }
          localStorage.setItem('pirataTabuadaGlobals', JSON.stringify(newGlobals));
          return newGlobals;
       });
    }
  }, [gameState.isGameOver, gameState.finalReached, gameState.achievements]);

  // Real-time ticking on challenge nodes
  useEffect(() => {
    const node = GAME_NODES[gameState.currentNode];
    const isChallengeNode = node?.choices?.some(c => c.isCorrect !== undefined);
    if (gameState.isStarted && !gameState.isGameOver && isChallengeNode) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.time > 0) {
            const newTime = prev.time - 1;
            if (newTime <= 0 && prev.currentNode !== 50) {
              return { ...prev, time: 0, isGameOver: true, finalReached: 1 };
            }
            return { ...prev, time: newTime };
          }
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.isStarted, gameState.isGameOver, gameState.currentNode]);

  const resetGame = useCallback(() => {
    setShowConfirmReset(true);
  }, []);

  const confirmResetGame = useCallback(() => {
    setGameState(getInitialState());
    localStorage.removeItem('pirataTabuadaProgress');
    setShowConfirmReset(false);
  }, []);

  const startGame = (name: string) => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    let newState = { ...getInitialState(), playerName: name, isStarted: true, history: [1] };
    const node1 = GAME_NODES[1];
    if (node1.onEnter) newState = node1.onEnter(newState);
    setGameState(newState);
  };

  const navigateTo = (nodeId: number) => {
    setGameState(prev => {
      let newState = { ...prev, currentNode: nodeId, history: [...prev.history, nodeId] };
      const node = GAME_NODES[nodeId];

      if (node?.isErrorCorridor) {
        newState.achievements.contaPerfeita = false;
        newState.errorCorridorsVisited += 1;
        setPendingErrorItem({ type: 'none', node: nodeId });
      }

      if (node?.onEnter) {
        newState = node.onEnter(newState);
      }

      // Time Over Check
      if (newState.time <= 0 && nodeId !== 50) {
        newState.isGameOver = true;
        newState.finalReached = 1;
      }

      return newState;
    });
  };

  const handleChoice = (nextNode: number) => {
    navigateTo(nextNode);
  };

  const handleErrorResolution = (useItem: 'lupa' | 'cartao' | 'none') => {
    const node = GAME_NODES[gameState.currentNode];
    const returnNode = node?.autoReturnNode || 1;
    
    setGameState(prev => {
      let newState = { ...prev };
      if (useItem === 'lupa') {
        newState.items.lupaUsada = true;
      } else if (useItem === 'cartao') {
        newState.items.cartaoUsado = true;
      } else {
        newState.time -= 600;
      }

      // Check time out after penalty
      if (newState.time <= 0 && returnNode !== 50) {
        newState.isGameOver = true;
        newState.finalReached = 1;
        newState.currentNode = 0; // Invalid state as we move to final screen
      } else {
        newState.currentNode = returnNode;
        newState.history = [...newState.history, returnNode];
      }

      return newState;
    });
    setPendingErrorItem(null);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(Math.max(0, totalSeconds) / 60).toString().padStart(2, '0');
    const s = (Math.floor(Math.max(0, totalSeconds)) % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getColorByTime = (time: number) => {
    if (time > 3000) return 'bg-emerald-500';
    if (time > 1800) return 'bg-amber-500';
    if (time > 600) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  if (!gameState.isStarted) {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl text-center border-t-8 border-sky-400"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-sky-100 p-4 rounded-full">
              <BookOpen size={48} className="text-sky-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-sky-700 mb-4 tracking-tight">A Ilha do Pirata Tabuada</h1>
          <h2 className="text-xl font-medium text-slate-600 mb-6">Labirintos da Matemática</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Neste episódio do programa "Labirintos da Matemática" você vai explorar a Ilha do Pirata Tabuada! Resolva desafios matemáticos e encontre o tesouro escondido antes que acabe o tempo! Aceita o desafio?
          </p>
          
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                id="playerName"
                type="text" 
                placeholder="Seu nome pirata..."
                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 ${nameError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-sky-400'} focus:ring-0 outline-none transition-all`}
                value={gameState.playerName}
                onChange={(e) => {
                  setNameError(false);
                  setGameState(p => ({ ...p, playerName: e.target.value }));
                }}
              />
              {nameError && (
                <p className="text-rose-500 text-sm mt-2 text-left font-bold px-2">Por favor, digite seu nome pirata para começar!</p>
              )}
            </div>
            
            <button 
              id="startBtn"
              onClick={() => startGame(gameState.playerName)}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 group"
            >
              Começar Aventura
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            {gameState.history.length > 0 && (
              <button 
                id="resumeBtn"
                onClick={() => setGameState(p => ({ ...p, isStarted: true }))}
                className="w-full bg-emerald-50 text-emerald-700 font-bold py-4 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-100 transition-all"
              >
                Continuar Partida Salva
              </button>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-left">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
              <HelpCircle size={16} /> Como Jogar
            </h3>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>• Ganhe ou perca tempo conforme suas escolhas e erros.</li>
              <li>• Use a <span className="font-bold">Lupa</span> ou o <span className="font-bold">Cartão</span> para evitar perdas de 10 min.</li>
              <li>• Algumas rotas fecham quando o tempo fica curto.</li>
              <li>• Chegue ao farol (Número 50) para vencer!</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameState.isGameOver || gameState.finalReached) {
    const finalData = FINALS[gameState.finalReached as keyof typeof FINALS] || FINALS[1];
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center font-sans">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          <div className={`p-8 text-center text-white ${gameState.finalReached === 1 ? 'bg-slate-700' : 'bg-gradient-to-r from-sky-500 to-indigo-600'}`}>
            <div className="flex justify-center mb-4">
              <Trophy size={64} className={gameState.finalReached === 1 ? 'text-slate-400' : 'text-yellow-300'} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{finalData.title}</h1>
            <p className="text-sky-100 font-medium opacity-90">{finalData.condition}</p>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="prose prose-slate bg-slate-50 p-6 rounded-2xl italic text-slate-700">
              {finalData.text}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-sky-600" /> Conquistas Alcançadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(globals).map(([key, value]) => {
                  if (key === 'finals' || !value) return null;
                  const names: any = {
                    rapidoComoRaio: "Rápido(a) como um raio!",
                    contaPerfeita: "Conta Perfeita!",
                    cacadorDeBaus: "Caçador(a) de Baús",
                    amigoDoPapagaio: "Amigo(a) do Papagaio",
                    guardaMapaCooperativo: "Guarda-Mapa Cooperativo",
                    viradaDaMare: "Virada da Maré",
                    exploradorCincoZonas: "Explorador das 5 Zonas",
                    grandeCampeaOuCampeaoPirata: "Grande Campeão Pirata"
                  };
                  return (
                    <div key={key} className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-100 rounded-xl text-sky-800 font-medium text-sm">
                      <CheckCircle2 size={18} className="text-sky-500 shrink-0" />
                      {names[key]}
                      {gameState.achievements[key as keyof typeof gameState.achievements] && (
                        <span className="text-[10px] bg-sky-200 text-sky-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ml-auto">Nesta Partida</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {globals.finals?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Trophy className="text-amber-500" /> Finais Desbloqueados
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4].map(f => (
                    <div key={f} className={`px-4 py-2 rounded-xl font-bold border-2 ${globals.finals.includes(f) ? (f === 1 ? 'border-slate-300 bg-slate-100 text-slate-600' : 'border-amber-300 bg-amber-50 text-amber-700') : 'border-slate-100 bg-slate-50 text-slate-300'}`}>
                      Final {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-100 p-4 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Tempo Restante</div>
                <div className="text-2xl font-bold text-slate-700">{formatTime(gameState.time)}</div>
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">Cenas Visitadas</div>
                <div className="text-2xl font-bold text-slate-700">{Array.from(new Set(gameState.history)).length}</div>
              </div>
            </div>

            <button 
              id="playAgainBtn"
              onClick={() => {
                const newState = { 
                   ...getInitialState(), 
                   playerName: gameState.playerName, 
                   isStarted: true, 
                   history: [1] 
                };
                const node1 = GAME_NODES[1];
                if (node1.onEnter) {
                   setGameState(node1.onEnter(newState));
                } else {
                   setGameState(newState);
                }
              }}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} /> Jogar Novamente
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentNode = GAME_NODES[gameState.currentNode];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header / HUD */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-slate-50 p-2 -ml-2 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <User size={20} />
              </div>
              <span className="font-bold text-slate-700 truncate max-w-[120px] sm:max-w-none">{gameState.playerName}</span>
            </button>
            
            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setGameState(p => ({ ...p, isStarted: false }));
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl text-slate-700 font-bold flex items-center gap-3 transition-colors"
                    >
                      <LogOut size={18} className="text-slate-400" />
                      Tela Inicial
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-white font-bold transition-colors shadow-sm ${getColorByTime(gameState.time)}`}>
              <Timer size={18} />
              <span>{formatTime(gameState.time)}</span>
            </div>
            <button 
              id="resetBtnHeader"
              onClick={resetGame}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              title="Reiniciar"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Status (Hidden on Mobile) */}
        <aside className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Backpack size={14} /> Inventário
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <InventoryIcon has={gameState.items.chaveAzul} icon={<Key size={16} />} label="Chave Azul" />
              <InventoryIcon has={gameState.items.chaveDourada} icon={<Key size={16} />} label="Chave Dourada" color="text-yellow-600" bg="bg-yellow-100" />
              <InventoryIcon has={gameState.items.lupaDosNumeros && !gameState.items.lupaUsada} icon={<Search size={16} />} label="Lupa" />
              <InventoryIcon has={gameState.items.cartaoPulaCorredor && !gameState.items.cartaoUsado} icon={<Zap size={16} />} label="Pula-Corr." />
              <InventoryIcon has={gameState.items.medalhaMatematica} icon={<Trophy size={16} />} label="Medalha" />
              <InventoryIcon has={gameState.items.estrelaBonus} icon={<Star size={16} />} label="Estrela" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapIcon size={14} /> Zonas
            </h3>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D', 'E'].map(l => (
                <div key={l} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${gameState.zones[`zona${l}` as keyof typeof gameState.zones] ? 'bg-sky-500' : 'bg-slate-200'}`} />
                  <span className={`text-xs ${gameState.zones[`zona${l}` as keyof typeof gameState.zones] ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>Zona {l}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Current Node Display */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={gameState.currentNode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                <span className="text-xs font-black text-sky-600 uppercase tracking-widest">Número {gameState.currentNode}</span>
                {currentNode.isErrorCorridor && <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Corredor de Erro</span>}
              </div>

              <div className="p-8">
                <div className="prose prose-slate max-w-none mb-8">
                  {currentNode.text.split('\n').map((line, i) => (
                    <p key={i} className="text-lg text-slate-700 leading-relaxed last:mb-0 mb-4">{line}</p>
                  ))}
                </div>

                {currentNode.challenge && (
                  <div className="bg-sky-50 border-2 border-sky-100 rounded-2xl p-6 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <HelpCircle size={64} />
                    </div>
                    <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Desafio</h4>
                    <p className="text-xl font-bold text-sky-900 leading-snug">{currentNode.challenge}</p>
                  </div>
                )}

                {currentNode.isErrorCorridor && (
                   <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-6 mb-8">
                    <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Info size={14} /> Dica de Pipo
                    </h4>
                    <p className="text-lg text-rose-900 font-medium italic mb-6">"{currentNode.hint}"</p>
                    
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-rose-800/70 font-medium">Como deseja resolver o erro?</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {gameState.items.lupaDosNumeros && !gameState.items.lupaUsada && (
                          <button 
                            id="useLupa"
                            onClick={() => handleErrorResolution('lupa')}
                            className="bg-white border-2 border-emerald-400 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                          >
                             <Search size={18} /> Usar Lupa (.0)
                          </button>
                        )}
                        {gameState.items.cartaoPulaCorredor && !gameState.items.cartaoUsado && (
                          <button 
                            id="useCartao"
                            onClick={() => handleErrorResolution('cartao')}
                            className="bg-white border-2 border-sky-400 text-sky-700 py-3 rounded-xl font-bold hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
                          >
                             <Zap size={18} /> Usar Cartão (.0)
                          </button>
                        )}
                        <button 
                          id="penaltyBtn"
                          onClick={() => handleErrorResolution('none')}
                          className="bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition-all col-span-full"
                        >
                          Tentar de Novo (-10 minutos)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!currentNode.isErrorCorridor && currentNode.choices && (
                  <div className="flex flex-col gap-6">
                    {/* Render action choices (missions, chests) */}
                    {currentNode.choices.filter(c => c.isCorrect === undefined).length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentNode.choices.filter(c => c.isCorrect === undefined).map((choice, i) => {
                          const isExtraMission = choice.label.includes("Missão Extra");
                          const isChest = choice.label.includes("Abrir Baú");
                          
                          let isDisabled = false;
                          let disableReason = "";
                          
                          if (isExtraMission) {
                            if (gameState.currentNode === 14 && (gameState.time <= 3000 || gameState.missions.ajudouPipo)) { isDisabled = true; disableReason = gameState.missions.ajudouPipo ? "Missão concluída" : "Sem tempo suficiente"; }
                            if (gameState.currentNode === 26 && (gameState.time <= 1800 || gameState.missions.ajudouBina)) { isDisabled = true; disableReason = gameState.missions.ajudouBina ? "Missão concluída" : "Sem tempo suficiente"; }
                          }
                          
                          let isChestOpened = false;
                          if (isChest) {
                            if (choice.nextNode === 18 && gameState.chests.bauAzul) isChestOpened = true;
                            if (choice.nextNode === 36 && gameState.chests.bauDourado) isChestOpened = true;
                            if (choice.nextNode === 42 && gameState.chests.bauMares) isChestOpened = true;
                            
                            if (!isChestOpened) {
                              if (choice.nextNode === 18 && !gameState.items.chaveAzul) { isDisabled = true; disableReason = "Requer Chave Azul"; }
                              else if (choice.nextNode === 36 && !gameState.items.chaveDourada) { isDisabled = true; disableReason = "Requer Chave Dourada"; }
                              else if (choice.nextNode === 36 && gameState.time < 1800) { isDisabled = true; disableReason = "Sem tempo suficiente"; }
                              else if (choice.nextNode === 42 && gameState.time < 1800) { isDisabled = true; disableReason = "Sem tempo suficiente"; }
                              else if (choice.nextNode === 42 && gameState.events.modoUltimaChamada) { isDisabled = true; disableReason = "Modo ativado"; }
                            }
                          }

                          if (isChestOpened) {
                             return (
                               <div key={i} className="group text-left p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 flex flex-col justify-between opacity-80">
                                 <div>
                                   <span className="text-[10px] font-black uppercase tracking-widest block mb-1 text-emerald-600">
                                     ✧ Tesouro Aberto
                                   </span>
                                   <span className="font-bold text-emerald-900 line-through truncate block">
                                     {choice.label.replace(" (Requer Chave)", "")}
                                   </span>
                                 </div>
                                 <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-bold">
                                   <CheckCircle2 size={14} /> Aberto com sucesso
                                 </div>
                               </div>
                             );
                          }

                          return (
                            <button 
                              key={i}
                              onClick={() => { if (!isDisabled) handleChoice(choice.nextNode); }}
                              disabled={isDisabled}
                              className={`
                                group text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between
                                ${isDisabled 
                                  ? 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed' 
                                  : isExtraMission 
                                    ? 'border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 cursor-pointer' 
                                    : isChest 
                                      ? 'border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-300 cursor-pointer' 
                                      : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-sky-300 hover:shadow-lg cursor-pointer'}
                              `}
                            >
                              <div>
                                <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isDisabled ? 'text-slate-400' : isExtraMission ? 'text-amber-500' : isChest ? 'text-sky-500' : 'text-slate-400'}`}>
                                  {isExtraMission ? '✦ Missão Extra' : isChest ? '✧ Tesouro' : `Ação`}
                                </span>
                                <span className={`font-bold ${isDisabled ? 'text-slate-500' : 'text-slate-800'} line-clamp-2 leading-tight`}>{choice.label}</span>
                              </div>
                              <div className="mt-2 flex self-end w-full">
                                {isDisabled ? (
                                  <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md">
                                    <XCircle size={12} /> {disableReason}
                                  </span>
                                ) : (
                                  <ChevronRight className={`transition-transform grow-0 shrink-0 self-end ml-auto ${isExtraMission ? 'text-amber-400 group-hover:translate-x-1' : isChest ? 'text-sky-400 group-hover:translate-x-1' : 'text-slate-300 group-hover:translate-x-1 group-hover:text-sky-500'}`} />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Render text input field for challenge choices */}
                    {currentNode.choices.filter(c => c.isCorrect !== undefined).length > 0 && (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const extractNumber = (str: string) => str.replace(/\D/g, '');
                          const typedVal = extractNumber(challengeInput);
                          if (!typedVal) return;
                          
                          const challengeChoices = currentNode.choices!.filter(c => c.isCorrect !== undefined);
                          const matchedChoice = challengeChoices.find(c => extractNumber(c.label) === typedVal);
                          
                          setChallengeInput("");
                          
                          if (matchedChoice) {
                            handleChoice(matchedChoice.nextNode);
                          } else {
                            const firstIncorrect = challengeChoices.find(c => !c.isCorrect);
                            if (firstIncorrect) handleChoice(firstIncorrect.nextNode);
                          }
                        }}
                        className="mt-4 p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl"
                      >
                        <h4 className="text-sm font-bold text-slate-700 mb-4 block">Digite a sua resposta numérica:</h4>
                        <div className="flex gap-3">
                          <input 
                            type="number"
                            placeholder="Resposta..."
                            value={challengeInput}
                            onChange={e => setChallengeInput(e.target.value)}
                            className="flex-1 py-3 px-4 border-2 border-slate-300 focus:border-sky-500 rounded-xl outline-none font-bold text-lg"
                          />
                          <button 
                            type="submit"
                            className="bg-sky-600 font-bold hover:bg-sky-700 text-white px-8 py-3 rounded-xl transition-colors shadow-md disabled:opacity-50"
                            disabled={!challengeInput.trim()}
                          >
                            Enviar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {!currentNode.isErrorCorridor && !currentNode.choices && currentNode.id !== 50 && (
                   <div className="flex justify-center mt-4">
                      <button 
                         id="continueBtn"
                         onClick={() => navigateTo(currentNode.autoReturnNode || 1)}
                         className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2"
                      >
                         Continuar Aventura <ChevronRight size={18} />
                      </button>
                   </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick HUD for Mobile */}
          <div className="lg:hidden grid grid-cols-3 gap-3">
             <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Missões</div>
                <div className="text-sm font-bold text-slate-700">{Math.floor(((gameState.missions.ajudouPipo ? 1 : 0) + (gameState.missions.ajudouBina ? 1 : 0)) / 2 * 100)}%</div>
             </div>
             <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Baús</div>
                <div className="text-sm font-bold text-slate-700">{Object.values(gameState.chests).filter(Boolean).length}/3</div>
             </div>
             <button 
                id="inventoryMobileBtn"
                onClick={() => setShowInventory(!showInventory)}
                className="bg-sky-600 text-white rounded-xl p-3 shadow-md shadow-sky-100 font-bold text-sm"
             >
                Mochila
             </button>
          </div>
        </div>
      </main>

      {/* Inventory Modal for Mobile */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowInventory(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Sua Mochila</h3>
                <button onClick={() => setShowInventory(false)} className="text-slate-400 p-2"><XCircle /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InventoryIcon has={gameState.items.chaveAzul} icon={<Key size={20} />} label="Chave Azul" />
                <InventoryIcon has={gameState.items.chaveDourada} icon={<Key size={20} />} label="Chave Dourada" color="text-yellow-600" bg="bg-yellow-100" />
                <InventoryIcon has={gameState.items.lupaDosNumeros && !gameState.items.lupaUsada} icon={<Search size={20} />} label="Lupa" />
                <InventoryIcon has={gameState.items.cartaoPulaCorredor && !gameState.items.cartaoUsado} icon={<Zap size={20} />} label="Cartão" />
                <InventoryIcon has={gameState.items.medalhaMatematica} icon={<Trophy size={20} />} label="Medalha" />
                <InventoryIcon has={gameState.items.estrelaBonus} icon={<Star size={20} />} label="Estrela" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Confirm Modal */}
      <AnimatePresence>
        {showConfirmReset && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowConfirmReset(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-center"
            >
               <h3 className="text-xl font-bold text-slate-800 mb-2">Reiniciar Aventura?</h3>
               <p className="text-slate-500 mb-6">Todo o seu progresso da aventura atual será perdido, exceto as conquistas e finais memorizados.</p>
               <div className="flex gap-3">
                  <button 
                     onClick={() => setShowConfirmReset(false)}
                     className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                     Cancelar
                  </button>
                  <button 
                     onClick={confirmResetGame}
                     className="flex-1 px-4 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors"
                  >
                     Reiniciar
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-6 text-center text-slate-400 text-xs font-medium px-4">
        <p>Este aplicativo foi criada a partir do livro-jogo “Labirintos da Matemática: A Ilha do Pirata Tabuada” de Rodrigo Mota Narcizo.</p>
        <p className="mt-1">Aplicativo criado por Rodrigo Narcizo com o Google AI Studio.</p>
      </footer>
    </div>
  );
}

function InventoryIcon({ has, icon, label, color = "text-sky-600", bg = "bg-sky-50" }: { has: boolean, icon: any, label: string, color?: string, bg?: string }) {
  return (
    <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${has ? `${bg} border-sky-100 shadow-sm` : 'bg-slate-50 border-slate-100 grayscale opacity-40'}`}>
      <div className={has ? color : 'text-slate-300'}>{icon}</div>
      <span className="text-[10px] font-bold text-center leading-tight truncate w-full">{label}</span>
    </div>
  );
}
