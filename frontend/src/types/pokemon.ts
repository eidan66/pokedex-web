export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface Form {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}

export interface HeldItem {
}

export interface Move {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }[];
}

export interface Species {
    name: string;
    url: string;
}

export interface SpriteVersions {
    [generation: string]: {
        [game: string]: {
            back_default?: string;
            back_gray?: string;
            back_transparent?: string;
            front_default?: string;
            front_gray?: string;
            front_transparent?: string;
            back_shiny?: string;
            front_shiny?: string;
            [key: string]: string | null | undefined;
        };
    };
}

export interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        };
        showdown: {
            back_default?: string;
            back_female?: string | null;
            back_shiny?: string;
            back_shiny_female?: string | null;
            front_default?: string;
            front_female?: string | null;
            front_shiny?: string;
            front_shiny_female?: string | null;
        };
    };
    versions: SpriteVersions;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: Cries;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities: unknown[];
    past_types: unknown[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}