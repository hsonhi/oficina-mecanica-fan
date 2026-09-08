export type Material = {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
};

export type Mechanic = {
    id: number;
    nome: string;
    telefone: number;
};

export type Aircraft = {
    id: number;
    chassi: string;
    ano: number;
    marca: string;
    modelo: string;
    cor: string;
};

export type Service = {
    id: number;
    utilizador_id: number;
    aeronave_id: number;
    data_inicio: string;
    data_fim: string;
    descricao: string;
};
