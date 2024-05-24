import { faker } from '@faker-js/faker/locale/ru';

import type { TRecord } from '../types/types.ts';

import type { TAgent } from 'src/entities/agent';
import type { TScript } from 'src/entities/script';

const createRecordMock = (agentList: Required<TAgent>[], scriptList: Required<TScript>[]): TRecord => {
    const kpiQuality = faker.number.int({ min: 0, max: 100 });

    const idsAgent = agentList.reduce<string[]>((result, agent) => [...result, agent.id], []);
    const idsScript = scriptList.reduce<string[]>((result, script) => [...result, script.id], []);

    return {
        id: String(faker.number.int()),
        type: 'record',
        attributes: {
            upload_date: faker.date.past(),
            file_name: faker.system.commonFileName('mp3'),
            file_length: faker.number.int({ min: 5, max: 500 }),
            status: faker.number.int({ min: 1, max: 5 }),
            kpiQuality,
            kpiPercent: faker.number.int({ min: kpiQuality, max: 100 })
        },
        relationships: {
            agent: {
                data: { type: 'agent', id: faker.helpers.arrayElement(idsAgent) }
            },
            script: {
                data: { type: 'script', id: faker.helpers.arrayElement(idsScript) }
            }
        }
    };
};

export default createRecordMock;
