import { GameNode, Zone } from './types';

export const GAME_NODES: Record<number, GameNode> = {
  1: {
    id: 1,
    text: "A música do programa toca como um tambor de festa. A areia é clara, o mar é azul e as bandeirinhas do Labirinto da Matemática balançam entre os coqueiros. A Capitã Nara Números aponta para a praia da Ilha do Pirata Tabuada. No alto de uma placa de madeira, está escrito: 'Todo tesouro começa com uma conta bem conferida'. \n— Bem-vindo ao labirinto! Aqui ninguém caça tesouro sozinho. A melhor conta é a conta conferida!",
    challenge: "Pipo, o papagaio contador, pousa numa jangada e mostra 4 jangadas enfileiradas. Cada jangada tem 2 remos. Quantos remos há ao todo?",
    choices: [
      { label: "4 remos", nextNode: 4, isCorrect: false },
      { label: "6 remos", nextNode: 6, isCorrect: false },
      { label: "8 remos", nextNode: 8, isCorrect: true },
      { label: "10 remos", nextNode: 10, isCorrect: false }
    ],
    onEnter: (s) => ({ ...s, zones: { ...s.zones, zonaA: true } })
  },
  2: {
    id: 2,
    text: "A caverna mostra dois desenhos grandes: um lado da ponte e o outro lado da ponte. Os cristais piscam, avisando que você contou só os lados, não as tochas.",
    isErrorCorridor: true,
    hint: "Dica: em problemas de grupos iguais, conte quantos itens há em cada grupo.",
    autoReturnNode: 32
  },
  3: {
    id: 3,
    text: "Você entra em uma fenda estreita. O eco dos cristais repete o número errado, como se a própria caverna pedisse uma revisão.",
    isErrorCorridor: true,
    hint: "Dica: em uma divisão por 2, pense em duas partes iguais.",
    autoReturnNode: 42
  },
  4: {
    id: 4,
    text: "Uma placa de bambu aparece na areia. \n— Você contou só as jangadas! \nPipo bate as asas e aponta para os remos. \n— Jangadas não são remos. Veja quantos remos há em cada jangada!",
    isErrorCorridor: true,
    hint: "Dica: Pense que cada uma das 4 jangadas tem 2 remos.",
    autoReturnNode: 1
  },
  5: {
    id: 5,
    text: "Você entrou no Corredor do Quase. A ilha mostra que a conta ficou perto, mas precisa de revisão.",
    isErrorCorridor: true,
    hint: "Dica: Bina apagou 5 marcas repetidas de um total de 39. Quantas sobraram?",
    autoReturnNode: 28
  },
  6: {
    id: 6,
    text: "Você segue por uma trilha de conchas. A trilha dá uma volta na areia e retorna ao começo, como se dissesse: 'confira de novo'. Nara diz: \n— Foi uma conta apressada. Tente formar os grupos.",
    isErrorCorridor: true,
    hint: "Dica: Conte de 2 em 2 para cada jangada.",
    autoReturnNode: 1
  },
  7: {
    id: 7,
    text: "Uma gaivota aponta para um número que parece certo. Mas ela misturou soma com multiplicação.",
    isErrorCorridor: true,
    hint: "Dica: 11 grupos de 4 não é 11 + 4. Conte de 4 em 4.",
    autoReturnNode: 38
  },
  8: {
    id: 8,
    text: "Você atravessa a primeira porta correta. A plateia bate palmas com chocalhos de concha, e Pipo faz uma pirueta no ar. À frente, uma passarela comprida liga a praia à ponte. O mar passa por baixo dela, brilhando como vidro azul. A travessia é segura, mas demora um pouco.",
    challenge: "Na entrada da ponte há 2 mastros. Cada mastro tem 7 bandeirinhas coloridas. Quantas bandeirinhas há ao todo?",
    choices: [
      { label: "11 bandeirinhas", nextNode: 11, isCorrect: false },
      { label: "13 bandeirinhas", nextNode: 13, isCorrect: false },
      { label: "14 bandeirinhas", nextNode: 14, isCorrect: true },
      { label: "16 bandeirinhas", nextNode: 16, isCorrect: false }
    ],
    onEnter: (s) => (s.history.filter(n => n === 8).length === 1 ? { ...s, time: s.time - 600 } : s)
  },
  9: {
    id: 9,
    text: "Você contou uma parte do pedido de Pipo, mas não juntou os dois sacos de conchas.",
    isErrorCorridor: true,
    hint: "Dica: se são 2 sacos com 11 conchas em cada saco, pense em 11 + 11.",
    autoReturnNode: 12
  },
  10: {
    id: 10,
    text: "A areia forma uma seta de volta para as jangadas. Téo Veloz coça a cabeça e ri de si mesmo. \n— Você colocou remos a mais. Eu também faço isso quando corro demais.",
    isErrorCorridor: true,
    hint: "Dica: Tente contar novamente com calma.",
    autoReturnNode: 1
  },
  11: {
    id: 11,
    text: "A ponte range de leve e devolve você ao começo dela. As bandeirinhas balançam, como se pedissem uma nova contagem.",
    isErrorCorridor: true,
    hint: "Dica: tente dobrar 7. Dobrar é fazer 2 grupos iguais.",
    autoReturnNode: 8
  },
  12: {
    id: 12,
    text: "Pipo está diante de duas cestinhas de conchas azuis. A ponte precisa de enfeites antes que a maré baixe. \n— Preciso separar as conchas para decorar a ponte antes que a maré baixe!",
    challenge: "Pipo tem 2 sacos. Cada saco tem 11 conchas. Quantas conchas há ao todo?",
    choices: [
      { label: "9 conchas", nextNode: 9, isCorrect: false },
      { label: "21 conchas", nextNode: 21, isCorrect: false },
      { label: "22 conchas", nextNode: 22, isCorrect: true },
      { label: "23 conchas", nextNode: 23, isCorrect: false }
    ],
    onEnter: (s) => ({ ...s, time: s.time - 600 })
  },
  13: {
    id: 13,
    text: "Você pisa em uma tábua que gira devagar. Ela mostra uma palavra pintada em azul: revise.",
    isErrorCorridor: true,
    hint: "Dica: 7 + 7 chega a uma dezena e mais algumas unidades. Conte com calma.",
    autoReturnNode: 8
  },
  14: {
    id: 14,
    text: "Você chega à Ponte dos Grupos Iguais. A madeira é firme, mas balança de leve. Em cada canto há redes, conchas e placas com desenhos de grupos.",
    challenge: "No centro da ponte há 5 redes penduradas. Cada rede tem 4 peixinhos de madeira. Quantos peixinhos há ao todo?",
    choices: (() => {
      return [
        { label: "Ajudar Pipo (Missão Extra)", nextNode: 12 },
        { label: "15 peixinhos", nextNode: 15, isCorrect: false },
        { label: "19 peixinhos", nextNode: 19, isCorrect: false },
        { label: "20 peixinhos", nextNode: 20, isCorrect: true },
        { label: "24 peixinhos", nextNode: 24, isCorrect: false }
      ];
    })(),
    onEnter: (s) => {
      let newState = { ...s, zones: { ...s.zones, zonaB: true } };
      if (s.time <= 3600) newState.events.avisoMareBaixa = true;
      return newState;
    }
  },
  15: {
    id: 15,
    text: "Você contou algumas redes, mas não todas. Os peixinhos de madeira parecem esperar uma nova contagem.",
    isErrorCorridor: true,
    hint: "Dica: são 5 grupos iguais. Cada grupo tem 4 peixinhos.",
    autoReturnNode: 14
  },
  16: {
    id: 16,
    text: "A ponte leva você até uma bandeira extra. Ela é bonita, mas não fazia parte da conta. Pipo diz: \n— Bandeira extra é bonita, mas não entra no total!",
    isErrorCorridor: true,
    hint: "Dica: Conte os dois mastros com 7 bandeiras cada.",
    autoReturnNode: 8
  },
  17: {
    id: 17,
    text: "Você chegou a um número pequeno demais para todos os remos dos barcos. Um dos barcos fica sem remar, e isso mostra que faltou contar um grupo.",
    isErrorCorridor: true,
    hint: "Dica: pense em 4 grupos com 8 em cada grupo.",
    autoReturnNode: 26
  },
  18: {
    id: 18,
    text: "Você encontra o Baú Azul em uma barraca de mapas. Ele é pequeno, pintado com ondas, e parece guardar uma ferramenta de conferência.",
    onEnter: (s) => {
      if (!s.items.chaveAzul) return s;
      let cost = (s.time <= 2400) ? 600 : 0;
      return { 
        ...s, 
        time: s.time - cost,
        items: { ...s.items, lupaDosNumeros: true },
        chests: { ...s.chests, bauAzul: true },
        achievements: { ...s.achievements, cacadorDeBaus: true }
      };
    },
    choices: [{ label: "Voltar para o Mercado", nextNode: 20 }]
  },
  19: {
    id: 19,
    text: "O tapete da ponte escorrega e faz você voltar alguns passos. A ponte não está brava. Ela só quer que a conta fique completa.",
    isErrorCorridor: true,
    hint: "Dica: 5 grupos de 4 podem ser pensados como 4 + 4 + 4 + 4 + 4.",
    autoReturnNode: 14
  },
  20: {
    id: 20,
    text: "Você chega ao Mercado dos Mapas Divididos. O lugar é cheio de barracas, tecidos coloridos e rolos de mapas. Cada vendedor parece saber uma parte diferente do caminho.",
    challenge: "Bina, a guardiã dos mapas, entrega 2 sacolas iguais. Cada sacola deve receber 13 moedas de brinquedo. Quantas moedas são necessárias ao todo?",
    choices: [
      { label: "Abrir Baú Azul (Requer Chave)", nextNode: 18 },
      { label: "25 moedas", nextNode: 25, isCorrect: false },
      { label: "26 moedas", nextNode: 26, isCorrect: true },
      { label: "27 moedas", nextNode: 27, isCorrect: false },
      { label: "29 moedas", nextNode: 29, isCorrect: false }
    ],
    onEnter: (s) => {
      let newState = { ...s, zones: { ...s.zones, zonaC: true } };
      if (s.history.filter(n => n === 20).length === 1) newState.time -= 600;
      return newState;
    }
  },
  21: {
    id: 21,
    text: "Você quase completou as conchas de Pipo, mas ficou faltando uma. O enfeite da ponte ainda não forma a seta correta.",
    isErrorCorridor: true,
    hint: "Dica: quando são 2 grupos iguais de 11, some 11 duas vezes.",
    autoReturnNode: 12
  },
  22: {
    id: 22,
    text: "Pipo organiza as conchas em uma seta brilhante. A ponte fica mais bonita, e a seta aponta para o caminho certo. \n— Conta conferida! Você salvou a decoração da ponte!",
    onEnter: (s) => ({
      ...s,
      items: { ...s.items, chaveAzul: true, seloDeAjuda: true },
      missions: { ...s.missions, ajudouPipo: true },
      achievements: { ...s.achievements, amigoDoPapagaio: true }
    }),
    choices: [{ label: "Voltar para a Ponte", nextNode: 14 }]
  },
  23: {
    id: 23,
    text: "Você colocou uma concha a mais no enfeite. Pipo sorri, mas aponta para o saco que sobrou. \n— Melhor sobrar alegria do que faltar coragem. Mas, na conta, precisamos ser exatos.",
    isErrorCorridor: true,
    hint: "Dica: Tente somar 11 + 11.",
    autoReturnNode: 12
  },
  24: {
    id: 24,
    text: "A ponte mostra quatro peixinhos extras em um desenho. Eles são lindos, mas não estavam nas redes.",
    isErrorCorridor: true,
    hint: "Dica: conte só os peixinhos das 5 redes.",
    autoReturnNode: 14
  },
  25: {
    id: 25,
    text: "Você separou quase todas as moedas, mas uma sacola ficou faltando uma moeda. As duas sacolas precisam ficar iguais.",
    isErrorCorridor: true,
    hint: "Dica: se são 2 sacolas com 13 em cada uma, dobre 13.",
    autoReturnNode: 20
  },
  26: {
    id: 26,
    text: "Bina abre um mapa com linhas azuis e douradas. O papel tem marcas antigas, como se muitas equipes já tivessem passado por ali.",
    challenge: "Quatro barcos de apoio estão presos no cais. Cada barco tem 8 remos guardados. Quantos remos há ao todo?",
    choices: [
      { label: "Ajudar Bina (Missão Extra)", nextNode: 28 },
      { label: "17 remos", nextNode: 17, isCorrect: false },
      { label: "30 remos", nextNode: 30, isCorrect: false },
      { label: "31 remos", nextNode: 31, isCorrect: false },
      { label: "32 remos", nextNode: 32, isCorrect: true }
    ],
    onEnter: (s) => s
  },
  27: {
    id: 27,
    text: "Você colocou uma moeda a mais na conta do mercado. Bina ajeita as sacolas lado a lado. \n— Boa tentativa. Agora confira se as duas sacolas têm a mesma quantidade.",
    isErrorCorridor: true,
    hint: "Dica: Verifique se 13 + 13 resulta no seu número.",
    autoReturnNode: 20
  },
  28: {
    id: 28,
    text: "Bina mostra um mapa rasgado em duas partes. Uma metade tem marcas de pegadas. A outra metade tem uma trilha que parece levar a um baú escondido. \n— Se você me ajudar, vou indicar um baú importante nas cavernas.",
    challenge: "No mapa havia 39 marcas de pegadas. Bina apagou 5 marcas repetidas. Quantas marcas corretas sobraram no mapa?",
    choices: [
      { label: "5 marcas", nextNode: 5, isCorrect: false },
      { label: "33 marcas", nextNode: 33, isCorrect: false },
      { label: "34 marcas", nextNode: 34, isCorrect: true },
      { label: "35 marcas", nextNode: 35, isCorrect: false }
    ],
    onEnter: (s) => ({ ...s, time: s.time - 600 })
  },
  29: {
    id: 29,
    text: "Você distribuiu moedas como se houvesse uma sacola extra escondida. Mas a mesa de Bina mostra apenas duas sacolas.",
    isErrorCorridor: true,
    hint: "Dica: a conta fala de 2 sacolas, não de 3.",
    autoReturnNode: 20
  },
  30: {
    id: 30,
    text: "Um barco ficou com remos faltando. Sem todos os remos, a travessia não fica bem organizada.",
    isErrorCorridor: true,
    hint: "Dica: são 4 barcos. Cada barco tem 8 remos. Você pode contar 8, 16, 24...",
    autoReturnNode: 26
  },
  31: {
    id: 31,
    text: "Você chegou bem perto, mas um remo ficou perdido na areia. A conta precisa de todos os grupos.",
    isErrorCorridor: true,
    hint: "Dica: depois de 24, ainda falta somar mais um grupo de 8.",
    autoReturnNode: 26
  },
  32: {
    id: 32,
    text: "Você entra nas Cavernas Brilhantes da Tabuada. O ar fica mais fresco, e os cristais iluminam as paredes com reflexos azuis, verdes e dourados. Marque a Zona D: Cavernas Brilhantes da Tabuada.",
    challenge: "Na parede da caverna há 2 lados iluminados. Cada lado tem 19 tochas. Quantas tochas há ao todo?",
    choices: [
      { label: "Abrir Baú Dourado (Requer Chave)", nextNode: 36 },
      { label: "2 tochas", nextNode: 2, isCorrect: false },
      { label: "37 tochas", nextNode: 37, isCorrect: false },
      { label: "38 tochas", nextNode: 38, isCorrect: true },
      { label: "39 tochas", nextNode: 39, isCorrect: false }
    ],
    onEnter: (s) => {
      let newState = { ...s, zones: { ...s.zones, zonaD: true } };
      if (s.history.filter(n => n === 32).length === 1) newState.time -= 600;
      if (newState.time <= 2400) {
        newState.events.rodadaRelampago = true;
        newState.achievements.rapidoComoRaio = false;
      }
      return newState;
    }
  },
  33: {
    id: 33,
    text: "Uma parte do mapa ficou apagada demais. Bina segura o papel contra a luz para você ver melhor.",
    isErrorCorridor: true,
    hint: "Dica: 39 menos 5 não fica tão longe de 39. Volte um passo na contagem.",
    autoReturnNode: 28
  },
  34: {
    id: 34,
    text: "Bina encaixa as duas partes do mapa. As linhas azuis e douradas se unem, revelando uma trilha que antes parecia invisível. \n— Agora sim! Este mapa mostra onde fica o Baú Dourado.",
    onEnter: (s) => ({
      ...s,
      items: { ...s.items, chaveDourada: true, dicaFinal: true },
      missions: { ...s.missions, ajudouBina: true, encontrouDicaFinal: true },
      achievements: { ...s.achievements, guardaMapaCooperativo: true }
    }),
    choices: [{ label: "Ir para as Cavernas", nextNode: 26 }]
  },
  35: {
    id: 35,
    text: "Você apagou marcas de menos no mapa. Bina aponta para duas pegadas repetidas que ainda ficaram no papel. \n— Essas aqui não contam. Vamos revisar com calma.",
    isErrorCorridor: true,
    hint: "Dica: 39 - 5.",
    autoReturnNode: 28
  },
  36: {
    id: 36,
    text: "O Baú Dourado tem uma fechadura em forma de multiplicação. Ele brilha pouco, como se esperasse uma decisão importante.",
    onEnter: (s) => {
      if (!s.items.chaveDourada || s.time < 1800) return s;
      return {
        ...s,
        time: s.time - 600,
        items: { ...s.items, medalhaMatematica: true },
        chests: { ...s.chests, bauDourado: true },
        achievements: { ...s.achievements, cacadorDeBaus: true }
      };
    },
    choices: [{ label: "Voltar para as Cavernas", nextNode: 32 }]
  },
  37: {
    id: 37,
    text: "Você esqueceu uma tocha no final da fileira. A parede fica quase toda acesa, mas uma luz ainda falta.",
    isErrorCorridor: true,
    hint: "Dica: se há 19 tochas de um lado e 19 do outro, pense em 20 + 20 e depois ajuste.",
    autoReturnNode: 32
  },
  38: {
    id: 38,
    text: "Você avança pela caverna até uma ponte de cristais. A ponte reflete pequenas luzes no chão, como se fosse um caminho de estrelas.",
    challenge: "Onze barris de banana de brinquedo esperam os papagaios da equipe. Cada barril tem 4 bananas. Quantas bananas há ao todo?",
    choices: [
      { label: "Explorar Brilho Azul (Baú das Marés)", nextNode: 42 },
      { label: "7 bananas", nextNode: 7, isCorrect: false },
      { label: "40 bananas", nextNode: 40, isCorrect: false },
      { label: "44 bananas", nextNode: 44, isCorrect: true },
      { label: "48 bananas", nextNode: 48, isCorrect: false }
    ],
    onEnter: (s) => {
      let newState = { ...s };
      if (s.time <= 1200) newState.events.modoUltimaChamada = true;
      return newState;
    }
  },
  39: {
    id: 39,
    text: "Você acendeu uma tocha imaginária a mais. A luz extra fica bonita, mas não estava no problema. Nara diz: \n— Luz é ótima. Mas, na matemática, a gente conta só o que está no problema.",
    isErrorCorridor: true,
    hint: "Dica: 19 + 19.",
    autoReturnNode: 32
  },
  40: {
    id: 40,
    text: "Você contou quase todos os barris, mas deixou algumas bananas de fora. Os papagaios olham para os barris que faltaram.",
    isErrorCorridor: true,
    hint: "Dica: 11 grupos de 4 pode ser resolvido contando de 4 em 4 até chegar ao 11º grupo.",
    autoReturnNode: 38
  },
  41: {
    id: 41,
    text: "A caverna ecoa um número menor que a metade correta. Os cristais azuis parecem pedir uma divisão mais equilibrada.",
    isErrorCorridor: true,
    hint: "Dica: metade de 92 é maior que 40. Pense em metade de 90 e metade de 2.",
    autoReturnNode: 42
  },
  42: {
    id: 42,
    text: "Você encontra o Baú das Marés, protegido por cristais azuis. O brilho dele sobe e desce como uma onda pequena.",
    challenge: "Dentro da fechadura há uma conta de partilha. São 92 cristais divididos igualmente em 2 sacos. Quantos cristais ficam em cada saco?",
    choices: [
      { label: "3 cristais", nextNode: 3, isCorrect: false },
      { label: "41 cristais", nextNode: 41, isCorrect: false },
      { label: "46 cristais", nextNode: 46, isCorrect: true },
      { label: "47 cristais", nextNode: 47, isCorrect: false }
    ],
    onEnter: (s) => {
      if (s.time < 1800 || s.events.modoUltimaChamada) return s;
      return { ...s, time: s.time - 600 };
    }
  },
  43: {
    id: 43,
    text: "A porta do farol não abre. Você formou grupos quase certos, mas esqueceu uma equipe.",
    isErrorCorridor: true,
    hint: "Dica: no desafio final, são 5 equipes inteiras de 10 passos cada.",
    autoReturnNode: 44
  },
  44: {
    id: 44,
    text: "Você chega ao Farol do Tesouro Cooperativo. O vento é mais forte aqui, mas o caminho está claro. Lá embaixo, é possível ver todas as zonas da ilha por onde você passou. Marque a Zona E: Farol do Tesouro Cooperativo. O farol ilumina uma porta enorme com o símbolo do Labirinto da Matemática. ",
    challenge: "Na ponte final, 5 equipes de crianças dão 10 passos cada uma para formar uma trilha de conchas. Quantos passos são dados ao todo?",
    choices: [
      { label: "43 passos", nextNode: 43, isCorrect: false },
      { label: "45 passos", nextNode: 45, isCorrect: false },
      { label: "49 passos", nextNode: 49, isCorrect: false },
      { label: "50 passos", nextNode: 50, isCorrect: true }
    ],
    onEnter: (s) => ({ ...s, zones: { ...s.zones, zonaE: true } })
  },
  45: {
    id: 45,
    text: "A porta quase abre, mas falta uma parte do desenho de conchas. A trilha final ainda não está completa.",
    isErrorCorridor: true,
    hint: "Dica: 5 equipes com 10 passos cada formam uma conta de grupos iguais.",
    autoReturnNode: 44
  },
  46: {
    id: 46,
    text: "O Baú das Marés se abre com um som de bolhas felizes. Uma luz azul passa pelas paredes da caverna e mostra um caminho mais seguro. Dentro dele há uma estrela feita de concha e um cartão azul.",
    onEnter: (s) => ({
      ...s,
      items: { ...s.items, estrelaBonus: true, cartaoPulaCorredor: true },
      chests: { ...s.chests, bauMares: true },
      achievements: { ...s.achievements, cacadorDeBaus: true }
    }),
    choices: [{ label: "Voltar para o caminho principal", nextNode: 38 }]
  },
  47: {
    id: 47,
    text: "Você deixou um cristal a mais em um dos sacos. A balança de conchas inclina um pouco.",
    isErrorCorridor: true,
    hint: "Dica: se a divisão é igual, os dois sacos precisam ter a mesma quantidade.",
    autoReturnNode: 42
  },
  48: {
    id: 48,
    text: "Você contou bananas extras pintadas na parede da caverna. Elas eram parte da decoração, não dos barris.",
    isErrorCorridor: true,
    hint: "Dica: conte apenas 11 barris com 4 bananas em cada um.",
    autoReturnNode: 38
  },
  49: {
    id: 49,
    text: "A porta do farol brilha, mas ainda não destrava. O desenho de conchas fica quase completo. Téo diz: \n— Foi por pouco! Vamos conferir o último grupo.",
    isErrorCorridor: true,
    hint: "Dica: 5 x 10.",
    autoReturnNode: 44
  },
  50: {
    id: 50,
    text: "A porta do farol se abre devagar. Uma luz quente sai lá de dentro, e a música do programa volta a tocar, agora mais calma e alegre. Lá dentro não há ouro perigoso nem maldição. Há um palco colorido, medalhas de brincadeira, mapas pendurados e um grande painel com a frase: 'Tesouro encontrado: estratégia, cooperação e contas conferidas!'",
    onEnter: (s) => {
      let newState = { ...s, isGameOver: true };
      
      // Conquista: Explorador das Cinco Zonas
      if (Object.values(s.zones).every(z => z)) {
        newState.achievements.exploradorCincoZonas = true;
      }
      
      // Conquista: Rápido como um raio
      if (s.time >= 1800 && !s.events.rodadaRelampago) {
        newState.achievements.rapidoComoRaio = true;
      }

      // Conquista: Virada da Maré
      if (s.errorCorridorsVisited >= 2) {
        newState.achievements.viradaDaMare = true;
      }

      // Cálculo do Final
      let final = 2; // Default Final 2
      if (s.time >= 1200) {
        final = 3; // Final 3
        const missionCompleted = s.missions.ajudouPipo || s.missions.ajudouBina;
        const rewards = s.items.medalhaMatematica || s.items.estrelaBonus;
        if (missionCompleted && rewards) {
          final = 4; // Final 4
          newState.achievements.grandeCampeaOuCampeaoPirata = true;
        }
      } else if (s.time >= 0 && s.time < 1200) {
        final = 2;
      }

      newState.finalReached = final;
      return newState;
    }
  }
};

