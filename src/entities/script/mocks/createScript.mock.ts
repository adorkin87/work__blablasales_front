import { faker } from '@faker-js/faker/locale/ru';

import type { TScript } from '../types/types.ts';

export function createScriptMock(): TScript {
    return {
        id: String(faker.number.int()),
        type: 'script',
        attributes: {
            name: faker.word.adjective() + faker.word.noun(),
            comment: faker.helpers.maybe(() => faker.lorem.sentence({ min: 2, max: 10 })),
            kev: faker.helpers.maybe(
                () => faker.helpers.multiple(() => ({ id: String(faker.number.int()) }), { count: { min: 1, max: 3 } }),
                { probability: 0.7 }
            ),
            marker: faker.helpers.multiple(() => ({
                id: String(faker.number.int()),
                priority: faker.helpers.arrayElement([0, 1, 2])
            })),
            objection: faker.helpers.maybe(
                () =>
                    faker.helpers.multiple(() => ({
                        id: String(faker.number.int()),
                        priority: faker.helpers.maybe(() => faker.helpers.arrayElement([0, 1, 2]), { probability: 0.1 })
                    })),
                {
                    probability: 0.7
                }
            )
        }
    };
}
