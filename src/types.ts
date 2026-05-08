
export enum Zone {
  ZonaA = "Zona A: Praia dos Coqueiros Contadores",
  ZonaB = "Zona B: Ponte dos Grupos Iguais",
  ZonaC = "Zona C: Mercado dos Mapas Divididos",
  ZonaD = "Zona D: Cavernas Brilhantes da Tabuada",
  ZonaE = "Zona E: Farol do Tesouro Cooperativo",
}

export interface Choice {
  label: string;
  nextNode: number;
  isCorrect?: boolean;
}

export interface GameNode {
  id: number;
  text: string;
  challenge?: string;
  choices?: Choice[];
  isErrorCorridor?: boolean;
  autoReturnNode?: number;
  hint?: string;
  onEnter?: (state: any) => any;
}

export interface GameState {
  playerName: string;
  currentNode: number;
  time: number;
  items: {
    chaveAzul: boolean;
    chaveDourada: boolean;
    lupaDosNumeros: boolean;
    lupaUsada: boolean;
    estrelaBonus: boolean;
    medalhaMatematica: boolean;
    dicaFinal: boolean;
    cartaoPulaCorredor: boolean;
    cartaoUsado: boolean;
    seloDeAjuda: boolean;
  };
  chests: {
    bauAzul: boolean;
    bauDourado: boolean;
    bauMares: boolean;
  };
  events: {
    avisoMareBaixa: boolean;
    rodadaRelampago: boolean;
    modoUltimaChamada: boolean;
  };
  zones: {
    zonaA: boolean;
    zonaB: boolean;
    zonaC: boolean;
    zonaD: boolean;
    zonaE: boolean;
  };
  missions: {
    ajudouPipo: boolean;
    ajudouBina: boolean;
    encontrouDicaFinal: boolean;
  };
  achievements: {
    rapidoComoRaio: boolean;
    contaPerfeita: boolean;
    cacadorDeBaus: boolean;
    amigoDoPapagaio: boolean;
    guardaMapaCooperativo: boolean;
    viradaDaMare: boolean;
    exploradorCincoZonas: boolean;
    grandeCampeaOuCampeaoPirata: boolean;
  };
  errorCorridorsVisited: number;
  history: number[];
  isStarted: boolean;
  isGameOver: boolean;
  finalReached: number | null;
}
