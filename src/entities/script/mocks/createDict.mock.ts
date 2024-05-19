import { faker } from '@faker-js/faker/locale/ru';

import type { TDict } from '../types/types.ts';

export function createDictMock(): TDict {
    return {
        id: String(faker.number.int()),
        type: 'dict',
        attributes: {
            name: faker.lorem.words(1),
            type: faker.helpers.arrayElement(['kev', 'marker', 'objection']),
            triggers: faker.helpers.multiple(faker.word.noun, { count: { min: 2, max: 10 } }),
            comment: faker.helpers.maybe(() => faker.lorem.sentence({ min: 2, max: 10 }), { probability: 0.3 })
        }
    };
}
