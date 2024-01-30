interface IShowResult {
  show: {
    id: number;
    name: string;
    summary: string;
    image?: {
      medium?: string;
    }
  }
}

interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

interface IEpisode {
  id: number;
  name: string;
  season: number;
  number: number;
}

export {
  type IShowResult,
  type IShow,
  type IEpisode,
}