import { faker } from '@faker-js/faker/locale/ru';

import type { TRecord } from '../types/types.ts';

export function createRecordMock(): TRecord {
    const kpiQuality = faker.number.int({ min: 0, max: 100 });

    return {
        id: String(faker.number.int()),
        type: 'record',
        attributes: {
            upload_date: faker.date.past(),
            file_name: faker.system.commonFileName('mp3'),
            file_length: faker.number.int({ min: 5, max: 500 }),
            status: faker.number.int({ min: 1, max: 5 }),
            agent_id: faker.number.int({ min: 1, max: 20 }),
            agent_name: faker.person.firstName(),
            script_id: faker.number.int({ min: 1, max: 5 }),
            script_name: faker.word.noun({ strategy: 'any-length' }),
            kpiQuality,
            kpiPercent: faker.number.int({ min: kpiQuality, max: 100 })
        }
    };
}