export const FINALS = {
  1: {
    title: "Final 1 — Participante Persistente",
    condition: "Seu Tempo chegou a 0 antes de você alcançar o número 50.",
    text: "A buzina do programa toca baixinho, como um aviso gentil. As luzes da ilha não se apagam de uma vez. Elas apenas diminuem, como se dissessem: 'por hoje, o caminho fechou'. Capitã Nara se aproxima com um sorriso e aponta para o mapa que você construiu durante a partida. \n— A ilha fechou as pontes por hoje, mas você já conhece melhor o caminho. Participante persistente volta mais forte! \nPipo entrega um adesivo de treino com a frase: 'Será melhor da próxima vez!' \nVocê não encontrou a saída a tempo nesta partida. Mesmo assim, aprendeu caminhos, reconheceu armadilhas de conta e pode tentar de novo com uma estratégia melhor."
  },
  2: {
    title: "Final 2 — Fuga no Último Segundo",
    condition: "Você chegou ao número 50 com 10 minutos de Tempo restante.",
    text: "A porta abre no último instante. As luzes do palco piscam, Pipo gira no ar e Téo Veloz quase derruba o próprio chapéu de tanta comemoração. A maré já estava perto da ponte, e o relógio do programa marcava os últimos minutos. Mesmo assim, você conferiu a conta final e encontrou a saída. Nara diz: \n— Foi por um fio! Mas foi uma vitória! \nVocê escapou da ilha no limite. Talvez não tenha dado tempo de abrir muitos baús, mas suas contas levaram você até a saída. Vitória emocionante!"
  },
  3: {
    title: "Final 3 — Vitória Matemática",
    condition: "Você chegou ao número 50 com 20 minutos ou mais de Tempo restantes, mas não cumpriu a condição do Final 4.",
    text: "A porta do farol se abre com calma. Você atravessa com Tempo suficiente para olhar o caminho que percorreu: a praia, a ponte, o mercado, as cavernas e o farol. Capitã Nara anuncia para a plateia: \n— Vitória Matemática! Você usou estratégia, resolveu desafios e chegou à saída com segurança. \nPipo entrega uma fita azul de conclusão. Ela não é o maior tesouro da ilha, mas mostra uma coisa importante: você chegou ao fim usando as contas certas."
  },
  4: {
    title: "Final 4 — Grande Campeã ou Grande Campeão Pirata",
    condition: "Você chegou ao número 50 com 20 minutos ou mais de Tempo restantes, completou pelo menos uma missão extra e conquistou Medalha Matemática ou Estrela Bônus.",
    text: "O palco inteiro acende. As bandeiras da ilha sobem, os mapas se desenrolam e os baús abertos brilham como boas estratégias. A plateia do programa faz uma contagem regressiva. Pipo pousa perto da medalha em forma de bússola, e Bina abre o mapa final para mostrar todos os caminhos que você escolheu. Capitã Nara levanta o microfone: \n— Temos uma grande campeã ou um grande campeão dos bônus! Não foi só velocidade. Foi escolha, ajuda, exploração e conta conferida. \nPipo entrega uma medalha em forma de bússola. Parabéns!"
  }
};
