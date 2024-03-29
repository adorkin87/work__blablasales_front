import { faker } from '@faker-js/faker/locale/ru';

import type { TAgent } from '../types/types.ts';

export function createAgentMock(): TAgent {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const email = faker.internet.email({ firstName, lastName });
    const name =
        firstName +
        (faker.helpers.maybe(() => faker.helpers.arrayElement([` ${lastName}`, ` ${lastName.slice(0, 1)}.`])) ?? '');

    return {
        id: String(faker.number.int()),
        type: 'agent',
        attributes: {
            name,
            email: faker.helpers.maybe(() => email),
            phone: faker.helpers.maybe(() => faker.phone.number(), { probability: 0.1 }),
            comment: faker.helpers.maybe(() => faker.lorem.sentence({ min: 2, max: 10 }))
        }
    };
}
