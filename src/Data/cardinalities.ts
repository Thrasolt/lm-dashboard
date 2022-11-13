const cardinalityToRelation = {
    '1:1': ['P36', 'P1376'],
    'N:1': ['P159', 'P37', 'P138', 'P495', 'P17', 'P103', 'P20', 'P407', 'P276', 'P31', 'P364', 'P30',
            'P413', 'P449', 'P131', 'P127', 'P279', 'P740', 'P19', 'P136', 'P264', 'P140', 'P361', 'P176'],
    'N:M': ['P1412', 'P178', 'P190', 'P108', 'P27', 'P47', 'P106', 'P937', 'P1303', 'P527', 'P1001', 'P39',
            'P101', 'P530', 'P463']
}

export const relationToCardinality = (relation: string) => {
    for (const [card, relations] of Object.entries(cardinalityToRelation)) {
        if (relations.includes(relation)) {
            return card;
        }
    }
}


