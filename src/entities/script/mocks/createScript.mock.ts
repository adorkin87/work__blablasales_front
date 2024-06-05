import { faker } from '@faker-js/faker/locale/ru';

import type { TDict, TScript } from '../types/types.ts';
import { DictPriority } from '../types/types.ts';

export function createScriptMock(dictList: TDict[]): TScript {
    const priority = [DictPriority.low, DictPriority.normal, DictPriority.medium, DictPriority.high];

    //kev
    const sourceKev = dictList.reduce<{ id: string }[]>(
        (result, dict) => (dict.attributes.type === 'kev' ? [...result, { id: dict.id! }] : result),
        []
    );
    const kev = faker.helpers.maybe(() => faker.helpers.uniqueArray(sourceKev, faker.number.int(sourceKev.length)), {
        probability: 0.9
    });

    //marker
    const sourceMarker = dictList.reduce<{ id: string; priority: number }[]>(
        (result, dict) =>
            dict.attributes.type === 'marker'
                ? [...result, { id: dict.id!, priority: faker.helpers.arrayElement(priority) }]
                : result,
        []
    );
    const marker = faker.helpers.uniqueArray(sourceMarker, faker.number.int({ min: 1, max: sourceMarker.length }));

    //objection
    const sourceObjection = dictList.reduce<{ id: string; priority?: number }[]>(
        (result, dict) =>
            dict.attributes.type === 'objection'
                ? [
                      ...result,
                      {
                          id: dict.id!,
                          priority: faker.helpers.arrayElement(priority)
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
