import { faker } from '@faker-js/faker/locale/ru';

import type { TDict, TScript } from '../types/types.ts';

export function createScriptMock(DictsList: TDict[]): TScript {
    const priority = [1, 1.5, 2];

    //kev
    const sourceKev = DictsList.reduce<{ id: string }[]>(
        (result, dict) => (dict.attributes.type === 'kev' ? [...result, { id: dict.id! }] : result),
        []
    );
    const kev = faker.helpers.maybe(() => faker.helpers.uniqueArray(sourceKev, faker.number.int(sourceKev.length)), {
        probability: 0.7
    });

    //marker
    const sourceMarker = DictsList.reduce<{ id: string; priority: number }[]>(
        (result, dict) =>
            dict.attributes.type === 'marker'
                ? [...result, { id: dict.id!, priority: faker.helpers.arrayElement(priority) }]
                : result,
        []
    );
    const marker = faker.helpers.uniqueArray(sourceMarker, faker.number.int({ min: 1, max: sourceMarker.length }));

    //objection
    const sourceObjection = DictsList.reduce<{ id: string; priority?: number }[]>(
        (result, dict) =>
            dict.attributes.type === 'objection'
                ? [
                      ...result,
                      {
                          id: dict.id!,
                          priority: faker.helpers.maybe(() => faker.helpers.arrayElement(priority), { probability: 1 })
                      }
                  ]
                : result,
        []
    );
    const objection = faker.helpers.maybe(
        () => faker.helpers.uniqueArray(sourceObjection, faker.number.int(sourceObjection.length)),
        {
            probability: 0.7
        }
    );

    return {
        id: String(faker.number.int()),
        type: 'script',
        attributes: {
            name: faker.lorem.words(1),
            comment: faker.helpers.maybe(() => faker.lorem.sentence({ min: 2, max: 10 })),
            kev: kev ?? [],
            marker: marker ?? [],
            objection: objection ?? []
        }
    };
}
