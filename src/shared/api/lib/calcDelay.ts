import { faker } from '@faker-js/faker/locale/ru';

export default function (delay?: number | true): number {
    let result = 0;
    if (delay === true) result = faker.number.int({ min: 50, max: 1000 });
    if (typeof delay === 'number') result = delay;
    return result;
}
